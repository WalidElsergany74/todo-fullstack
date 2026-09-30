"use client";

import { useTransition } from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoName: string;
  onConfirm: () => void;
  isPending: boolean;
}

export default function DeleteModal({
  isOpen,
  onClose,
  todoName,
  onConfirm,
  isPending,
}: DeleteModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => { if (!open && !isPending) onClose(); }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
            <AlertTriangle className="h-7 w-7 text-red-500 dark:text-red-400" />
          </div>
          <AlertDialogTitle>Delete Todo</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              &ldquo;{todoName}&rdquo;
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={onClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            id="confirm-delete-btn"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            className="flex-1 gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
