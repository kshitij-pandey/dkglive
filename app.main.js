const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const passport = require('passport')
const path = require('path');
const connectDB = require('./config/db.config');
const session = require('express-session');
var cookieParser = require('cookie-parser')
const filestore = require("session-file-store")(session)


const app = express();
const PORT = process.env.PORT || 4004;

connectDB();

app.use(session({ secret: "Shh, its a secret!" }));
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/src')));

app.set('views', path.join(__dirname, 'views/'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');


app.use('/', require('./routes/general.routes'));



app.listen(PORT, () => console.log(`server is running`));
