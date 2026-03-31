import {
  Field, 
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input" 

 

type InputProps = {
  id?: string
  label?: string
  placeholder?: string
  type?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
}

export default function UiInput({ 
  label,
  placeholder,
  type,
  onChange,
  className
}: InputProps) { 

  return (
    <Field>
      {label &&  <FieldLabel htmlFor={label || "" }>{label}</FieldLabel>} 
      <Input
        id={label || ""}
        type={type || "text"}
        placeholder={placeholder || "Enter something..."}
        onChange={onChange}
        className={`bg-[#2B2E36] text-white placeholder:text-white/50 font-light  py-6 border-white/10 focus-visible:ring-brand/30 focus-visible:border-brand/50   ${className}`}
      /> 
    </Field>
  )
}




 
// import * as React from "react"

// import { cn } from "@/lib/utils"

// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export { Input }
