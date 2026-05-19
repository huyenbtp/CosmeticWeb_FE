import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";

export function getTagStatusBadge(status: string) {
  if (status === "active") {
    return <Badge className="bg-success1 text-success1-foreground">Active</Badge>
  } else if (status === "archived") {
    return <Badge className="bg-error1 text-error1-foreground">Archived</Badge>
  }
};

export default function TagsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "";

  const handleStatusChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      status: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  return (
    <>
      <Select value={status} onValueChange={(value) => handleStatusChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-30">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          {["active", "archived"].map(value => (
            <SelectItem key={value} value={value}>{getTagStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}