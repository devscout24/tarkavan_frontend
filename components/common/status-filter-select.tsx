"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

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
}: StatusFilterSelectProps) {
  return (
    <div className={className}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={cn(
            "h-10 w-full rounded-xl border-white/20 bg-transparent px-3 text-white",
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
  )
}
