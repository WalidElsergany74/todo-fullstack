"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TodoModal from "@/features/todos/components/TodoModal";

export default function AddTodoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button id="add-todo-btn" onClick={() => setIsOpen(true)} className="gap-2 active:scale-95">
        <Plus className="h-4 w-4" />
        Add Todo
      </Button>
      <TodoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
