"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { deleteTodoAction } from "@/features/todos/actions/delete-todo";
import { toggleCompleteAction } from "@/features/todos/actions/toggle-complete";
import TodoModal from "@/features/todos/components/TodoModal";
import DeleteModal from "@/features/todos/components/DeleteModal";
import type { Todo } from "@/features/todos/types/todo.types";
import { TableCell, TableRow } from "@/components/ui/table";

interface TodoRowProps {
  todo: Todo;
}

export default function TodoRow({ todo }: TodoRowProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [isToggling, startToggle] = useTransition();
  const [isDeleting, startDelete] = useTransition();

  function handleToggle() {
    startToggle(async () => {
      const result = await toggleCompleteAction(todo._id, !todo.completed);
      if (result.success) {
        toast.success(
          todo.completed
            ? `"${todo.name}" marked as pending`
            : `"${todo.name}" marked as done! 🎉`
        );
      } else {
        toast.error(result.error ?? "Failed to update todo");
      }
    });
  }

  function handleDeleteConfirm() {
    startDelete(async () => {
      const result = await deleteTodoAction(todo._id);
      if (result.success) {
        setIsDeleteOpen(false);
        toast.success(`"${todo.name}" deleted successfully`);
      } else {
        toast.error(result.error ?? "Failed to delete todo");
      }
    });
  }

  const formattedDate = new Date(todo.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <TableRow className={todo.completed ? "opacity-60" : ""}>
        {/* Checkbox */}
        <TableCell className="w-12">
          <div className="flex items-center justify-center">
            {isToggling ? (
              <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
            ) : (
              <Checkbox
                id={`todo-check-${todo._id}`}
                checked={todo.completed}
                onCheckedChange={handleToggle}
                disabled={isToggling || isDeleting}
                aria-label={`Mark "${todo.name}" as ${todo.completed ? "incomplete" : "complete"}`}
              />
            )}
          </div>
        </TableCell>

        {/* Title */}
        <TableCell>
          <span className={`text-sm font-medium text-gray-900 dark:text-white ${todo.completed ? "line-through" : ""}`}>
            {todo.name}
          </span>
        </TableCell>

        {/* Description */}
        <TableCell>
          <p className="max-w-xs truncate text-sm text-gray-500 dark:text-gray-400" title={todo.description}>
            {todo.description}
          </p>
        </TableCell>

        {/* Date */}
        <TableCell>
          <span className="text-xs text-gray-400 dark:text-gray-500">{formattedDate}</span>
        </TableCell>

        {/* Status */}
        <TableCell>
          <Badge variant={todo.completed ? "success" : "warning"}>
            {todo.completed ? "Done" : "Pending"}
          </Badge>
        </TableCell>

        {/* Actions */}
        <TableCell>
          <div className="flex items-center gap-1">
            <Button
              id={`edit-todo-${todo._id}`}
              variant="ghost"
              size="icon"
              onClick={() => setIsEditOpen(true)}
              disabled={isDeleting || isToggling}
              aria-label={`Edit "${todo.name}"`}
              className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              id={`delete-todo-${todo._id}`}
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteOpen(true)}
              disabled={isDeleting || isToggling}
              aria-label={`Delete "${todo.name}"`}
              className="h-8 w-8 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <TodoModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} todo={todo} />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        todoName={todo.name}
        onConfirm={handleDeleteConfirm}
        isPending={isDeleting}
      />
    </>
  );
}
