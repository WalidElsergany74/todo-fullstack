import { serverFetcher } from "@/services/server/serverFetcher";
import { ENDPOINTS } from "@/services/endpoints";
import { TAGS } from "@/features/todos/constants/revalidate-tags";
import type { Todo, TodoApiResponse } from "@/features/todos/types/todo.types";

export async function getTodos(): Promise<Todo[]> {
  const data = await serverFetcher<TodoApiResponse>(ENDPOINTS.todos, {
    tags: [TAGS.todos],
  });

  return data.data.todos ?? [];
}
