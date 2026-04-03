import { CalendarDays } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

interface DatepickerFieldProps {
  label: string
  selected?: Date
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (date: Date | undefined) => void
  className?: string
  labelClassName?: string
  triggerClassName?: string
  calendarClassName?: string
  placeholder?: string
}

export default function DatepickerField({
  label,
  selected,
  open,
  onOpenChange,
  onSelect,
  className = "",
  labelClassName = "",
  triggerClassName = "",
  calendarClassName = "",
  placeholder = "mm/dd/yyyy",
}: DatepickerFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className={`text-sm font-medium text-white ${labelClassName}`}>
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => onOpenChange(!open)}
          className={`flex h-11 w-full items-center rounded-xl border border-white/10 bg-[#0F1117] px-3 text-left ${triggerClassName}`}
        >
          <span
            className={
              selected ? "text-sm text-white" : "text-sm text-secondary/40"
            }
          >
            {selected ? format(selected, "MM/dd/yyyy") : placeholder}
          </span>
          <CalendarDays className="ml-auto size-4 text-white/70" />
        </button>

        {open && (
          <div className="absolute z-30 mt-2 rounded-xl border border-white/10 bg-[#0F1117] p-2 shadow-xl">
            <Calendar
              mode="single"
              selected={selected}
              onSelect={(date) => {
                onSelect(date)
                onOpenChange(false)
              }}
              className={calendarClassName}
            />
          </div>
        )}
      </div>
    </div>
  )
}
