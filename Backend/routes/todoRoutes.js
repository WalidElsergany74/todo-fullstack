const express = require('express');

const todoController = require('../controllers/TodoController');
const validate = require('../middleware/validate');

const {
  createTodoSchema,
  updateTodoSchema,
} = require('../validation/TodoValidtaion');
const { checkTodoExists } = require('../middleware/checkTodo');

const router = express.Router();

router
  .route('/')
  .get(todoController.getAllTodos)
  .post(
    validate(createTodoSchema),
    todoController.createTodo
  );

router
  .route('/:id')
  .get(checkTodoExists, todoController.getTodo)
  .patch(
    checkTodoExists,
    validate(updateTodoSchema),
    todoController.updateTodo
  )
  .delete(
    checkTodoExists,
    todoController.deleteTodo
  );

module.exports = router;