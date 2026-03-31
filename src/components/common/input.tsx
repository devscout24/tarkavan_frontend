import { Field, FieldLabel } from "@/components/ui/field"

type InputProps = {
  label?: string
  placeholder?: string
  type?: string
  onChange?: () => void
}

export default function Input({
  label,
  placeholder,
  type,
  onChange,
}: InputProps) {
  return (
    <Field>
      {label && (
        <FieldLabel htmlFor="input-field-username">{label || "Label"}</FieldLabel>
      )}
      <Input
        type={type || "text"}
        placeholder={placeholder || "Enter something..."}
        onChange={onChange}
      />
    </Field>
  )
}
