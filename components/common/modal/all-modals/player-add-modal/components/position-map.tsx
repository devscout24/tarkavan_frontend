"use client"

import { useEffect } from "react"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import type { WizardState } from "../types"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ModalStepHeader from "@/components/common/modal-header"

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

interface PositionMapFormData {
  primaryPosition: string
  secondaryPosition: string
}

const positions: Position[] = [
  { id: "GK", short: "GK", name: "Goalkeeper", x: 92, y: 50 },
  { id: "RB", short: "RB", name: "Right Back", x: 80, y: 75 },
  { id: "RCB", short: "RCB", name: "Right Center Back", x: 82, y: 60 },
  { id: "LCB", short: "LCB", name: "Left Center Back", x: 82, y: 40 },
  { id: "LB", short: "LB", name: "Left Back", x: 80, y: 25 },
  { id: "CDM", short: "CDM", name: "Defensive Midfielder", x: 65, y: 50 },
  { id: "CM", short: "CM", name: "Central Midfielder", x: 50, y: 50 },
  { id: "CAM", short: "CAM", name: "Attacking Midfielder", x: 35, y: 50 },
  { id: "RW", short: "RW", name: "Right Wing", x: 30, y: 75 },
  { id: "ST", short: "ST", name: "Striker", x: 15, y: 50 },
  { id: "LW", short: "LW", name: "Left Wing", x: 30, y: 25 },
]

// Initial positions visible on field load
const initialPositions = ["LW", "ST", "GK", "CB", "RW"]

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
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const roleHeaderCopy = getAddAthleteRoleHeaderCopy(
    searchParams.get(MODAL_ROLE_QUERY_KEY)
  )
  const isValidPosition = (value: string | null) =>
    Boolean(value && positions.some((position) => position.id === value))

  const initialPrimaryPosition = isValidPosition(
    draft.primaryPosition || searchParams.get("primaryPosition")
  )
    ? ((draft.primaryPosition || searchParams.get("primaryPosition")) as string)
    : "LW"

  const initialSecondaryPosition = isValidPosition(
    draft.secondaryPosition || searchParams.get("secondaryPosition")
  )
    ? ((draft.secondaryPosition ||
        searchParams.get("secondaryPosition")) as string)
    : "RCB"

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
    register("secondaryPosition", {
      required: "Secondary position is required",
    })
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

  return (
    <div className="w-full rounded-2xl bg-[#090B10] p-4 text-white">
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

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-xl">
            <div className="relative max-h-79.5 w-full max-w-111.25 overflow-hidden rounded-md border border-white/20 lg:max-h-none lg:max-w-full xl:max-h-79.5 xl:max-w-111.25">
              <Image
                src={"/images/soccer_Field.png"}
                width={1000}
                height={1000}
                alt="Football field"
                className="h-full w-full object-contain"
                sizes="(max-width: 1280px) 100vw, 446px"
                priority
              />

              {positions.map((position) => {
                const isPrimary = primaryPosition === position.id
                const isSecondary = secondaryPosition === position.id
                const isVisible = isPositionVisible(position.id)

                return (
                  <div
                    key={position.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      opacity: isVisible ? 1 : 0,
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-[7px] leading-none font-semibold transition-all sm:h-7 sm:w-7 sm:text-[8px] md:h-8 md:w-8 md:text-[10px] lg:h-9 lg:w-9 lg:text-[11px] ${
                        isPrimary
                          ? "border-white bg-[#DB0000] text-white"
                          : isSecondary
                            ? "border-[#DB0000] bg-[#DB0000]/30 text-white"
                            : "border-white/60 bg-white/12 text-white"
                      }`}
                    >
                      {position.short}
                    </span>
                    <span className="mt-0.5 block text-center text-[6px] leading-none text-white sm:mt-1 sm:text-[7px] md:text-[8px] lg:text-[9px]">
                      {position.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-4 lg:space-y-3 xl:space-y-4">
            <div className="rounded-xl border border-secondary bg-primary p-5 transition-colors hover:bg-secondary/80 lg:p-4 xl:p-5">
              <p className="text-[14px] leading-[150%] font-semibold text-white lg:text-[13px] xl:text-[14px]">
                Primary Position
              </p>
              <Select value={primaryPosition} onValueChange={onPrimarySelect}>
                <SelectTrigger
                  className={`mt-2.5 h-12 w-full rounded-xl border border-secondary px-4 text-[14px] leading-[150%] lg:mt-2 lg:h-10 lg:px-3 lg:text-[13px] xl:mt-2.5 xl:h-12 xl:px-4 xl:text-[14px] ${
                    primaryPosition
                      ? "bg-white text-[#111308]"
                      : "bg-secondary text-white"
                  }`}
                >
                  <SelectValue placeholder="Select primary position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem
                      key={position.id}
                      value={position.id}
                      className="text-primary hover:bg-brand hover:text-primary focus:bg-brand focus:text-primary"
                    >
                      {position.name} ({position.short})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.primaryPosition && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.primaryPosition.message}
                </p>
              )}
              <p className="mt-2.5 text-[14px] leading-[150%] font-normal text-white/70 lg:mt-2 lg:text-[13px] xl:mt-2.5 xl:text-[14px]">
                Most active position on the field.
              </p>
            </div>

            <div className="rounded-xl border border-secondary bg-primary p-5 transition-colors hover:bg-secondary/80 lg:p-4 xl:p-5">
              <p className="text-[14px] leading-[150%] font-bold text-white lg:text-[13px] xl:text-[14px]">
                Secondary Position
              </p>
              <Select
                value={secondaryPosition}
                onValueChange={onSecondarySelect}
              >
                <SelectTrigger
                  className={`mt-2.5 h-12 w-full rounded-xl border border-secondary px-4 text-[14px] leading-[150%] lg:mt-2 lg:h-10 lg:px-3 lg:text-[13px] xl:mt-2.5 xl:h-12 xl:px-4 xl:text-[14px] ${
                    secondaryPosition
                      ? "bg-white text-[#111308]"
                      : "bg-secondary text-white"
                  }`}
                >
                  <SelectValue placeholder="Select secondary position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem
                      key={position.id}
                      value={position.id}
                      className="text-primary hover:bg-brand hover:text-primary focus:bg-brand focus:text-primary"
                    >
                      {position.name} ({position.short})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.secondaryPosition && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.secondaryPosition.message}
                </p>
              )}
              <p className="mt-2.5 text-[14px] leading-[150%] font-normal text-white/70 lg:mt-2 lg:text-[13px] xl:mt-2.5 xl:text-[14px]">
                Backup or alternative role.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
