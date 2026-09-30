    const { z } = require('zod');

const createTodoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name is too long'),

  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(1000, 'Description is too long'),

  completed: z.boolean().optional(),
});

const updateTodoSchema = z.object({
  name: z.string().trim().max(100, 'Name is too long').optional(),
  description: z
    .string()
    .trim()
    .max(1000, 'Description is too long')
    .optional(),
  completed: z.boolean().optional(),
});

module.exports = { createTodoSchema, updateTodoSchema }