"use client"

import { useEffect, useMemo, useState } from "react"
import type { WizardState } from "../types"

import ModalStepHeader from "@/components/common/modal-header"
import { getPlayerPosition } from "@/app/(dashboards)/action"
import { TPlayerPosition } from "@/types/player.type"
import { sortPositions } from "@/lib/sort-position"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PositionMap from "@/components/common/position-map"

const sectionTitleClassName = "text-[20px] font-bold leading-[150%] text-white"
const sectionSubtitleClassName =
  "text-[14px] font-normal leading-[150%] text-white/70"

export default function SelectPosition({
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
  const [positions, setPositions] = useState<TPlayerPosition[]>()
  const [primaryPosition, setPrimaryPosition] = useState<string>("")
  const [secondaryPosition, setSecondaryPosition] = useState<string>("")
  const [hydratedFromDraft, setHydratedFromDraft] = useState(false)

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
        // Keep fallback positions when API fails.
        console.error(error)
      }
    }
    getPositions()
  }, [])

  const resolvePositionValue = (value: string) => {
    if (!value || !positions?.length) {
      return ""
    }

    const trimmedValue = value.trim()

    const matchedById = positions.find(
      (position) => String(position.id) === trimmedValue
    )
    if (matchedById) {
      return String(matchedById.id)
    }

    const matchedByName = positions.find(
      (position) =>
        position.name.trim().toLowerCase() === trimmedValue.toLowerCase()
    )
    if (matchedByName) {
      return String(matchedByName.id)
    }

    const matchedByShortCode = positions.find((position) => {
      const codeMatch = position.name.match(/\(([^)]+)\)\s*$/)
      if (!codeMatch) return false

      const code = codeMatch[1].trim().toLowerCase()
      const draftCodeMatch = trimmedValue.match(/\(([^)]+)\)\s*$/)
      const draftCode = draftCodeMatch?.[1]?.trim().toLowerCase()

      return draftCode === code
    })

    return matchedByShortCode ? String(matchedByShortCode.id) : ""
  }

  useEffect(() => {
    if (!positions?.length) {
      return
    }

    const nextPrimaryPosition = resolvePositionValue(draft.primaryPosition)
    const nextSecondaryPosition = resolvePositionValue(draft.secondaryPosition)

    setPrimaryPosition(nextPrimaryPosition)
    setSecondaryPosition(nextSecondaryPosition)
    setHydratedFromDraft(true)
  }, [draft.primaryPosition, draft.secondaryPosition, positions])

  useEffect(() => {
    if (!hydratedFromDraft) {
      return
    }

    onDraftChange({ primaryPosition, secondaryPosition })
  }, [hydratedFromDraft, onDraftChange, primaryPosition, secondaryPosition])

  // make a array using selected value
  const selectedPositionArray = useMemo<TPlayerPosition[]>(() => {
    if (!positions) return []

    return [primaryPosition, secondaryPosition]
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((id) => positions.find((p) => String(p.id) === id))
      .filter((p): p is TPlayerPosition => Boolean(p))
  }, [primaryPosition, secondaryPosition, positions])

  const finalPosition = selectedPositionArray.map((position) => {
    if (position.id === Number(primaryPosition)) {
      return { ...position, type: "Primary" }
    }

    if (position.id === Number(secondaryPosition)) {
      return { ...position, type: "Secondary" }
    }
  })



  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl bg-[#090B10] p-4 text-white">
      <ModalStepHeader
        title={"Position Map"}
        subtitle={
          "Select the player's primary and secondary positions. Select the positions on the field bellow  "
        }
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
            <div className="relative w-full  ">
              <PositionMap data={finalPosition as TPlayerPosition[]} />
            </div>
          </div>

          <div className="flex gap-4">
            <Select
              value={primaryPosition}
              onValueChange={(value) => setPrimaryPosition(value)}
            >
              <SelectTrigger className="w-full py-5.5">
                <SelectValue placeholder="Select primary position" />
              </SelectTrigger>
              <SelectContent position="popper" className=" ">
                <SelectGroup>
                  {Number(positions?.length) > 0 &&
                    positions?.map((position, idx) => (
                      <SelectItem
                        key={idx}
                        value={String(position.id)}
                        className="hover:bg-brand!"
                      >
                        {position.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={secondaryPosition}
              onValueChange={(value) => setSecondaryPosition(value)}
            >
              <SelectTrigger className="w-full py-5.5">
                <SelectValue placeholder="Select secondary position" />
              </SelectTrigger>
              <SelectContent position="popper" className=" ">
                <SelectGroup>
                  {Number(positions?.length) > 0 &&
                    positions?.map((position, idx) => (
                      <SelectItem
                        key={idx}
                        value={String(position.id)}
                        className="hover:bg-brand!"
                      >
                        {position.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
