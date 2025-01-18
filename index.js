const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');


const app = express();
const port = 3001; //Set this port to whatever you like, it doesn't have to be that

const Admin = require('./models/Admin.js');

app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    httpOnly: true
  }));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MONGODB'))
    .catch(err => console.error('An error has been occured while connecting to DB: ', err));

function isAdminAuthenticated(req, res, next) {
    if (req.session.admin) {
        return next();  // Użytkownik jest zalogowany, kontynuuj
    }
    res.redirect('/');  // Brak logowania
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
            return res.status(400).json({ message: "Nie znaleziono administratora!" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Nieprawidłowe hasło!" });
        }
        req.session.admin = {
            login: admin.login,
            name: admin.name,
            surname: admin.surname
        };
        res.redirect('/adminPanel');
    } catch (err) {
        console.error("Error Admin Login:", err);
        res.status(500).json({ message: "Wystąpił błąd serwera" });
    }
});

app.get("/logout", (req, res) => {
    if (!req.session || !req.session.admin) {
        return res.status(200).json({ message: "Jesteś już wylogowany." });
    }

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Błąd wylogowywania" });
        }
        res.status(200).json({ message: "Pomyślnie wylogowano" });
    });
});

app.get("/api/adminData", (req, res) => {
    if (!req.session || !req.session.admin) {
        return res.status(401).json({ message: "Brak autoryzacji. Zaloguj się najpierw." });
    }

    // Return logged-in admin data
    res.json(req.session.admin);
});

app.get('/', (req,res) => {
    res.sendFile('./views/index.html', {root: __dirname});
})
app.get('/adminPanel', isAdminAuthenticated, (req,res) => {
    res.sendFile('./views/adminPanel.html', {root: __dirname});
})
app.use((req, res) => {
    res.sendFile('./views/404.html', { root: __dirname}); //404 page
})
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
