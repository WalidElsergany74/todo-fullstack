"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TodoPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export default function TodoPagination({ currentPage, totalPages, totalItems, pageSize }: TodoPaginationProps) {
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useSearchParams();

  if (totalPages <= 1) return null;

  function goTo(page: number) {
    const next = new URLSearchParams(params.toString());
    next.set("page", String(page));
    router.push(`${pathname}?${next.toString()}`);
  }

  function getPageNumbers(): (number | "…")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [1];
    if (currentPage > 3) pages.push("…");
    const start = Math.max(2, currentPage - 1);
    const end   = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  }

  const from = (currentPage - 1) * pageSize + 1;
  const to   = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing <span className="font-semibold text-gray-800 dark:text-gray-200">{from}–{to}</span> of{" "}
        <span className="font-semibold text-gray-800 dark:text-gray-200">{totalItems}</span> todos
      </p>

      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="icon" onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page" className="h-9 w-9">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers().map((num, idx) =>
          num === "…" ? (
            <span key={`ellipsis-${idx}`} className="flex h-9 w-9 items-center justify-center text-sm text-gray-400">…</span>
          ) : (
            <Button
              key={num}
              variant={currentPage === num ? "default" : "outline"}
              size="icon"
              onClick={() => goTo(num)}
              aria-current={currentPage === num ? "page" : undefined}
              className="h-9 w-9"
            >
              {num}
            </Button>
          )
        )}

        <Button variant="outline" size="icon" onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page" className="h-9 w-9">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
