interface StrengthItemCheckboxProps {
  label: string
  checked: boolean
  disabled?: boolean
  onChange: () => void
}

export default function StrengthItemCheckbox({
  label,
  checked,
  disabled = false,
  onChange,
}: StrengthItemCheckboxProps) {
  return (
    <label
      className={`inline-flex items-center gap-2 text-[14px] leading-[150%] font-normal text-white/70 ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="h-4 w-4 cursor-pointer rounded-xs border border-white/50 bg-transparent accent-[#C6F57A]"
      />
      <span>{label}</span>
    </label>
  )
}
