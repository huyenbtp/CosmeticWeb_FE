import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { capitalize, capitalizeWords, cn, updateQueryParams } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/layout/DateRangePicker";
import { DateRange } from "react-day-picker";
import { ExportType } from "@/lib/api/inventoryExport.api";
import dayjs from "dayjs";

export function getProductExportStatusBadge(status: string, size: "xs" | "sm" = "xs") {
  const style = `text-${size}`;

  if (status === "draft") {
    return (
      <Badge variant="outline" className={style}>
        {capitalizeWords(status)}
      </Badge>
    )
  } else if (status === "confirmed") {
    return (
      <Badge className={cn("bg-success1 text-success1-foreground", style)}>
        {capitalizeWords(status)}
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

export function getProductExportTypeBadge(type: string, size: "xs" | "sm" = "xs") {
  const style = `text-${size}`;

  if (type === "sales") {
    return (
      <Badge className={cn("bg-warning1 text-warning1-foreground", style)}>
        {capitalizeWords(type)}
      </Badge>
    )
  } else if (type === "discard") {
    return (
      <Badge className={cn("bg-error1 text-error1-foreground", style)}>
        {capitalizeWords(type)}
      </Badge>
    )
  } else {
    return (
      <Badge className={cn("bg-info1 text-info1-foreground", style)}>
        {capitalizeWords(type)}
      </Badge>
    )
  }
};

export default function ExportsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: searchParams.get("fromDate") ? new Date(searchParams.get("fromDate") as string) : undefined,
    to: searchParams.get("toDate") ? new Date(searchParams.get("toDate") as string) : undefined,
  });
  const type = searchParams.get("type") || "";

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);

    const from = range?.from;
    const to = range?.to;
    const fromDate = dayjs(from).add(7, "hour").toISOString();    //fix tạm
    const toDate = dayjs(to).add(31, "hour").toISOString();

    const newQuery = updateQueryParams(searchParams, {
      fromDate: from ? fromDate : "",
      toDate: to ? toDate : "",
      page: 1,
    });

    router.push(`?${newQuery}`);
  };

  const handleTypeChange = (value: ExportType | "all") => {
    const newQuery = updateQueryParams(searchParams, {
      type: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  return (
    <>
      <DateRangePicker
        initialDateRange={dateRange}
        onChange={handleDateRangeChange}
        disabledDays={{ after: new Date() }}
      />

      <Select value={type} onValueChange={(value: ExportType | "all") => handleTypeChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-42">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All type</SelectItem>
          {["sales", "discard", "adjust"].map(value => (
            <SelectItem key={value} value={value}>{getProductExportTypeBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}