interface StrengthCategoryItemProps {
  label: string
  selected: boolean
  onClick: () => void
}

export default function StrengthCategoryItem({
  label,
  selected,
  onClick,
}: StrengthCategoryItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-11 w-full rounded-xl border px-4 text-left text-base leading-[150%] font-medium text-white transition-colors ${
        selected
          ? "border-white/20 bg-secondary/40"
          : "border-white/20 bg-transparent hover:bg-secondary/20"
      }`}
    >
      {label}
    </button>
  )
}
