import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { capitalize, capitalizeWords, cn, updateQueryParams } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/layout/DateRangePicker";
import { DateRange } from "react-day-picker";
import ValueRangePicker from "@/components/layout/ValueRangePicker";
import { IMinMaxFilterData } from "@/interfaces/import.interface";
import { ImportStatus, ImportType } from "@/lib/api/importOrder.api";
import dayjs from "dayjs";

export function getProductImportStatusBadge(status: string, size: "xs" | "sm" = "xs") {
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

export function getProductImportTypeBadge(type: string, size: "xs" | "sm" = "xs") {
  const style = `text-${size}`;

  if (type === "purchase") {
    return (
      <Badge className={cn("bg-warning1 text-warning1-foreground", style)}>
        {capitalizeWords(type)}
      </Badge>
    )
  } else if (type === "customer_return") {
    return (
      <Badge className={cn("bg-error1 text-error1-foreground", style)}>
        Customer return
      </Badge>
    )
  } else {
    return (
      <Badge variant="secondary" className={style}>
        {capitalizeWords(type)}
      </Badge>
    )
  }
};

export default function ImportsFilter({
  data,
  totalRange,
  handleApplyTotal,
}: {
  data: IMinMaxFilterData;
  totalRange: number[];
  handleApplyTotal: (range: number[]) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: searchParams.get("fromDate") ? new Date(searchParams.get("fromDate") as string) : undefined,
    to: searchParams.get("toDate") ? new Date(searchParams.get("toDate") as string) : undefined,
  });
  const status = searchParams.get("status") || "";
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

  const handleStatusChange = (value: ImportStatus | "all") => {
    const newQuery = updateQueryParams(searchParams, {
      status: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  const handleTypeChange = (value: ImportType | "all") => {
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

      <ValueRangePicker
        placeholder="Total Amount"
        label="Total Amount Range"
        unit="đ"
        min={data.totalAmount.min}
        max={data.totalAmount.max}
        step={100_000}
        value={totalRange}
        handleApply={handleApplyTotal}
      />

      <Select value={status} onValueChange={(value: ImportStatus | "all") => handleStatusChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-34">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          {["draft", "confirmed"].map(value => (
            <SelectItem key={value} value={value}>{getProductImportStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={type} onValueChange={(value: ImportType | "all") => handleTypeChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-42">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All type</SelectItem>
          {["purchase", "customer_return"].map(value => (
            <SelectItem key={value} value={value}>{getProductImportTypeBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}