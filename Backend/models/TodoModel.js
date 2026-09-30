const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Todo name is required'],
    trim: true,
    maxlength: [100, 'Todo name cannot exceed 100 characters'],
  },

  description: {
    type: String,
    required: [true, 'Todo description is required'],
    trim: true,
    maxlength: [1000, 'Todo description cannot exceed 1000 characters'],
  },

  completed: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;