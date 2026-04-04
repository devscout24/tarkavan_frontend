import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router"

import footballField from "../../../../public/images/soccer_Field.png"
import {
  getAddAthleteRoleHeaderCopy,
  ModalStepHeader,
  MODAL_ROLE_QUERY_KEY,
  StepActions,
} from "@/pages/parent-pages/modal_common"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

export default function PositionMap() {
  const [searchParams, setSearchParams] = useSearchParams()
  const roleHeaderCopy = getAddAthleteRoleHeaderCopy(
    searchParams.get(MODAL_ROLE_QUERY_KEY)
  )
  const isValidPosition = (value: string | null) =>
    Boolean(value && positions.some((position) => position.id === value))

  const initialPrimaryPosition = isValidPosition(
    searchParams.get("primaryPosition")
  )
    ? (searchParams.get("primaryPosition") as string)
    : "LW"

  const initialSecondaryPosition = isValidPosition(
    searchParams.get("secondaryPosition")
  )
    ? (searchParams.get("secondaryPosition") as string)
    : "RCB"

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
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

  const primaryPosition = watch("primaryPosition")
  const secondaryPosition = watch("secondaryPosition")

  const setPositionsInParams = (nextPrimary: string, nextSecondary: string) => {
    const nextParams = new URLSearchParams(searchParams)

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

    setSearchParams(nextParams)
  }

  const onPrimarySelect = (value: string) => {
    const nextSecondaryPosition =
      secondaryPosition === value ? "" : secondaryPosition

    setValue("primaryPosition", value, { shouldValidate: true })
    if (nextSecondaryPosition !== secondaryPosition) {
      setValue("secondaryPosition", "")
    }

    setPositionsInParams(value, nextSecondaryPosition)
  }

  const onSecondarySelect = (value: string) => {
    const nextPrimaryPosition = primaryPosition === value ? "" : primaryPosition

    setValue("secondaryPosition", value, { shouldValidate: true })
    if (nextPrimaryPosition !== primaryPosition) {
      setValue("primaryPosition", "")
    }

    setPositionsInParams(nextPrimaryPosition, value)
  }

  const setModalStep = (step: string) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set("addNewChildren", step)
    setSearchParams(nextParams)
  }

  const goBackToCoreIdentity = () => {
    setModalStep("coreIdentity")
  }

  const goToNextStep = handleSubmit(() => {
    setModalStep("seasonStats")
  })

  const isPositionVisible = (positionId: string) => {
    return (
      initialPositions.includes(positionId) ||
      primaryPosition === positionId ||
      secondaryPosition === positionId
    )
  }

  return (
    <div className="w-full rounded-2xl bg-[#090B10] p-4 text-white sm:p-6 md:p-8">
      <ModalStepHeader
        title={roleHeaderCopy.title}
        subtitle={roleHeaderCopy.subtitle}
        currentStep={2}
      />

      <div className="mt-5 pb-6">
        <h3 className={sectionTitleClassName}>Position Map</h3>
        <p className={`${sectionSubtitleClassName} mt-1`}>
          Select the player's primary and secondary positions. Tap the positions
          on the field or use the menus below.
        </p>
        <div className="mt-4 h-px w-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.2)_0_10px,transparent_10px_20px)]" />

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-xl">
            <div className="relative max-h-79.5 w-full max-w-111.25 overflow-hidden rounded-md border border-white/20 lg:max-h-none lg:max-w-full xl:max-h-79.5 xl:max-w-111.25">
              <img
                src={footballField}
                alt="Football field"
                className="h-full w-full object-contain"
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

      <StepActions
        onBack={goBackToCoreIdentity}
        onNext={() => goToNextStep()}
      />
    </div>
  )
}
