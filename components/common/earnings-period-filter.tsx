"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type EarningsChartFilter = "month" | "6-month" | "1-year"

const FILTER_OPTIONS: Array<{ value: EarningsChartFilter; label: string }> = [
  { value: "month", label: "Month" },
  { value: "6-month", label: "6 Month" },
  { value: "1-year", label: "1 Year" },
]

type EarningsPeriodFilterProps = {
  value: EarningsChartFilter
  onValueChange: (value: EarningsChartFilter) => void
  className?: string
  triggerClassName?: string
}

export default function EarningsPeriodFilter({
  value,
  onValueChange,
  className,
  triggerClassName,
}: EarningsPeriodFilterProps) {
  return (
    <div className={className}>
      <Select
        value={value}
        onValueChange={(nextValue) =>
          onValueChange(nextValue as EarningsChartFilter)
        }
      >
        <SelectTrigger
          className={cn(
            "h-11 w-full rounded-xl border-white/20 bg-secondary/10 px-4 text-base text-brand hover:border-brand/50 sm:w-35",
            triggerClassName
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          align="end"
          position="popper"
          className="w-35 border-white/15 bg-primary/95 p-1"
        >
          {FILTER_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer rounded-md bg-secondary/10 px-3 py-2 text-sm text-white transition-colors data-highlighted:bg-brand data-highlighted:text-primary data-[state=checked]:text-brand"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
