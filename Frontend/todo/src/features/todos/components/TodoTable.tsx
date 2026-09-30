import { getTodos } from "@/features/todos/services/server/getTodos";
import TodoRow from "@/features/todos/components/TodoRow";
import TodoPagination from "@/features/todos/components/TodoPagination";
import { Table, TableHeader, TableHead, TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, SearchX } from "lucide-react";
import type { Todo } from "@/features/todos/types/todo.types";

const PAGE_SIZE = 8;

interface TodoTableProps {
  search: string;
  sort: string;
  page: number;
}

function applySort(todos: Todo[], sort: string): Todo[] {
  return [...todos].sort((a, b) => {
    switch (sort) {
      case "name_asc":  return a.name.localeCompare(b.name);
      case "name_desc": return b.name.localeCompare(a.name);
      case "date_asc":  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
}

export default async function TodoTable({ search, sort, page }: TodoTableProps) {
  const allTodos = await getTodos();

  const q = search.trim().toLowerCase();
  const filtered = q
    ? allTodos.filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    : allTodos;

  const sorted     = applySort(filtered, sort);
  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage   = Math.min(Math.max(1, page), totalPages);
  const paginated  = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  if (allTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-20 text-center dark:border-gray-700 dark:bg-gray-800/30">
        <ClipboardList className="mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
        <p className="text-base font-medium text-gray-500 dark:text-gray-400">No todos yet</p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">Click &ldquo;Add Todo&rdquo; to create your first task.</p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-20 text-center dark:border-gray-700 dark:bg-gray-800/30">
        <SearchX className="mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
        <p className="text-base font-medium text-gray-500 dark:text-gray-400">No results found</p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">Try a different search term.</p>
      </div>
    );
  }

  const completed = allTodos.filter((t) => t.completed).length;

  return (
    <div className="space-y-3">
      {/* Summary */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <span><span className="font-semibold text-gray-900 dark:text-white">{allTodos.length}</span> {allTodos.length === 1 ? "task" : "tasks"} total</span>
        <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
        <span className="flex items-center gap-1.5">
          <Badge variant="success">{completed} completed</Badge>
        </span>
        <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
        <span className="flex items-center gap-1.5">
          <Badge variant="warning">{allTodos.length - completed} pending</Badge>
        </span>
        {q && (
          <>
            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <Badge variant="default">{filtered.length} match{filtered.length !== 1 ? "es" : ""} for &ldquo;{search}&rdquo;</Badge>
          </>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-gray-700/60">
        <Table>
          <TableHeader>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700/60 dark:bg-gray-800/60">
              <TableHead className="w-12">Done</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {paginated.map((todo) => (
              <TodoRow key={todo._id} todo={todo} />
            ))}
          </TableBody>
        </Table>
      </div>

      <TodoPagination currentPage={safePage} totalPages={totalPages} totalItems={totalItems} pageSize={PAGE_SIZE} />
    </div>
  );
}
