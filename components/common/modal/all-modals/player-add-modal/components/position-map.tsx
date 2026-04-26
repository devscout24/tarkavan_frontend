"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import type { WizardState } from "../types"

import ModalStepHeader from "@/components/common/modal-header"
import SoccerField from "./soccer-field"
import PositionDropdowns from "./position-dropdowns"
import { getPlayerPosition } from "@/app/(dashboards)/action"

const MODAL_ROLE_QUERY_KEY = "role"

const roleHeaderCopyByRole: Record<
  string,
  { title: string; subtitle: string }
> = {
  player: {
    title: "Add Player",
    subtitle: "Choose the player role and continue to the position details.",
  },
  parent: {
    title: "Add Child",
    subtitle: "Choose the child role and continue to the position details.",
  },
}

function getAddAthleteRoleHeaderCopy(role: string | null) {
  return role
    ? (roleHeaderCopyByRole[role] ?? roleHeaderCopyByRole.player)
    : roleHeaderCopyByRole.player
}

type Position = {
  id: string
  short: string
  name: string
  x: number
  y: number
}

type ApiPlayerPosition = {
  id: number
  name: string
}

interface PositionMapFormData {
  primaryPosition: string
  secondaryPosition: string
}

const fallbackPositions: Position[] = [
  { id: "GK", short: "GK", name: "Goalkeeper", x: 85, y: 48 },
  { id: "RB", short: "RB", name: "Right Back", x: 70, y: 12 },
  { id: "RCB", short: "RCB", name: "Right Center Back", x: 71, y: 30 },
  { id: "LCB", short: "LCB", name: "Left Center Back", x: 71, y: 62 },
  { id: "LB", short: "LB", name: "Left Back", x: 70, y: 82 },
  { id: "CDM", short: "CDM", name: "Defensive Midfielder", x: 64, y: 49 },
  { id: "CM", short: "CM", name: "Central Midfielder", x: 52, y: 49 },
  { id: "CAM", short: "CAM", name: "Attacking Midfielder", x: 38, y: 47 },
  { id: "RW", short: "RW", name: "Right Wing", x: 37, y: 12 },
  { id: "ST", short: "ST", name: "Striker", x: 29, y: 49 },
  { id: "LW", short: "LW", name: "Left Wing", x: 37, y: 82 },
]

const fallbackByShort = fallbackPositions.reduce<Record<string, Position>>(
  (acc, position) => {
    acc[position.short] = position
    return acc
  },
  {}
)

const extractShortCode = (name: string) => {
  const match = name.match(/\(([^)]+)\)\s*$/)
  return match?.[1]?.trim().toUpperCase() ?? ""
}

// Initial positions visible on field load
const initialPositions = ["LW", "ST", "GK", "RCB", "RW"]

const sectionTitleClassName = "text-[20px] font-bold leading-[150%] text-white"
const sectionSubtitleClassName =
  "text-[14px] font-normal leading-[150%] text-white/70"

export default function PositionMap({
  currentStep,
  totalSteps,
  draft,
  onDraftChange,
}: {
  currentStep: number
  totalSteps: number
  draft: WizardState["forms"]["positionMap"]
  onDraftChange: (value: WizardState["forms"]["positionMap"]) => void
}) {
  const [positions, setPositions] = useState<Position[]>(fallbackPositions)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const roleHeaderCopy = getAddAthleteRoleHeaderCopy(
    searchParams.get(MODAL_ROLE_QUERY_KEY)
  )
  const positionById = useMemo(
    () =>
      positions.reduce<Record<string, Position>>((acc, position) => {
        acc[position.id] = position
        return acc
      }, {}),
    [positions]
  )

  const positionByShort = useMemo(
    () =>
      positions.reduce<Record<string, Position>>((acc, position) => {
        acc[position.short] = position
        return acc
      }, {}),
    [positions]
  )

  const resolvePositionId = useCallback(
    (value: string | null) => {
      if (!value) {
        return ""
      }

      if (positionById[value]) {
        return value
      }

      const normalized = value.toUpperCase()
      return positionByShort[normalized]?.id ?? ""
    },
    [positionById, positionByShort]
  )

  const initialPrimaryPosition =
    resolvePositionId(
      draft.primaryPosition || searchParams.get("primaryPosition")
    ) || ""

  const initialSecondaryPosition =
    resolvePositionId(
      draft.secondaryPosition || searchParams.get("secondaryPosition")
    ) || ""

  const {
    register,
    setValue,
    formState: { errors },
    control,
  } = useForm<PositionMapFormData>({
    mode: "onBlur",
    defaultValues: {
      primaryPosition: initialPrimaryPosition,
      secondaryPosition: initialSecondaryPosition,
    },
  })

  useEffect(() => {
    register("primaryPosition", { required: "Primary position is required" })
    register("secondaryPosition")
  }, [register])

  const primaryPosition = useWatch({ control, name: "primaryPosition" })
  const secondaryPosition = useWatch({ control, name: "secondaryPosition" })

  const setPositionsInParams = (nextPrimary: string, nextSecondary: string) => {
    const nextParams = new URLSearchParams(searchParams.toString())

    if (nextPrimary) {
      nextParams.set("primaryPosition", nextPrimary)
    } else {
      nextParams.delete("primaryPosition")
    }

    if (nextSecondary) {
      nextParams.set("secondaryPosition", nextSecondary)
    } else {
      nextParams.delete("secondaryPosition")
    }

    router.replace(
      nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname
    )
  }

  const onPrimarySelect = (value: string) => {
    const nextSecondaryPosition =
      secondaryPosition === value ? "" : secondaryPosition

    setValue("primaryPosition", value, { shouldValidate: true })
    if (nextSecondaryPosition !== secondaryPosition) {
      setValue("secondaryPosition", "")
    }

    setPositionsInParams(value, nextSecondaryPosition)
    onDraftChange({
      primaryPosition: value,
      secondaryPosition: nextSecondaryPosition,
    })
  }

  const onSecondarySelect = (value: string) => {
    const nextPrimaryPosition = primaryPosition === value ? "" : primaryPosition

    setValue("secondaryPosition", value, { shouldValidate: true })
    if (nextPrimaryPosition !== primaryPosition) {
      setValue("primaryPosition", "")
    }

    setPositionsInParams(nextPrimaryPosition, value)
    onDraftChange({
      primaryPosition: nextPrimaryPosition,
      secondaryPosition: value,
    })
  }

  useEffect(() => {
    onDraftChange({
      primaryPosition: primaryPosition || "",
      secondaryPosition: secondaryPosition || "",
    })
  }, [primaryPosition, secondaryPosition, onDraftChange])

  const isPositionVisible = (positionId: string) => {
    return (
      initialPositions.includes(positionId) ||
      primaryPosition === positionId ||
      secondaryPosition === positionId
    )
  }

  useEffect(() => {
    const getPositions = async () => {
      try {
        const res = await getPlayerPosition()
        const rows = (res as { data?: { data?: ApiPlayerPosition[] } })?.data
          ?.data

        if (!Array.isArray(rows) || rows.length === 0) {
          return
        }

        const mapped = rows
          .map((item) => {
            const short = extractShortCode(item.name)
            const fallback = fallbackByShort[short]

            if (!short || !fallback) {
              return null
            }

            return {
              id: String(item.id),
              short,
              name: item.name.replace(/\s*\([^)]+\)\s*$/, ""),
              x: fallback.x,
              y: fallback.y,
            } satisfies Position
          })
          .filter((item): item is Position => item !== null)

        if (mapped.length > 0) {
          setPositions(mapped)
        }
      } catch {
        // Keep fallback positions when API fails.
      }
    }

    getPositions()
  }, [])

  useEffect(() => {
    const nextPrimary = resolvePositionId(primaryPosition || "")
    const nextSecondary = resolvePositionId(secondaryPosition || "")

    if (nextPrimary !== (primaryPosition || "")) {
      setValue("primaryPosition", nextPrimary, { shouldValidate: true })
    }

    if (nextSecondary !== (secondaryPosition || "")) {
      setValue("secondaryPosition", nextSecondary, { shouldValidate: true })
    }
  }, [
    positions,
    primaryPosition,
    secondaryPosition,
    resolvePositionId,
    setValue,
  ])

  const selectedPrimaryShort = primaryPosition
    ? positionById[primaryPosition]?.short
    : undefined
  const selectedSecondaryShort = secondaryPosition
    ? positionById[secondaryPosition]?.short
    : undefined

  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl bg-[#090B10] p-4 text-white">
      <ModalStepHeader
        title={roleHeaderCopy.title}
        subtitle={roleHeaderCopy.subtitle}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      <div className="mt-5 pb-6">
        <h3 className={sectionTitleClassName}>Position Map</h3>
        <p className={`${sectionSubtitleClassName} mt-1`}>
          {`Select the player's primary and secondary positions. Tap the positions
          on the field or use the menus below.`}
        </p>
        <div className="mt-4 h-px w-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.2)_0_10px,transparent_10px_20px)]" />

        <div className="mt-6 space-y-6">
          <div className="rounded-xl">
            <div className="relative w-full overflow-hidden rounded-md border border-white/20 bg-white/5">
              <SoccerField
                positions={positions.map((p) => ({
                  ...p,
                  isVisible: isPositionVisible(p.id),
                }))}
                onPositionClick={(positionId) => {
                  const isPrimary = primaryPosition === positionId
                  const isSecondary = secondaryPosition === positionId

                  if (isPrimary) {
                    onSecondarySelect("")
                  } else if (isSecondary) {
                    onPrimarySelect("")
                  } else if (!primaryPosition) {
                    onPrimarySelect(positionId)
                  } else {
                    onSecondarySelect(positionId)
                  }
                }}
                primaryPosition={selectedPrimaryShort}
                secondaryPosition={selectedSecondaryShort}
              />
            </div>
          </div>

          <PositionDropdowns
            positions={positions}
            primaryPosition={primaryPosition}
            secondaryPosition={secondaryPosition}
            onPrimarySelect={onPrimarySelect}
            onSecondarySelect={onSecondarySelect}
            errors={{
              primaryPosition: errors.primaryPosition?.message,
              secondaryPosition: errors.secondaryPosition?.message,
            }}
          />
        </div>
      </div>
    </div>
  )
}
