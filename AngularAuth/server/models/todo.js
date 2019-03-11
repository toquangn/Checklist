const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  user: String,
  todo: String,
  complete: Boolean,
  priority: Number
});

module.exports = mongoose.model('todo', userSchema, 'todos');
