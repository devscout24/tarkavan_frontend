"use client"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/primitives/animate/tabs"
import { TbPlayFootball } from "react-icons/tb"
import { IoHandRightOutline } from "react-icons/io5"
import { Activity, Minus, Plus, ShieldCheck, Award, Flag, Flame } from "lucide-react"
import { TPlayerProfilePayload } from "../type"

interface StatConfig {
  key: keyof TPlayerProfilePayload["seasonStats"]["values"]
  title: string
  subtitle: string
  icon: any
  color: string
}

const OUTFIELD_STATS: StatConfig[] = [
  {
    key: "gamesPlayed",
    title: "Games Played",
    subtitle: "Total match appearances",
    icon: TbPlayFootball,
    color: "from-blue-500/25 to-blue-500/10 text-blue-300 border-blue-500/40",
  },
  {
    key: "goals",
    title: "Goals Scored",
    subtitle: "Competitive match goals",
    icon: Flame,
    color: "from-brand/25 to-brand/10 text-brand border-brand/40",
  },
  {
    key: "assists",
    title: "Assists Made",
    subtitle: "Decisive passes leading to goals",
    icon: Award,
    color: "from-teal-500/25 to-teal-500/10 text-teal-300 border-teal-500/40",
  },
  {
    key: "yellowCards",
    title: "Yellow Cards",
    subtitle: "Official referee cautions",
    icon: Flag,
    color: "from-amber-500/25 to-amber-500/10 text-amber-300 border-amber-500/40",
  },
  {
    key: "redCards",
    title: "Red Cards",
    subtitle: "Official match dismissals",
    icon: Flag,
    color: "from-red-500/25 to-red-500/10 text-red-400 border-red-500/40",
  },
]

const GK_EXTRA_STATS: StatConfig[] = [
  {
    key: "cleanSheets",
    title: "Clean Sheets",
    subtitle: "Matches with 0 goals conceded",
    icon: ShieldCheck,
    color: "from-emerald-500/25 to-emerald-500/10 text-emerald-300 border-emerald-500/40",
  },
  {
    key: "totalSaves",
    title: "Penalties Saved",
    subtitle: "Penalty kicks successfully stopped",
    icon: IoHandRightOutline,
    color: "from-violet-500/25 to-violet-500/10 text-violet-300 border-violet-500/40",
  },
]

export default function SeasonStats({
  payload,
  setPayload,
}: {
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}) {
  const activeTab = payload.seasonStats.activeTab || "outfield"

  const handleTabChange = (tab: "outfield" | "goalkeeper") => {
    setPayload((prev) => ({
      ...prev,
      seasonStats: {
        ...prev.seasonStats,
        activeTab: tab,
      },
    }))
  }

  const handleStatChange = (key: string, value: string) => {
    const cleanVal = value.replace(/[^0-9]/g, "")
    setPayload((prev) => ({
      ...prev,
      seasonStats: {
        ...prev.seasonStats,
        values: {
          ...prev.seasonStats.values,
          [key]: cleanVal,
        },
      },
    }))
  }

  const handleStep = (key: string, delta: number) => {
    const currentVal = parseInt(payload.seasonStats.values[key as keyof typeof payload.seasonStats.values] || "0", 10)
    const nextVal = Math.max(0, (isNaN(currentVal) ? 0 : currentVal) + delta)
    handleStatChange(key, String(nextVal))
  }

  const statsToRender =
    activeTab === "goalkeeper"
      ? [...OUTFIELD_STATS, ...GK_EXTRA_STATS]
      : OUTFIELD_STATS

  return (
    <div className="rounded-2xl border border-white/10 bg-[#181E2B] p-5 space-y-5 shadow-sm">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Activity className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Season Performance Record</h3>
            <p className="text-[11px] text-white/50">Log official appearance and competitive season statistics</p>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(val: string) => handleTabChange(val as "outfield" | "goalkeeper")}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid h-9 w-full grid-cols-2 rounded-xl bg-[#141A26] p-1 sm:w-64 border border-white/10">
            <TabsTrigger
              value="outfield"
              className="flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold text-white/70 transition-all data-[state=active]:bg-brand data-[state=active]:text-black"
            >
              <TbPlayFootball className="size-3.5" />
              <span>Outfield</span>
            </TabsTrigger>
            <TabsTrigger
              value="goalkeeper"
              className="flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold text-white/70 transition-all data-[state=active]:bg-brand data-[state=active]:text-black"
            >
              <IoHandRightOutline className="size-3.5" />
              <span>Goalkeeper</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Scouting Cards Grid */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {statsToRender.map((stat) => {
          const Icon = stat.icon
          const val = payload.seasonStats.values[stat.key] || "0"
          const numVal = parseInt(val, 10) || 0
          const hasValue = numVal > 0

          return (
            <div
              key={stat.key}
              className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-200 ${
                hasValue
                  ? "border-brand/40 bg-[#222B3D] shadow-md shadow-brand/5"
                  : "border-white/10 bg-[#1E2536] hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`flex size-9 items-center justify-center rounded-xl bg-linear-to-br border ${stat.color}`}>
                    <Icon className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{stat.title}</h4>
                    <p className="text-[10px] text-white/50">{stat.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Number Stepper Control */}
              <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-[#141A26] p-1">
                <button
                  type="button"
                  onClick={() => handleStep(stat.key, -1)}
                  disabled={numVal <= 0}
                  className="flex size-7 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <Minus className="size-3" />
                </button>

                <input
                  type="text"
                  inputMode="numeric"
                  value={val}
                  onChange={(e) => handleStatChange(stat.key, e.target.value)}
                  className="w-16 bg-transparent text-center text-sm font-bold text-white focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => handleStep(stat.key, 1)}
                  className="flex size-7 items-center justify-center rounded-md bg-brand/15 text-brand transition-colors hover:bg-brand/25 active:scale-95"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
