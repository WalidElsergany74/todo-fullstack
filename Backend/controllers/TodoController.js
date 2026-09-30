const Todo = require('../models/TodoModel');
const APIFeatures = require('../utils/ApiFeature');

// 1) Get All Todos
exports.getAllTodos = async (req, res, next) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;

    // 1) Execute API features (filter, search, sort, limitFields, paginate)
    const features = new APIFeatures(Todo.find(), req.query)
      .filter()
      .search()
      .sort()
      .limitFields()
      .paginate();

    const todos = await features.query;

    const total = await Todo.countDocuments();
    const totalPages = Math.ceil(total / limit) || 1;

    res.status(200).json({
      status: 'success',
      results: todos.length,
      data: {
        todos,
      },
      pagination: {
        page,
        limit,
        totalPages,
        total,
      },
    });
  } catch (err) {
    next(err);
  }
};

// 2) Get One Todo
exports.getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        todo,
      },
    });
  } catch (err) {
    next(err);
  }
};

// 3) Create Todo
exports.createTodo = async (req, res, next) => {
  try {
    const newTodo = await Todo.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        todo: newTodo,
      },
    });
  } catch (err) {
    next(err);
  }
};

// 4) Update Todo
exports.updateTodo = async (req, res, next) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        todo: updatedTodo,
      },
    });
  } catch (err) {
    next(err);
  }
};

// 5) Delete Todo
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: todo,   
    });
  } catch (err) {
    next(err);
  }
};