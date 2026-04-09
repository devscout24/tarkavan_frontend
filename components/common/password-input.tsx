import {
  Field, 
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {  ShieldCheck } from "lucide-react" 
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { useState } from "react";



type InputProps = {
  id?: string
  label?: string
  placeholder?: string 
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
  icon?: React.ReactNode
  value?: string
}

export default function PwdInput({ 
  label,
  placeholder, 
  onChange,
  className ,
  icon,
  value
}: InputProps) {
    
    const [showPassword, setShowPassword] =  useState(false);

  return (
    <Field>
      {label &&  <FieldLabel htmlFor={label || "" }>{label}</FieldLabel>} 
      <div className="relative    ">  
        <div className="absolute top-1/2 left-1 -translate-y-1/2 text-secondary ">
            {icon ? icon : <ShieldCheck />}
        </div> 
        <Input
          id={label || ""}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder || "Enter something..."}
          value={value}
          onChange={onChange}
          className={`bg-[#2B2E36] text-white placeholder:text-white/50 font-light  py-6 border-white/10 focus-visible:ring-brand/30 focus-visible:border-brand/50 pl-8 pr-10  ${className}`}
        />  

        <div   
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-1 -translate-y-1/2 text-secondary py-4 px-2  cursor-pointer    "
        >
          {showPassword ? <GoEye /> : <GoEyeClosed />}
        </div>
      </div>
    </Field>
  )
}




