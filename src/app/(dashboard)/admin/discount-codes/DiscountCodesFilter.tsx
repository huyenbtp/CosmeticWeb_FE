"use client"

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/layout/DateRangePicker";

export function getDiscountCodeTypeBadge(type: string) {
  if (type === "percent") {
    return <Badge className="bg-success1 text-success1-foreground">Percentage</Badge>
  } else if (type === "amount") {
    return <Badge className="bg-warning1 text-warning1-foreground">Fixed Amount</Badge>
  }
};

export function getDiscountCodeStatusBadge(status: string) {
  if (status === "active") {
    return <Badge className="bg-success1 text-success1-foreground">Active</Badge>
  } else if (status === "inactive") {
    return <Badge className="bg-error1 text-error1-foreground">Inactive</Badge>
  }
};

export default function DiscountCodesFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "";
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: searchParams.get("fromDate") ? new Date(searchParams.get("fromDate") as string) : undefined,
    to: searchParams.get("toDate") ? new Date(searchParams.get("toDate") as string) : undefined,
  });
  const status = searchParams.get("status") || "";

  const handleTypeChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      type: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);

    const from = range?.from?.toISOString();
    const to = range?.to?.toISOString();

    const newQuery = updateQueryParams(searchParams, {
      fromDate: from || "",
      toDate: to || "",
      page: 1,
    });

    router.push(`?${newQuery}`);
  };

  const handleStatusChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      status: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  return (
    <>
      <Select value={type} onValueChange={(value) => handleTypeChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-40">
          <SelectValue placeholder="Discount type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All type</SelectItem>
          {["percent", "amount"].map(value => (
            <SelectItem key={value} value={value}>{getDiscountCodeTypeBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DateRangePicker
        initialDateRange={dateRange}
        onChange={handleDateRangeChange}
        disabledDays={{ after: new Date() }}
      />

      <Select value={status} onValueChange={(value) => handleStatusChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-30">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          {["active", "inactive"].map(value => (
            <SelectItem key={value} value={value}>{getDiscountCodeStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}