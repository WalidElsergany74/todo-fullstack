const Todo = require('../models/TodoModel');

exports.checkTodoExists = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        status: 'fail',
        message: 'Todo not found',
      });
    }

    req.todo = todo;

    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Todo ID',
    });
  }
};