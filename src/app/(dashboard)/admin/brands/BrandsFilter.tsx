import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";
import ValueRangePicker from "@/components/layout/ValueRangePicker";

export function getBrandStatusBadge(status: string) {
  if (status === "active") {
    return <Badge className="bg-success1 text-success1-foreground">Active</Badge>
  } else if (status === "archived") {
    return <Badge className="bg-error1 text-error1-foreground">Archived</Badge>
  }
};

export default function BrandsFilter({ maxTotal }: { maxTotal: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [totalProductRange, setTotalProductRange] = useState<number[]>([0, 0]);
  const status = searchParams.get("status") || "";

  useEffect(() => {
    setTotalProductRange([
      searchParams.get("minTotal") ? Number(searchParams.get("minTotal")) : 0,
      searchParams.get("maxTotal") ? Number(searchParams.get("maxTotal")) : maxTotal
    ])
  }, [maxTotal]);

  const handleTotalProductChange = (range: number[]) => {
    setTotalProductRange(range);

    const min = range[0];
    const max = range[1];

    const newQuery = updateQueryParams(searchParams, {
      minTotal: min,
      maxTotal: max,
      page: 1,
    });

    router.push(`?${newQuery}`);
  }

  const handleStatusChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      status: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  return (
    <>
      <ValueRangePicker
        placeholder="Total Products"
        label="Total Products Range"
        unit=""
        max={maxTotal}
        step={1}
        value={totalProductRange}
        handleApply={handleTotalProductChange}
      />

      <Select value={status} onValueChange={(value) => handleStatusChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-30">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          {["active", "archived"].map(value => (
            <SelectItem key={value} value={value}>{getBrandStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}