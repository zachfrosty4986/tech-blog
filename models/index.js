// Import models
const Login = require('./Login');
const Blog = require('./Blog');
const Comment = require('./Comments');

// Define associations between models

// A Login (user) can have many Blogs
Login.hasMany(Blog, {
  foreignKey: 'login_id', // Foreign key in the Blog table referencing Login's id
  onDelete: 'CASCADE' // If a Login is deleted, delete all associated Blogs
});

// Each Blog belongs to one Login (user)
Blog.belongsTo(Login, {
  foreignKey: 'login_id' // Foreign key in the Blog table referencing Login's id
});

// Each Comment belongs to one Login (user)
Comment.belongsTo(Login, {
  foreignKey: 'user_id' // Foreign key in the Comment table referencing Login's id
});

// Each Comment also belongs to one Blog
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id', // Foreign key in the Comment table referencing Blog's id
  onDelete: 'CASCADE' // If a Blog is deleted, delete all associated Comments
});

// Each Blog can have many Comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id', // Foreign key in the Comment table referencing Blog's id
});

// Export all models for use in other parts of the application
module.exports = { Login, Blog, Comment };
