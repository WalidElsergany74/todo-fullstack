"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useRef, useEffect, useState } from "react";
import { Search, ArrowDownAZ, ArrowUpAZ, CalendarArrowUp, CalendarArrowDown, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS = [
  { value: "date_desc", label: "Newest first" },
  { value: "date_asc",  label: "Oldest first" },
  { value: "name_asc",  label: "Name A → Z"  },
  { value: "name_desc", label: "Name Z → A"  },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

interface TodoControlsProps {
  search: string;
  sort: string;
}

export default function TodoControls({ search, sort }: TodoControlsProps) {
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(search);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setInputValue(search); }, [search]);

  function pushParams(updates: Record<string, string | null>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v === null || v === "") next.delete(k);
      else next.set(k, v);
    }
    next.delete("page");
    startTransition(() => router.push(`${pathname}?${next.toString()}`));
  }

  function handleSearchChange(value: string) {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => pushParams({ q: value }), 350);
  }

  function handleClear() {
    setInputValue("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    pushParams({ q: null });
  }

  const currentSort = SORT_OPTIONS.find((o) => o.value === sort)?.value ?? "date_desc";

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          {isPending
            ? <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
            : <Search className="h-4 w-4 text-gray-400" />
          }
        </div>
        <Input
          id="todo-search"
          type="text"
          value={inputValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search todos by title or description…"
          className="pl-10 pr-10"
        />
        {inputValue && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 h-full w-10 hover:bg-transparent"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        )}
      </div>

      {/* Sort */}
      <Select value={currentSort} onValueChange={(v) => pushParams({ sort: v as SortValue })}>
        <SelectTrigger id="todo-sort" className="w-full sm:w-44" aria-label="Sort todos">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
