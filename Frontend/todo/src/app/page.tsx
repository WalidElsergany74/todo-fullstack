import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckSquare } from "lucide-react";
import TodoTable from "@/features/todos/components/TodoTable";
import TodoTableSkeleton from "@/features/todos/components/TodoTableSkeleton";
import TodoControls from "@/features/todos/components/TodoControls";
import AddTodoButton from "@/features/todos/components/AddTodoButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const metadata: Metadata = {
  title: "My Todos — Stay Organized",
  description:
    "Manage your daily tasks with ease. Add, edit, complete and delete todos in a clean, fast interface.",
};

interface HomePageProps {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const search = params.q ?? "";
  const sort   = params.sort ?? "date_desc";
  const page   = Math.max(1, Number(params.page ?? "1") || 1);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 px-4 py-10 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 shadow-md shadow-purple-500/30 dark:bg-purple-500">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Todos
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Track and manage your tasks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AddTodoButton />
          </div>
        </div>

        {/* Controls: Search + Sort */}
        <TodoControls search={search} sort={sort} />

        {/* Todo Table — re-mounts Suspense boundary when filters change */}
        <Suspense key={`${search}-${sort}-${page}`} fallback={<TodoTableSkeleton />}>
          <TodoTable search={search} sort={sort} page={page} />
        </Suspense>
      </div>
    </main>
  );
}
