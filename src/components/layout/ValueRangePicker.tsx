"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { Slider } from "@/components/ui/slider"
import { Filter } from "lucide-react"

export default function ValueRangePicker({
  placeholder,
  label,
  unit = "",
  min = 0,
  max = 5_000_000,
  step = 10_000,
  value,
  handleApply,
}: {
  placeholder: string;
  label: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number[];
  handleApply: (val: number[]) => void;
}) {
  const [range, setRange] = useState(value);

  useEffect(() => {
    setRange(value)
  }, [value]);

  const updateMin = (val: number) => {
    const newLow = Math.min(Math.max(val, min), range[1])
    const newRange = [newLow, range[1]]
    setRange(newRange)
  };

  const updateMax = (val: number) => {
    const newHigh = Math.max(Math.min(val, max), range[0])
    const newRange = [range[0], newHigh]
    setRange(newRange)
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="input" className="gap-3 font-normal">
          {placeholder}
          <Filter />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-100 flex flex-col p-6 rounded-3xl">
        <h4 className="font-medium">{label}</h4>

        <div className="flex items-center justify-between gap-3 mt-10">
          <Input
            type="number"
            value={range[0]}
            onChange={(e) => updateMin(Number(e.target.value))}
            className="text-center"
          />
          -
          <Input
            type="number"
            value={range[1]}
            onChange={(e) => updateMax(Number(e.target.value))}
            className="text-center"
          />
        </div>

        <Slider
          min={min}
          max={max}
          step={step}
          value={range}
          onValueChange={setRange}
          className="w-full mt-6"
        />

        <div className="mt-8 text-sm text-muted-foreground border-t pt-4">
          *From: <span className="font-medium text-foreground">{range[0].toLocaleString()}{unit}</span> to <span className="font-medium text-foreground">{range[1].toLocaleString()}{unit}</span>
        </div>

        <PopoverClose asChild>
          <Button
            size="sm"
            className="px-8 text-xs self-center mt-8"
            onClick={() => { handleApply(range) }}
          >
            Apply Now
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
