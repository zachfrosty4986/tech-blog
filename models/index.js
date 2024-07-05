const Login = require('./Login');
const Blog = require('./Blog');
const Comment = require('./Comments');

Login.hasMany(Blog, {
  foreignKey: 'login_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(Login, {
  foreignKey: 'login_id'
});

//comments belong to a User
Comment.belongsTo(Login, {
  foreignKey: 'user_id'
})

//comment also belongs to a blog
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
})

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
})

module.exports = { Login, Blog, Comment };