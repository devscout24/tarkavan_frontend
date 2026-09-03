"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { DatePickerWithRange } from "./date-range"
import { DateRange } from "react-day-picker"

export type StatusFilterOption = {
  value: string
  label: string
}

type StatusFilterSelectProps = {
  value?: string
  onValueChange?: (value: string) => void
  options: StatusFilterOption[]
  placeholder?: string
  className?: string
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  date: DateRange | undefined
}

export default function StatusFilterSelect({
  value,
  onValueChange,
  options,
  placeholder = "All Status",
  className,
  triggerClassName,
  contentClassName,
  itemClassName,
  setDate,
  date,
}: StatusFilterSelectProps) {
  return (
    <div className={`flex items-end gap-2 ${className}`}>
      <DatePickerWithRange
        date={date}
        setDate={setDate}
      />

      <div className="w-fit">
        <p className="text-sm text-white pb-1.5 ">Filter status</p>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            className={cn(
              "mr-2 h-10 w-full rounded-md border-white/20 bg-transparent px-3 text-white",
              triggerClassName
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent
            align="end"
            position="popper"
            className={cn(
              "border-white/10 bg-secondary text-white",
              contentClassName
            )}
          >
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className={cn(
                  "cursor-pointer px-3 py-2 text-sm text-white data-highlighted:bg-brand data-highlighted:text-primary",
                  itemClassName
                )}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
