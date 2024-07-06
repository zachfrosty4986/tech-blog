const inquirer = require("inquirer"); // Importing Inquirer for command-line prompts
const path = require('path'); // Node.js module for working with file and directory paths
const express = require('express'); // Importing Express.js framework
const session = require('express-session'); // Middleware for managing sessions in Express
const exphbs = require('express-handlebars'); // Templating engine for Express
const routes = require('./controllers'); // Importing routes from controllers directory
const hbsHelpers = require('handlebars-helpers')(); // Additional Handlebars helpers

const sequelize = require('./config/connection'); // Sequelize instance for database connection
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Session store using Sequelize

const app = express(); // Creating Express application
const PORT = process.env.PORT || 3001; // Setting port number

// Handlebars engine setup
const hbs = exphbs.create({ 
    helpers: hbsHelpers // Registering additional Handlebars helpers
});

// Session configuration
const sess = {
    secret: 'Super secret secret', // Secret used to sign the session ID cookie
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // Cookie lasts for 24 hours at max
        httpOnly: true, // Cookie is inaccessible to client-side JavaScript
        secure: false, // Set to true in production for HTTPS
        sameSite: 'strict', // Cookies are not sent in cross-origin requests
    },
    resave: false, // Prevents session from being saved on every request
    saveUninitialized: true, // Saves uninitialized sessions
    store: new SequelizeStore({
        db: sequelize // Using Sequelize to store sessions in the database
    })
};

app.use(session(sess)); // Adding session middleware to Express

app.engine('handlebars', hbs.engine); // Setting Handlebars as the template engine
app.set('view engine', 'handlebars'); // Using Handlebars for rendering views

app.use(express.json()); // Parsing JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serving static files from the 'public' directory

app.use(routes); // Using routes defined in controllers

// Syncing Sequelize models with the database and starting server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening')); // Listening on specified port
});

