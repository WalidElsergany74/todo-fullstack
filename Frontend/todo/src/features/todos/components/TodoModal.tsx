"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createTodoAction } from "@/features/todos/actions/create-todo";
import { updateTodoAction } from "@/features/todos/actions/update-todo";
import type { Todo } from "@/features/todos/types/todo.types";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo?: Todo;
}

export default function TodoModal({ isOpen, onClose, todo }: TodoModalProps) {
  const isEdit = !!todo;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(null);
      setTimeout(() => formRef.current?.reset(), 0);
    }
  }, [isOpen, todo]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = isEdit
        ? await updateTodoAction(todo!._id, formData)
        : await createTodoAction(formData);

      if (result.success) {
        toast.success(isEdit ? "Todo updated successfully" : "Todo created! 🚀");
        onClose();
      } else {
        setError(result.error ?? "Something went wrong");
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open && !isPending) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Todo" : "Add New Todo"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the details of your todo." : "Fill in the details to create a new todo."}
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="todo-name">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="todo-name"
                name="name"
                defaultValue={todo?.name ?? ""}
                placeholder="What needs to be done?"
                maxLength={100}
                required
                disabled={isPending}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="todo-description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="todo-description"
                name="description"
                rows={4}
                defaultValue={todo?.description ?? ""}
                placeholder="Add more details..."
                maxLength={1000}
                required
                disabled={isPending}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="min-w-[100px]">
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isEdit ? "Saving…" : "Adding…"}
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Add Todo"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
