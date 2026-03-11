"use client"

import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateRangePicker({
  initialDateRange,
  onChange,
  disabledDays,
}: {
  initialDateRange: DateRange | undefined;
  onChange: (r: DateRange | undefined) => void;
  disabledDays?: { before: Date } | { after: Date } | { before: Date; after: Date };
}) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="input" className="gap-3 font-normal">
          {initialDateRange?.from && initialDateRange?.to
            ? `${initialDateRange.from.toLocaleDateString()} - ${initialDateRange.to.toLocaleDateString()}`
            : <span className="text-muted-foreground">Date Range</span>
          }
          <CalendarIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto overflow-hidden p-0" align="center">
        <Calendar
          mode="range"
          selected={initialDateRange}
          captionLayout="dropdown"
          onSelect={onChange}
          disabled={disabledDays}
        />
      </PopoverContent>
    </Popover>
  );
}