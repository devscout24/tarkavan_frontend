"use client"

import CommonBtn from "@/components/common/common-btn"
import type { ReactNode } from "react" 
import { usePathname, useRouter } from "next/navigation"

type CoachQuickAction = {
  icon: ReactNode
  label: string
  active?: boolean
  link?: string
}

 

export default function CoachQuickActions({
  actions,
}: {
  actions: CoachQuickAction[]
}) {
  const router = useRouter()
  const pathname = usePathname()

 

  return (
    <div className="space-y-3">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          onClick={() =>  router.push(`${pathname}${action.link}`) }
          className={`group flex w-full cursor-pointer items-center justify-between rounded-[16px] border px-4 py-4 text-left transition-colors ${
            action.active
              ? "border-brand bg-brand"
              : "border-secondary bg-secondary/25 hover:border-brand hover:bg-brand"
          }`}
        >
          <span className="flex items-center gap-3">
            <span
              className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                action.active
                  ? "text-primary"
                  : "text-white group-hover:text-primary"
              }`}
            >
              {action.icon}
            </span>
            <span
              className={`text-[15px] leading-[150%] transition-all duration-200 ${
                action.active
                  ? "font-semibold text-primary"
                  : "font-medium text-white group-hover:font-semibold group-hover:text-primary"
              }`}
            >
              {action.label}
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}

export function CoachActionButton({
  text,
  icon,
  active = false,
}: {
  text: string
  icon: ReactNode
  active?: boolean
}) {
  return (
    <CommonBtn
      variant={active ? "default" : "secondary"}
      size="lg"
      text={text}
      icon={icon}
      className={`h-11 w-full rounded-[10px] text-base font-medium ${
        active
          ? "bg-brand text-primary hover:bg-brand/90"
          : "bg-secondary text-white hover:bg-secondary/90"
      }`}
    />
  )
}
