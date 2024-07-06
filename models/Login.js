// Import necessary modules
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const sequelize = require('../config/connection'); // Import Sequelize connection

// Define Login model class that extends Sequelize's Model class
class Login extends Model {
  // Method to compare provided password with hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password); // Compare provided password with instance's hashed password
  }
}

// Initialize the Login model with column definitions and options
Login.init(
  {
    // Define columns for Login table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Email must be unique
      validate: {
        isEmail: true, // Validate that the email is in valid email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Password must be at least 8 characters long
      },
    },
  },
  {
    // Hooks for lifecycle events
    hooks: {
      // Before creating a new user data, hash the password
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash password using bcrypt
        return newUserData; // Return the updated user data object
      },
      // Before updating user data, hash the password if it has changed
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10); // Hash password using bcrypt
        return updatedUserData; // Return the updated user data object
      },
    },
    // Connect to the Sequelize instance (database)
    sequelize,
    timestamps: false, // Disable timestamps
    freezeTableName: true, // Use the same table name as the model name
    underscored: true, // Use snake_case for column names
    modelName: 'login', // Model name in singular form
  }
);

// Export the Login model for use in other parts of the application
module.exports = Login;
