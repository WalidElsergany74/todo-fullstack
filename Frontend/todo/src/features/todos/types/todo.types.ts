export interface Todo {
  _id: string;
  name: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoApiResponse {
  status: string;
  results: number;
  data: {
    todo: Todo;
    todos: Todo[];
  };
}

export type TodoActionState = {
  success: boolean;
  error?: string;
};
