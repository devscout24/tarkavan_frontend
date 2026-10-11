"use client"

import { getPlayerPosition } from "@/app/(dashboards)/action"
import PositionMap from "@/components/common/position-map"
import { sortPositions } from "@/lib/sort-position"
import { TPlayerPosition } from "@/types"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Compass, Shield, Target } from "lucide-react"
import { TPlayerProfilePayload } from "../type"

export default function PositionSelection({
  payload,
  setPayload,
}: {
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}) {
  const [positions, setPositions] = useState<TPlayerPosition[]>([])

  useEffect(() => {
    const getPositions = async () => {
      try {
        const res = await getPlayerPosition()
        if (
          res &&
          typeof res === "object" &&
          "success" in res &&
          res.success &&
          "data" in res
        ) {
          setPositions(sortPositions(res.data.data))
        }
      } catch (error) {
        console.error("Error fetching positions:", error)
      }
    }
    getPositions()
  }, [])

  const selectedPrimary = String(payload.primaryPosition || "")
  const selectedSecondary = String(payload.secondaryPosition || "")

  const primaryObj = positions.find((p) => String(p.id) === selectedPrimary)
  const secondaryObj = positions.find((p) => String(p.id) === selectedSecondary)

  const highlightedPositions = positions.filter((pos) =>
    [selectedPrimary, selectedSecondary].includes(String(pos.id))
  )

  return (
    <div className="rounded-2xl border border-white/10 bg-[#181E2B] p-5 space-y-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Compass className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Pitch Positioning</h3>
            <p className="text-[11px] text-white/50">Select primary tactical role and secondary alternative</p>
          </div>
        </div>

        {/* Selected Badges Preview */}
        <div className="flex items-center gap-2">
          {primaryObj && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-bold text-brand ring-1 ring-brand/30">
              Primary: {primaryObj.name}
            </span>
          )}
          {secondaryObj && (
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/15 px-2.5 py-0.5 text-[11px] font-bold text-teal-300 ring-1 ring-teal-500/30">
              Secondary: {secondaryObj.name}
            </span>
          )}
        </div>
      </div>

      {/* Interactive Pitch Visualizer Card */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#131824] p-3 shadow-inner">
        <div className="relative mx-auto max-w-2xl">
          <PositionMap data={highlightedPositions} />
        </div>
      </div>

      {/* Position Selectors */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 rounded-xl border border-white/5 bg-[#1E2536] p-3.5">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-white">
              <Target className="size-3.5 text-brand" />
              <span>Primary Position</span>
              <span className="text-brand">*</span>
            </label>
            <span className="text-[10px] text-white/50 uppercase tracking-wider">Main Role</span>
          </div>

          <Select
            value={selectedPrimary}
            onValueChange={(value) =>
              setPayload((prev) => ({ ...prev, primaryPosition: value }))
            }
          >
            <SelectTrigger className="h-11 w-full rounded-xl border border-white/10 bg-[#252E42] px-3.5 text-xs text-white data-placeholder:text-white/40 hover:border-brand/50 transition-colors">
              <SelectValue placeholder="Select primary position" />
            </SelectTrigger>
            <SelectContent position="popper" className="border-white/10 bg-[#1E2536] text-white shadow-xl">
              <SelectGroup>
                {positions.map((pos) => (
                  <SelectItem
                    key={pos.id}
                    value={String(pos.id)}
                    className="text-xs hover:bg-brand hover:text-black focus:bg-brand focus:text-black"
                  >
                    {pos.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 rounded-xl border border-white/5 bg-[#1E2536] p-3.5">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-white">
              <Shield className="size-3.5 text-teal-400" />
              <span>Secondary Position</span>
              <span className="text-brand">*</span>
            </label>
            <span className="text-[10px] text-white/50 uppercase tracking-wider">Alternative</span>
          </div>

          <Select
            value={selectedSecondary}
            onValueChange={(value) =>
              setPayload((prev) => ({ ...prev, secondaryPosition: value }))
            }
          >
            <SelectTrigger className="h-11 w-full rounded-xl border border-white/10 bg-[#252E42] px-3.5 text-xs text-white data-placeholder:text-white/40 hover:border-brand/50 transition-colors">
              <SelectValue placeholder="Select secondary position" />
            </SelectTrigger>
            <SelectContent position="popper" className="border-white/10 bg-[#1E2536] text-white shadow-xl">
              <SelectGroup>
                {positions.map((pos) => (
                  <SelectItem
                    key={pos.id}
                    value={String(pos.id)}
                    className="text-xs hover:bg-brand hover:text-black focus:bg-brand focus:text-black"
                  >
                    {pos.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
