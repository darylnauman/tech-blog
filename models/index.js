const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Defines a User as having many posts, when delete a User delete their Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Defines the association between Post & User, starting wth Post
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Defines a Post as having many comments, when delete a Post, delete the Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

// Defines the association between Comment & Post, starting with Comment
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

// Defines a User has having many comments, when delete a User, delete their comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Defines the association between Comment & User, starting with Comment
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post, Comment }