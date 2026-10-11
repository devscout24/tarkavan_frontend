"use client"

import { useState } from "react"
import { Sparkles, Check, Flame } from "lucide-react"
import { TPlayerProfilePayload } from "../type"

const CATEGORIES = [
  {
    id: "technical",
    label: "Technical",
    strengths: ["Passing", "Dribbling", "Ball Control", "Shooting"],
  },
  {
    id: "tactical",
    label: "Tactical",
    strengths: ["Vision", "Decision Making", "Positioning", "Awareness"],
  },
  {
    id: "mental",
    label: "Mental",
    strengths: ["Leadership", "Confidence", "Composure", "Focus"],
  },
  {
    id: "physical",
    label: "Physical",
    strengths: ["Speed", "Strength", "Agility", "Stamina"],
  },
  {
    id: "attacking",
    label: "Attacking",
    strengths: ["Finishing", "Crossing", "Creativity", "Movement"],
  },
  {
    id: "defending",
    label: "Defending",
    strengths: ["Marking", "Tackling", "Interceptions"],
  },
  {
    id: "aerial",
    label: "Aerial",
    strengths: ["Heading", "Aerial Duels", "Jumping Ability"],
  },
] as const

const MAX_SELECTED = 7

export default function StrengthsDesign({
  payload,
  setPayload,
}: {
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}) {
  const [activeTab, setActiveTab] = useState<string>(
    payload?.strengths?.activeCategoryId || CATEGORIES[0].id
  )

  const selectedByCategory = payload?.strengths?.selectedByCategory || {}
  const selectedCount = Object.values(selectedByCategory).filter(Boolean).length

  const activeCategory =
    CATEGORIES.find((item) => item.id === activeTab) ?? CATEGORIES[0]

  const handleSelect = (strength: string) => {
    const current = selectedByCategory[activeCategory.id]
    let nextValue = ""

    if (current === strength) {
      nextValue = "" // Deselect
    } else {
      if (!current && selectedCount >= MAX_SELECTED) {
        return // Limit reached
      }
      nextValue = strength
    }

    setPayload((prev) => ({
      ...prev,
      strengths: {
        ...prev.strengths,
        activeCategoryId: activeTab,
        selectedByCategory: {
          ...prev.strengths.selectedByCategory,
          [activeCategory.id]: nextValue,
        },
      },
    }))
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#181E2B] p-5 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Flame className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Top 7 Athletic Strengths</h3>
            <p className="text-[11px] text-white/50">Select your key standout attribute in each skill domain</p>
          </div>
        </div>

        {/* Counter Pill */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
              selectedCount === MAX_SELECTED
                ? "bg-brand text-black shadow-md shadow-brand/20"
                : "bg-[#222A3B] text-white/80 border border-white/5"
            }`}
          >
            <Sparkles className="size-3" />
            <span>{selectedCount} of {MAX_SELECTED} Picked</span>
          </span>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((category) => {
          const isSelected = Boolean(selectedByCategory[category.id])
          const isActive = activeTab === category.id

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-1.5 shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-brand text-black shadow-md shadow-brand/20 scale-[1.02]"
                  : "bg-[#222A3B] text-white/70 hover:bg-[#2A344A] hover:text-white border border-white/5"
              }`}
            >
              <span>{category.label}</span>
              {isSelected && (
                <span
                  className={`flex size-4 items-center justify-center rounded-full text-[10px] font-bold ${
                    isActive ? "bg-black text-brand" : "bg-brand text-black"
                  }`}
                >
                  ✓
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Active Category Skills Grid */}
      <div className="rounded-xl border border-white/5 bg-[#141A26] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white/90">
            {activeCategory.label} Attributes
          </span>
          {selectedByCategory[activeCategory.id] ? (
            <span className="text-xs font-bold text-brand">
              Selected: {selectedByCategory[activeCategory.id]}
            </span>
          ) : (
            <span className="text-[11px] text-white/40">Choose 1 attribute</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {activeCategory.strengths.map((strength) => {
            const isChecked = selectedByCategory[activeCategory.id] === strength

            return (
              <button
                key={strength}
                type="button"
                onClick={() => handleSelect(strength)}
                className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                  isChecked
                    ? "border-brand bg-brand/15 text-brand shadow-sm shadow-brand/10 font-bold"
                    : "border-white/5 bg-[#202738] text-white/80 hover:border-white/20 hover:bg-[#262F44] hover:text-white"
                }`}
              >
                <span className="text-xs font-semibold">{strength}</span>
                <div
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isChecked
                      ? "border-brand bg-brand text-black"
                      : "border-white/20"
                  }`}
                >
                  {isChecked && <Check className="size-2.5 stroke-[3]" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}