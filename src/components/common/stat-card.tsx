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
    <div className="w-full rounded-[16px] border border-secondary/40 p-4">
      <div className="flex">
        {/* icon box */}
        <div className="grid min-h-10 min-w-10 place-items-center rounded-[10px] bg-brand text-primary">
          <div className="h-5 w-5">{icon}</div>
        </div>

        {/* title */}
        <h3 className="ml-2.5 text-[14px] text-white">{title}</h3>
      </div>

      {/* text btm */}
      <p className="text-bold mt-3 text-xl text-white">{text}</p>
    </div>
  )
}
