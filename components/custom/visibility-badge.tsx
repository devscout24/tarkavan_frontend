import { cn } from "@/lib/utils"

interface VisibilityBadgeProps {
  isPublic: boolean
  className?: string
}

export default function VisibilityBadge({
  isPublic,
  className,
}: VisibilityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-2 text-base leading-[120%] font-normal text-white lg:px-2.5 lg:py-1.5 lg:text-sm xl:px-3 xl:py-2 xl:text-base",
        isPublic ? "bg-[#00A63E]" : "bg-[#475969]",
        className
      )}
    >
      {isPublic ? "PUBLIC" : "PRIVATE"}
    </span>
  )
}
