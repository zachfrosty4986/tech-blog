// Importing necessary Sequelize components
const { Model, DataTypes } = require('sequelize');
// Importing the Sequelize connection instance
const sequelize = require('../config/connection');

// Defining the Blog model as a class that extends Sequelize's Model class
class Blog extends Model {}

// Initializing the Blog model with specific attributes and options
Blog.init(
  {
    // Defining the 'id' column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Defining the 'name' column
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Defining the 'description' column
    description: {
      type: DataTypes.STRING,
    },
    // Defining the 'date_created' column
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Defining the 'login_id' column as a foreign key referencing the 'id' column in the 'login' table
    login_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'login',
        key: 'id',
      },
    },
  },
  {
    // Passing the Sequelize connection instance
    sequelize,
    // Disabling timestamps columns (createdAt and updatedAt)
    timestamps: false,
    // Setting the table name to be the same as the model name (blogs)
    freezeTableName: true,
    // Converting camelCase column names to snake_case in the database
    underscored: true,
    // Setting the model name to 'blog'
    modelName: 'blog',
  }
);

// Exporting the Blog model for use in other parts of the application
module.exports = Blog;
