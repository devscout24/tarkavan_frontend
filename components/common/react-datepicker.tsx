"use client"

import ReactDatePicker from "react-datepicker"
import { CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import "react-datepicker/dist/react-datepicker.css"
import "./react-datepicker-custom.css"

interface ReactDatepickerProps {
  label: string
  selected?: Date
  onChange: (date: Date | null) => void
  className?: string
  labelClassName?: string
  inputClassName?: string
  placeholder?: string
  error?: string
  required?: boolean
}

export default function ReactDatepicker({
  label,
  selected,
  onChange,
  className = "",
  labelClassName = "",
  inputClassName = "",
  placeholder = "Select date",
  error,
}: ReactDatepickerProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className={cn("text-sm font-medium text-white", labelClassName)}>
        {label}
      </label>
      <div className="relative">
        <ReactDatePicker
          selected={selected}
          onChange={onChange}
          placeholderText={placeholder}
          className={cn(
            "flex h-11 w-full items-center rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0 pr-10",
            error && "border-red-500",
            inputClassName
          )}
          wrapperClassName="w-full"
          calendarClassName="bg-secondary/10 border border-white/10 rounded-xl text-white"
          popperClassName="z-50"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          showMonthDropdown
          useShortMonthInDropdown
          maxDate={new Date()}
          dateFormat="MM/dd/yyyy"
        />
        <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-white/70 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
