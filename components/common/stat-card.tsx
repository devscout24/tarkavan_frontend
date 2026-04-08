import type React from "react"

export default function StatCard({
  icon,
  title = "State title",
  text = "Down text",
}: {
  icon?: React.ReactNode
  title?: string
  text?: string
}) {
  return (
    <div className="h-full rounded-[16px] border border-secondary p-4">
      <div className="flex items-start">
        {/* icon box */}
        <div className="grid min-h-10 min-w-10 place-items-center rounded-[10px] bg-brand text-primary">
          <div className="h-5 w-5">{icon}</div>
        </div>

        {/* title */}
        <h3 className="ml-2.5 min-w-0 text-sm leading-[135%] wrap-break-word text-white">
          {title}
        </h3>
      </div>

      {/* text btm */}
      <p className="mt-3 text-xl font-bold text-white">{text}</p>
    </div>
  )
}
