import type { HTMLInputTypeAttribute, InputHTMLAttributes } from "react"
import { forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder?: string
  className?: string
  labelClassName?: string
  type?: HTMLInputTypeAttribute
  error?: string 
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      placeholder,
      className = "",
      labelClassName = "",
      type = "text",
      value,
      onChange,
      error, 
      ...rest
    },
    ref
  ) => {
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
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn(
            "placeholder:text-4 overflow-hidden text-ellipsis whitespace-nowrap placeholder:leading-[150%] placeholder:font-normal placeholder:text-white/30",
            error && "border-red-500 focus-visible:border-red-500",
            className
          )}
          {...rest}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

InputField.displayName = "InputField"

export default InputField
