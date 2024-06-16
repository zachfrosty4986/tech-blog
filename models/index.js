const Login = require('./Login');
const Blog = require('./Blog');

Login.hasMany(Blog, {
  foreignKey: 'login_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(Login, {
  foreignKey: 'login_id'
});

module.exports = { Login, Blog };