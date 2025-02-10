import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import multer from "multer";
import fs from "fs";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
const port = 3001;

import Admin from "./models/Admin.js";
import Article from "./models/Article.js";

const removePolishChars = (str) => {
    const polishChars = {
        ą: "a",
        ć: "c",
        ę: "e",
        ł: "l",
        ń: "n",
        ó: "o",
        ś: "s",
        ż: "z",
        ź: "z",
        Ą: "A",
        Ć: "C",
        Ę: "E",
        Ł: "L",
        Ń: "N",
        Ó: "O",
        Ś: "S",
        Ż: "Z",
        Ź: "Z",
    };
    return str
        .split("")
        .map((char) => polishChars[char] || char)
        .join("");
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let articleTitle = req.body.articleTitle;

        if (!articleTitle) {
            return cb(new Error("Title is required"), null);
        }

        articleTitle = removePolishChars(articleTitle);
        articleTitle = articleTitle.replace(/\s+/g, "_");
        const articleFolder = path.join(
            __dirname,
            "public",
            "articlesImg",
            articleTitle
        );

        if (!fs.existsSync(articleFolder)) {
            fs.mkdirSync(articleFolder, { recursive: true });
        }

        cb(null, articleFolder);
    },
    filename: (req, file, cb) => {
        const fileId = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, `${fileId}${ext}`);
    },
});

export default multer({ storage: storage });
const upload = multer({ storage: storage });
app.use(
    session({
        secret: process.env.SESSION_SECRET || randomBytes(64).toString("hex"),
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000 },
        httpOnly: true,
    })
);

if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined!");
    process.exit(1);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MONGODB"))
    .catch((err) =>
        console.error("An error has been occured while connecting to DB: ", err)
    );

function isAdminAuthenticated(req, res, next) {
    if (jwt.verify(req.body.token, process.env.JWT_SECRET)) {
        return next();
    }
    res.redirect("/adminLogin");
}

//script require form with labels names login and password to admin log in, sent via POST to /adminLogin
app.post("/adminLogin", async (req, res) => {
    try {
        const { login, password } = req.body;
        if (!login || !password) {
            return res.status(400).json({ message: "Incorrect data!" });
        }
        const admin = await Admin.findOne({ login });
        if (!admin) {
            return res.status(400).json({ message: "Incorrect login!" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password!" });
        }
        const TOKEN = jwt.sign(
            { login: admin.login, name: admin.name, surname: admin.surname },
            process.env.JWT_SECRET,
            {
                expiresIn: "5h",
            }
        );
        res.status(200).json({ message: "Logged in", token: TOKEN });
    } catch (err) {
        console.error("Error Admin Login:", err);
        res.status(500).json({ message: "Internal server error!" });
    }
});

app.post("/verifyToken", (req, res) => {
    if (
        !req.body.token ||
        !jwt.verify(req.body.token, process.env.JWT_SECRET)
    ) {
        return res.status(401).json({ message: "Forbidden" });
    }
    res.status(200).json({ message: "Token is valid" });
});

app.post("/createArticle", upload.array("images"), async (req, res) => {
    try {
        if (
            !req.body.token ||
            !jwt.verify(req.body.token, process.env.JWT_SECRET)
        ) {
            return res.status(401).json({ message: "Forbidden" });
        }
        const { articleTitle, articleDescription } = req.body;

        try {
            const existingArticle = await Article.findOne({ title: articleTitle });
            if (existingArticle) {
                return res.status(400).send("Artykuł z tym tytułem już istnieje.");
            }

            if (req.files && req.files.length > 0) {
                const uploadedFiles = req.files.map((file) =>
                    path.join(
                        "articlesImg",
                        articleTitle.replace(/\s+/g, "_"),
                        file.filename
                    )
                );

                const newArticle = new Article({
                    title: articleTitle,
                    description: articleDescription,
                    images: uploadedFiles,
                });

                await newArticle.save();

                return res.send(
                    `Zdjęcia zostały zapisane: ${uploadedFiles.join(", ")}`
                );
            } else {
                const newArticle = new Article({
                    title: articleTitle,
                    description: articleDescription,
                    images: "none",
                });

                await newArticle.save();

                return res.send(`Artykul zapisany`);
            }
        } catch (err) {
            // Handle errors
            console.error("Error", err);
            return res.status(500).send("Błąd serwera");
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error!" });
    }
});

app.post("/logout", (req, res) => {
    if (
        !req.body.token ||
        !jwt.verify(req.body.token, process.env.JWT_SECRET)
    ) {
        return res.status(200).json({ message: "You are not logged in!" });
    }
    req.session.destroy((err) => {
        if (err) {
            return res
                .status(500)
                .json({ message: "Error occured while logging out!" });
        }
        res.status(200).json({ message: "Logged out" });
    });
});

app.post("/api/adminData", (req, res) => {
    if (
        !req.body.token ||
        !jwt.verify(req.body.token, process.env.JWT_SECRET)
    ) {
        return res.status(401).json({ message: "Forbidden" });
    }
    const DATA = jwt.decode(req.body.token);
    res.json(DATA);
});

app.get("/api/loadArticles", async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        const groupedArticles = [];

        for (let i = 0; i < articles.length; i += 25) {
            groupedArticles.push(articles.slice(i, i + 25));
        }

        res.json(groupedArticles);
    } catch (error) {
        res.status(500).json({ error: "Błąd podczas pobierania artykułów" });
    }
});
app.get("/api/getArticle/:id", async (req, res) => {
    const articleId = req.params.id;
    try {
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: "Artykuł nie znaleziony!" });
        }
        res.json(article);
    } catch (err) {
        res.status(500).json({ message: "Internal server error!" });
    }
});

app.get("/", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
});
app.get("/article", (req, res) => {
    res.sendFile("./views/article.html", { root: __dirname });
});
app.get("/adminLogin", (req, res) => {
    res.sendFile("./views/admin/adminLogin.html", { root: __dirname });
});
app.get("/adminPanel", isAdminAuthenticated, (req, res) => {
    res.sendFile("./views/admin/adminPanel.html", { root: __dirname });
});
app.use((req, res) => {
    res.sendFile("./views/404.html", { root: __dirname }); //404 page
});
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
