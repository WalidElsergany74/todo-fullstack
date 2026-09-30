export const ENDPOINTS = {
  todos: "todos",
  todoById: (id: string) => `todos/${id}`,
} as const;
