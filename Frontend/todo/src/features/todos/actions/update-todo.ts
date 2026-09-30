"use server";

import { updateTag } from "next/cache";
import { ENDPOINTS } from "@/services/endpoints";
import { TAGS } from "@/features/todos/constants/revalidate-tags";
import { todoSchema } from "@/features/todos/schemas/todo.schema";
import type { TodoActionState } from "@/features/todos/types/todo.types";

const API_URL = process.env.API_URL ?? "http://localhost:8000/api/v1";

export async function updateTodoAction(
  id: string,
  formData: FormData
): Promise<TodoActionState> {
  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
  };

  const parsed = todoSchema.safeParse(raw);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    const messages = Object.values(flat.fieldErrors)
      .flat()
      .filter(Boolean)
      .join(", ");
    return { success: false, error: messages || "Validation failed" };
  }

  try {
    const response = await fetch(
      `${API_URL}/${ENDPOINTS.todoById(id)}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({})) as { message?: string };
      return { success: false, error: err.message ?? "Failed to update todo" };
    }

    updateTag(TAGS.todos);
    return { success: true };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
