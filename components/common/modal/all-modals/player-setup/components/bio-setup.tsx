"use client"

import { FileText } from "lucide-react"
import { TPlayerProfilePayload } from "../type"

export default function BioSetup({
  payload,
  setPayload,
}: {
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}) {
  const bio = payload.biography || ""

  return (
    <div className="rounded-2xl border border-white/10 bg-[#181E2B] p-5 space-y-3 shadow-sm">
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <FileText className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Athlete Biography</h3>
            <p className="text-[11px] text-white/50">
              Summarize playing style, career milestones, and scouting highlights
            </p>
          </div>
        </div>
        <span className="rounded-full bg-[#222A3B] border border-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/60">
          {bio.length} characters
        </span>
      </div>

      <div className="relative">
        <textarea
          rows={4}
          placeholder="e.g. Dynamic box-to-box midfielder with exceptional pitch vision, rapid transition passing, and commanding aerial presence. Captain of Toronto United U19 team..."
          className="w-full resize-none rounded-xl border border-white/10 bg-[#222A3B] p-3.5 text-xs leading-relaxed text-white placeholder:text-white/40 hover:border-white/20 focus:border-brand focus:ring-1 focus:ring-brand/30 focus:outline-none transition-all"
          value={bio}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, biography: e.target.value }))
          }
        />
      </div>
    </div>
  )
}
