import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { capitalize, capitalizeWords, cn, updateQueryParams } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import dayjs from "dayjs";
import { BatchExpiredStatus, BatchStockStatus } from "@/lib/api/batch.api";

export function getBatchExpiredStatusBadge(status: string, size: "xs" | "sm" = "xs") {
  const style = `text-${size}`;

  if (status === "expired") {
    return (
      <Badge className={cn("bg-error text-error-foreground", style)}>
        Expired
      </Badge>
    )
  } else if (status === "less-than-1-month") {
    return (
      <Badge className={cn("bg-error1 text-error1-foreground", style)}>
        Less than 1 month
      </Badge>
    )
  } else if (status === "1-3-months") {
    return (
      <Badge className={cn("bg-warning1 text-warning1-foreground", style)}>
        1-3 months
      </Badge>
    )
  } else if (status === "3-6-months") {
    return (
      <Badge className={cn("bg-info1 text-info1-foreground", style)}>
        3-6 months
      </Badge>
    )
  } else {
    return (
      <Badge variant="secondary" className={style}>
        {capitalizeWords(status)}
      </Badge>
    )
  }
};

export function getBatchStockStatusBadge(status: string, size: "xs" | "sm" = "xs") {
  const style = `text-${size}`;

  if (status === "low") {
    return (
      <Badge className={cn("bg-warning1 text-warning1-foreground", style)}>
        Low stock
      </Badge>
    )
  } else if (status === "out") {
    return (
      <Badge className={cn("bg-error1 text-error1-foreground", style)}>
        Out of stock
      </Badge>
    )
  } else {
    return (
      <Badge variant="secondary" className={style}>
        {capitalizeWords(status)}
      </Badge>
    )
  }
};

export default function BatchesFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const expiredStatus = searchParams.get("expiredStatus") || "";
  const stockStatus = searchParams.get("stockStatus") || "";

  const handleExpiredStatusChange = (value: BatchExpiredStatus | "all") => {
    const newQuery = updateQueryParams(searchParams, {
      expiredStatus: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  const handleStockStatusChange = (value: BatchStockStatus | "all") => {
    const newQuery = updateQueryParams(searchParams, {
      stockStatus: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  return (
    <>
      <Select value={expiredStatus} onValueChange={(value: BatchExpiredStatus | "all") => handleExpiredStatusChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-48">
          <SelectValue placeholder="Expired Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          {["expired", "less-than-1-month", "1-3-months", "3-6-months"].map(value => (
            <SelectItem key={value} value={value}>{getBatchExpiredStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={stockStatus} onValueChange={(value: BatchStockStatus | "all") => handleStockStatusChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-42">
          <SelectValue placeholder="Stock Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          {["low", "out"].map(value => (
            <SelectItem key={value} value={value}>{getBatchStockStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}