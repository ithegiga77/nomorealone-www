import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import 'dotenv/config'
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();
const port = 3001; //Set this port to whatever you like, it doesn't have to be that

import Admin from './models/Admin.js';
import Article from './models/Article.js';


app.use(session({
    secret: process.env.SESSION_SECRET || randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    httpOnly: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MONGODB'))
    .catch(err => console.error('An error has been occured while connecting to DB: ', err));

function isAdminAuthenticated(req, res, next) {
    if (req.session.admin) {
        return next();
    }
    res.redirect('/adminLogin');
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
        req.session.admin = {
            login: admin.login,
            name: admin.name,
            surname: admin.surname
        };
        res.redirect('/adminPanel');
    } catch (err) {
        console.error("Error Admin Login:", err);
        res.status(500).json({ message: "Internal server error!" });
    }
});

app.post("/createArticle", async (req, res) => {
    const { articleTitle, articleDescription } = req.body;

    try {
        const newArticle = new Article({
            title: articleTitle,
            description: articleDescription,
            image: 'none'
        })

        await newArticle.save();
        return newArticle;
    } catch (err) {
        console.error('Error', err);
    }
})

app.get("/logout", (req, res) => {
    if (!req.session || !req.session.admin) {
        return res.status(200).json({ message: "You are not logged!" });
    }

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error occured while logging out!" });
        }
        res.status(200).json({ message: "Logged out" });
    });
});

app.get("/api/adminData", (req, res) => {
    if (!req.session || !req.session.admin) {
        return res.status(401).json({ message: "Forbidden" });
    }

    res.json(req.session.admin);
});

app.get("/api/loadArticles", async (req, res) => {
    try {
        const articles = await Article.find();
        const groupedArticles = [];

        for (let i = 0; i < articles.length; i += 25) {
            groupedArticles.push(articles.slice(i, i + 25));
        }

        res.json(groupedArticles);
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas pobierania artykułów' });
    }
});
app.get("/api/getArticle/:id", async (req, res) => {
    const articleId = req.params.id;

    try {
        const article = await Article.findById(articleId);

        if (!article) {
            return res.status(404).json({ message: 'Artykuł nie znaleziony!' });
        }
        res.json(article)
    } catch (err) {
        res.status(500).json({ message: 'Internal server error!' });
    }
})

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
})

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/article', (req, res) => {
    res.sendFile('./views/article.html', { root: __dirname });
})
app.get('/adminLogin', (req, res) => {
    res.sendFile('./views/admin/adminLogin.html', { root: __dirname });
})
app.get('/adminPanel', isAdminAuthenticated, (req, res) => {
    res.sendFile('./views/admin/adminPanel.html', { root: __dirname });
})
app.use((req, res) => {
    res.sendFile('./views/404.html', { root: __dirname }); //404 page
})
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
