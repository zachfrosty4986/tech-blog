const inquirer = require("inquirer");
const path = require('path')
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const hbsHelpers = require('handlebars-helpers')();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//handlebars engine
const hbs = exphbs.create({ 
    helpers: hbsHelpers
});

//cookie setup
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, //cookie lasts for 24 at max,
        httpOnly: true, //makes the cookie unavailable outside of http(s)
        secure: false, //
        sameSite: 'strict', //no 3rd party cookie
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

