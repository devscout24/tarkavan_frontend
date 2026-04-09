"use client"

import { useState } from "react"

import UiInput from "@/components/common/ui-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DatePickerDemo } from "@/components/common/date-picker"

type Option = {
  label: string
  value: string
}

type RecruitType = "coach" | "player"

type RecruitmentFormPayload = {
  recruitType: RecruitType
  position: string
  team: string
  experience: string
  tryoutDates: string
  description: string
}

type RecruitmentFormProps = {
  title?: string
  cancelLabel?: string
  submitLabel?: string
  positionPlaceholder?: string
  teamPlaceholder?: string
  experiencePlaceholder?: string
  tryoutPlaceholder?: string
  descriptionPlaceholder?: string
  positions?: Option[]
  teams?: Option[]
  defaultValues?: Partial<RecruitmentFormPayload>
  onCancel?: () => void
  onSubmit?: (payload: RecruitmentFormPayload) => void
}

export default function RecruitmentForm({
  title = "Post a Recruitment",
  cancelLabel = "Cancel",
  submitLabel = "Post Request",
  positionPlaceholder = "Select Position",
  teamPlaceholder = "Select Team",
  experiencePlaceholder = "e.g., 3+ years",
  tryoutPlaceholder = "e.g., March 15-18, 2026",
  descriptionPlaceholder = "Write role requirements and expectations...",
  positions = [
    { label: "Assistant Coach", value: "assistant-coach" },
    { label: "Head Coach", value: "head-coach" },
    { label: "Goalkeeper Coach", value: "goalkeeper-coach" },
  ],
  teams = [
    { label: "Elite U16", value: "elite-u16" },
    { label: "Elite U18", value: "elite-u18" },
    { label: "Junior Academy", value: "junior-academy" },
  ],
  defaultValues,
  onCancel,
  onSubmit,
}: RecruitmentFormProps) {
  const [recruitType, setRecruitType] = useState<RecruitType>(
    defaultValues?.recruitType ?? "coach"
  )
  const [position, setPosition] = useState(defaultValues?.position ?? "")
  const [team, setTeam] = useState(defaultValues?.team ?? "")
  const [experience, setExperience] = useState(defaultValues?.experience ?? "")
  const [tryoutDates] = useState(defaultValues?.tryoutDates ?? "")
  const [description, setDescription] = useState(
    defaultValues?.description ?? ""
  )

  const handleSubmit = () => {
    onSubmit?.({
      recruitType,
      position,
      team,
      experience: experience.trim(),
      tryoutDates: tryoutDates.trim(),
      description: description.trim(),
    })
  }

  return (
    <Card className="w-full rounded-none border-0 bg-[#121319] py-0 text-white ring-0">
      <CardHeader className="space-y-5 px-6 pt-7 pb-0">
        <CardTitle className="text-base font-semibold text-white">
          {title}
        </CardTitle>
        <div className="h-px w-full bg-white/15" />
      </CardHeader>

      <CardContent className="space-y-5 px-6 pt-6 pb-8">
        <div className="space-y-3">
          <label className="text-base text-white">Recruit Type</label>
          <RadioGroup
            value={recruitType}
            onValueChange={(value) => setRecruitType(value as RecruitType)}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <label
              htmlFor="recruit-type-coach"
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/15 px-4 py-3 transition hover:border-brand/60"
            >
              <RadioGroupItem value="coach" id="recruit-type-coach" />
              <span className="text-sm font-medium text-white">
                Coach Recruit
              </span>
            </label>

            <label
              htmlFor="recruit-type-player"
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/15 px-4 py-3 transition hover:border-brand/60"
            >
              <RadioGroupItem value="player" id="recruit-type-player" />
              <span className="text-sm font-medium text-white">
                Player Recruit
              </span>
            </label>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <label className="text-base text-white">Position</label>
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger className="mt-1 h-12 w-full border-white/15 bg-transparent px-3 py-6 text-base text-white data-placeholder:text-white/40">
              <SelectValue placeholder={positionPlaceholder} />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1c23] text-white">
              {positions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="hover:bg-brand!"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-base text-white">Team Select</label>
          <Select value={team} onValueChange={setTeam}>
            <SelectTrigger className="mt-1 h-12 w-full border-white/15 bg-transparent px-3 py-6 text-base text-white data-placeholder:text-white/40">
              <SelectValue placeholder={teamPlaceholder} />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1c23] text-white">
              {teams.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="hover:bg-brand!"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <UiInput
          label="Experience"
          placeholder={experiencePlaceholder}
          className="h-12 border-white/15 bg-transparent text-base text-white placeholder:text-white"
          onChange={(event) => setExperience(event.target.value)}
        />

        <div className="space-y-2">
          <label className="pb-2 text-base text-white">Tryout Dates</label>
          <DatePickerDemo />
          <p className="text-xs text-white/45">{tryoutPlaceholder}</p>
        </div>

        <div className="space-y-2">
          <label className="text-base text-white">Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder={descriptionPlaceholder}
            className="min-h-28 w-full resize-none rounded-lg border border-white/15 bg-transparent px-3 py-2 text-base text-white transition outline-none placeholder:text-white/40 focus:border-brand/60 focus-visible:ring-2 focus-visible:ring-brand/30"
          />
        </div>

        <div className="flex items-center justify-between gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-11 min-w-28 rounded-xl border-brand bg-transparent px-6 text-base text-brand hover:bg-brand/10 hover:text-brand"
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            className="h-11 min-w-80 rounded-xl bg-brand px-8 text-base font-semibold text-primary hover:bg-brand"
          >
            {submitLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
