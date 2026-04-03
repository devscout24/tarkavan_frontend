import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react"
import { Input } from "@/components/ui/input"

interface InputFieldProps {
  label: string
  placeholder?: string
  className?: string
  labelClassName?: string
  type?: HTMLInputTypeAttribute
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function InputField({
  label,
  placeholder,
  className = "",
  labelClassName = "",
  type = "text",
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className={`text-sm font-medium text-white ${labelClassName}`}>
        {label}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
  )
}
