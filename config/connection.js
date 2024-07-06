// Imports the Sequelize library
const Sequelize = require('sequelize');

// Utilizes the 'dotenv' package in order to load the .env file
// and sets the environment variables to the process.env object.
require('dotenv').config();

let sequelize;

// Checks to see if the application is deployed.
// If DB_URL environment variable exists, then that is used.
// If not, it determines that you're on your local machine and
// utilizes the environment variables from the .env file to set up Sequelize.
if (process.env.DB_URL) {
  // Connect to the database using the DB_URL environment variable
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  // Connect to the database using local environment variables
  sequelize = new Sequelize(
    process.env.DB_NAME,     // Name of the database
    process.env.DB_USER,     // Database user
    process.env.DB_PASSWORD, // Database password
    {
      host: 'localhost',     // Database host
      dialect: 'postgres'    // Dialect of the database
    }
  );
}

// Export the configured sequelize instance for use in other parts of the application
module.exports = sequelize;
