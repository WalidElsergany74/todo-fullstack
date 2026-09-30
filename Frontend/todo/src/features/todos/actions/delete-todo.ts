"use server";

import { updateTag } from "next/cache";
import { ENDPOINTS } from "@/services/endpoints";
import { TAGS } from "@/features/todos/constants/revalidate-tags";
import type { TodoActionState } from "@/features/todos/types/todo.types";

const API_URL = process.env.API_URL ?? "http://localhost:8000/api/v1";

export async function deleteTodoAction(id: string): Promise<TodoActionState> {
  try {
    const response = await fetch(
      `${API_URL}/${ENDPOINTS.todoById(id)}`,
      {
        method: "DELETE",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({})) as { message?: string };
      return { success: false, error: err.message ?? "Failed to delete todo" };
    }

    updateTag(TAGS.todos);
    return { success: true };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
