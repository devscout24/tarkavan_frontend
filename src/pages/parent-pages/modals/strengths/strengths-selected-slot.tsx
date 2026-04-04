interface StrengthsSelectedSlotProps {
  label?: string
}

export default function StrengthsSelectedSlot({
  label,
}: StrengthsSelectedSlotProps) {
  const hasValue = Boolean(label)

  return (
    <div
      className={`flex h-8 min-w-24 items-center justify-center rounded-full px-3 text-[12px] leading-[150%] font-normal ${
        hasValue
          ? "border border-white/15 bg-secondary text-white"
          : "border border-dashed border-white/20 bg-transparent text-transparent"
      }`}
    >
      {label ?? "placeholder"}
    </div>
  )
}
