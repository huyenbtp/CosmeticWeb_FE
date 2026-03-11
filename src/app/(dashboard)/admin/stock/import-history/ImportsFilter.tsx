import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";
import { DateRangePicker } from "@/components/layout/DateRangePicker";
import { DateRange } from "react-day-picker";
import ValueRangePicker from "@/components/layout/ValueRangePicker";
import { IMinMaxFilterData } from "@/interfaces/import.interface";

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
    </>
  );
}