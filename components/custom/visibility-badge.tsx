import { cn } from "@/lib/utils"

interface VisibilityBadgeProps {
  privacy_settings: string
  block_status: boolean
  className?: string
}

export default function VisibilityBadge({
  privacy_settings,
  block_status,
  className,
}: VisibilityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-2 text-base leading-[120%] font-normal text-white lg:px-2.5 lg:py-1.5 lg:text-sm xl:px-3 xl:py-2 xl:text-base",
         "bg-brand text-primary uppercase   ",
        className
      )}
    >
      {block_status ? "BLOCKED" : privacy_settings}
    </span>
  )
}
