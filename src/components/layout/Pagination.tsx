"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  onLimitChange: (value: number) => void;
  item: string;
}

export function Pagination({ total, page, limit, onLimitChange, item }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / limit);

  function goToPage(newPage: number) {
    const newQuery = updateQueryParams(searchParams, {
      page: newPage,
    });

    router.push(`?${newQuery}`);
  }

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <Select
          value={String(limit)}
          onValueChange={(value) => { onLimitChange(Number(value)) }}
        >
          <SelectTrigger size="xs" className="w-16 h-7">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['7', '10', '15'].map((value) => (
              <SelectItem key={value} value={value}>{value}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground/50 me-3">
          Results per page
        </p>

        <p className="text-sm text-muted-foreground">
          {(page - 1) * limit + 1}-{(page * limit < total ? page * limit : total)} of {total} {item}s
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
        >
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Page <span className="font-medium text-primary">{page}</span> / {totalPages}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => goToPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
