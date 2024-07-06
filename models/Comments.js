// Import necessary Sequelize components
const { Model, DataTypes } = require('sequelize');
// Import Sequelize connection instance
const sequelize = require('../config/connection.js');
// Import moment for date formatting
const moment = require('moment');

// Define Comment model as a subclass of Sequelize's Model class
class Comment extends Model {}

// Initialize the Comment model with attributes and options
Comment.init(
    {
        // Define 'id' column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Define 'content' column
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Define 'user_id' column as a foreign key referencing 'id' column in 'login' table
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'login',
                key: 'id',
            },
        },
        // Define 'blog_id' column as a foreign key referencing 'id' column in 'blog' table
        blog_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blog',
                key: 'id',
            },
        },
        // Define 'date_posted' column with default value set to current date and time
        date_posted: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: moment().format('MMMM Do YYYY, h:mm:ss a'),
        },
        // Define 'likes' column
        likes: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        // Pass Sequelize connection instance
        sequelize,
        // Disable timestamps columns (createdAt and updatedAt)
        timestamps: false,
        // Set table name to be the same as model name (comments)
        freezeTableName: true,
        // Convert camelCase column names to snake_case in the database
        underscored: true,
        // Set model name to 'comment'
        modelName: 'comment',
    }
);

// Export Comment model for use in other parts of the application
module.exports = Comment;
