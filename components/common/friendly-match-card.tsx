import { CalendarDays, MapPin } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type FriendlyMatchCardProps = {
  clubName: string
  title: string
  teamName: string
  date: string
  location: string
  note: string
  actionLabel: string
  className?: string
  gradientClassName?: string
  onClick?: () => void
}

export function FriendlyMatchCard({
  clubName,
  title,
  teamName,
  date,
  location,
  note,
  actionLabel,
  className,
  gradientClassName,
  onClick,
}: FriendlyMatchCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-[#09070f] p-0 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)]",
        className
      )}
    >
      <div
        className={cn(
          "relative min-h-37.5 overflow-hidden px-6 py-7",
          "bg-[radial-gradient(circle_at_top_right,rgba(161,255,183,0.24),transparent_34%),linear-gradient(135deg,#071018_0%,#0d463a_52%,#2aa56a_100%)]",
          gradientClassName
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,14,0.08),rgba(7,9,14,0.35))]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <p className="text-[13px] font-medium tracking-[0.18em] text-white/90 uppercase">
            {clubName}
          </p>
          <h3 className="mt-3 max-w-55 text-2xl leading-tight font-semibold text-white">
            {title}
          </h3>
        </div>
      </div>

      <CardContent className="space-y-3 px-5 py-5">
        <p className="text-xl font-semibold text-white">{teamName}</p>

        <div className="space-y-2 text-sm text-white/72">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-white/55" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-white/55" />
            <span>{location}</span>
          </div>
        </div>

        <div className="rounded-lg bg-white/12 px-4 py-2.5 text-sm text-white/78">
          {note}
        </div>

        <Button
          type="button"
          className="h-11 w-full rounded-xl bg-brand px-4 text-sm font-semibold text-[#111111] shadow-none hover:bg-brand/95"
          onClick={onClick}
        >
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  )
}

export type MatchPlaceholderCardProps = {
  className?: string
}

export function MatchPlaceholderCard({ className }: MatchPlaceholderCardProps) {
  return (
    <Card
      className={cn(
        "min-h-93.5 w-full max-w-[320px] rounded-2xl border border-dashed border-white/12 bg-transparent p-0",
        className
      )}
    />
  )
}
