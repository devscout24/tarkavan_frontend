import type { ReactNode } from "react"

type RecentActivityRowProps = {
  icon: ReactNode
  title: string
  time: string
  showDivider?: boolean
}

export default function RecentActivityRow({
  icon,
  title,
  time,
  showDivider = false,
}: RecentActivityRowProps) {
  return (
    <div
      className={`flex items-start gap-3 px-4 py-4 sm:px-5 ${
        showDivider ? "border-b border-secondary/60" : ""
      }`}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-primary">
        <div className="h-4.5 w-4.5">{icon}</div>
      </div>

      <div className="min-w-0">
        <p className="text-base leading-[125%] font-normal text-[#ffffff]">
          {title}
        </p>
        <p className="text-base leading-[150%] text-secondary">{time}</p>
      </div>
    </div>
  )
}
