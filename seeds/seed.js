// Import Sequelize connection instance from the configuration file
const sequelize = require('../config/connection');

// Import Login and Blog models from the models directory
const { Login, Blog } = require('../models');

// Import JSON data containing login and blog information
const loginData = require('./loginData.json');
const blogData = require('./blogData.json');

// Define function to seed the database with initial data
const seedDatabase = async () => {
  // Synchronize the database by dropping existing tables and re-creating them
  await sequelize.sync({ force: true });

  // Bulk create login users using data from loginData JSON file
  const users = await Login.bulkCreate(loginData, {
    individualHooks: true, // Apply hooks defined in the Login model
    returning: true, // Ensure returned objects are the updated instances
  });

  // Iterate through each blog entry in blogData and create corresponding entries in the Blog table
  for (const blog of blogData) {
    // Assign a random user_id from the created users to each blog entry
    await Blog.create({
      ...blog, // Spread the properties from blogData JSON
      user_id: users[Math.floor(Math.random() * users.length)].id, // Assign random user_id
    });
  }

  // Exit the process after seeding the database successfully
  process.exit(0);
};

// Call the seedDatabase function to begin seeding the database
seedDatabase();
