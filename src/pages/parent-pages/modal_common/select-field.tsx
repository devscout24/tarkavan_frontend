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
}: SelectFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className={`text-sm font-medium text-white ${labelClassName}`}>
        {label}
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={triggerClassName}>
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
    </div>
  )
}
