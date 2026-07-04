require('dotenv').config();

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_absensi',
    resave: false,
    saveUninitialized: false
}));

// WEB ROUTES
app.use(require('./routes/auth'));
app.use(require('./routes/admin'));
app.use(require('./routes/pekerja'));

// REST API ROUTES
app.use(require('./routes/apiAuth'));
app.use(require('./routes/apiPekerja'));
app.use(require('./routes/apiAdmin'));
app.use(require("./routes/apiProfile"));
app.use(require('./routes/apiHoliday'));
app.use(require('./routes/apiRekap'));
app.use(require('./routes/apiSaw'));

// 404
app.use((req, res) => {
    res.status(404).send('404 - Halaman tidak ditemukan');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
