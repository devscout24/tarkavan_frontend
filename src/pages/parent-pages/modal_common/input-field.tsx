import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

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
      <label
        className={cn(
          "overflow-hidden text-[16px] leading-[150%] font-medium text-ellipsis whitespace-nowrap text-white",
          labelClassName
        )}
      >
        {label}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "placeholder:text-4 overflow-hidden text-ellipsis whitespace-nowrap placeholder:leading-[150%] placeholder:font-normal placeholder:text-white/30",
          className
        )}
      />
    </div>
  )
}
