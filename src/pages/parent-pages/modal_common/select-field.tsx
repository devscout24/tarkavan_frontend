import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectOption = {
  value: string
  label: string
}

interface SelectFieldProps {
  label: string
  placeholder: string
  options: SelectOption[]
  className?: string
  triggerClassName?: string
  labelClassName?: string
  itemClassName?: string
  value?: string
  onValueChange?: (value: string) => void
  error?: string
  required?: boolean
}

const defaultItemClassName =
  "text-primary hover:bg-brand hover:text-primary focus:bg-brand focus:text-primary"

export default function SelectField({
  label,
  placeholder,
  options,
  className = "",
  triggerClassName = "",
  labelClassName = "",
  itemClassName = defaultItemClassName,
  value,
  onValueChange,
  error,
}: SelectFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className={cn("text-sm font-medium text-white", labelClassName)}>
        {label}
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={cn(error && "border-red-500", triggerClassName)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              className={itemClassName}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
