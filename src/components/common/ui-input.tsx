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
  icon?: React.ReactNode
}

export default function UiInput({ 
  label,
  placeholder,
  type,
  onChange,
  className ,
  icon,
}: InputProps) { 

  return (
    <Field>
      {label &&  <FieldLabel htmlFor={label || "" }>{label}</FieldLabel>} 
      <div className="relative"> 
        {icon && 
        <div className="absolute top-1/2 left-1 -translate-y-1/2 text-secondary ">{icon}</div>
        }  
        <Input
          id={label || ""}
          type={type || "text"}
          placeholder={placeholder || "Enter something..."}
          onChange={onChange}
          className={`bg-[#2B2E36] text-white placeholder:text-white/50 font-light  py-6 border-white/10 focus-visible:ring-brand/30 focus-visible:border-brand/50 ${icon  ? "pl-8" : ""}   ${className}`}
        />  
      </div>
    </Field>
  )
}




