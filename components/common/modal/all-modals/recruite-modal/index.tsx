"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

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
import {
  addRecruitment,
  updateRecruitment,
} from "@/app/(dashboards)/club/recruitment/action"
import { toast } from "sonner"
import useModal from "../../useModal"
import { getCoachPositions, getPlayerPosition } from "@/app/(dashboards)/action"
import { getTeams } from "@/app/(dashboards)/club/teams/action"
import { getRecruitmentDetails } from "@/app/(dashboards)/club/recruitment/action"
import CommonBtn from "@/components/common/common-btn"

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
  defaultValues,
  onCancel,
}: RecruitmentFormProps) {
  const { close } = useModal()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit-id")

  const [recruitType, setRecruitType] = useState<RecruitType>(
    defaultValues?.recruitType ?? "coach"
  )
  const [position, setPosition] = useState(defaultValues?.position ?? "")
  const [team, setTeam] = useState(defaultValues?.team ?? "")
  const [positions, setPositions] = useState<Option[]>([])
  const [teams, setTeams] = useState<Option[]>([])
  const [coachPositions, setCoachPositions] = useState<Option[]>([])
  const [coachPosition, setCoachPosition] = useState<string>("")
  const [experience, setExperience] = useState(defaultValues?.experience ?? "")
  const [tryoutDates, setTryoutDates] = useState(
    defaultValues?.tryoutDates ?? ""
  )
  const [ageGroup, setAgeGroup] = useState("13")
  const [description, setDescription] = useState(
    defaultValues?.description ?? ""
  )

  useEffect(() => {
    const getPositions = async () => {
      try {
        const res = await getPlayerPosition()
        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          const positionsData = res.data.data.map(
            (position: { id: number; name: string }) => ({
              label: position.name,
              value: String(position.id),
            })
          )
          setPositions(positionsData)
        }
      } catch (error) {
        console.error("Error fetching positions:", error)
      }
    }
    getPositions()
  }, [])

  useEffect(() => {
    const getTeam = async () => {
      try {
        const res = await getTeams()
        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          const teamsData = res.data.data.map(
            (team: { id: number; name: string }) => ({
              label: team.name,
              value: String(team.id),
            })
          )
          setTeams(teamsData)
        }
      } catch (error) {
        console.error("Error fetching teams:", error)
      }
    }
    getTeam()
  }, [])

  useEffect(() => {
    const getCoachPosition = async () => {
      try {
        const res = await getCoachPositions()
        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          const teamsData = res.data.data.map(
            (team: { id: number; name: string }) => ({
              label: team.name,
              value: String(team.id),
            })
          )
          setCoachPositions(teamsData)
        }
      } catch (error) {
        console.error("Error fetching teams:", error)
      }
    }
    getCoachPosition()
  }, [])

  // get edit-id from params
  useEffect(() => {
    const fetchRecruitmentDetails = async () => {
      if (!editId) return

      try {
        const res = await getRecruitmentDetails(editId)

        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          const recruitment = res.data.data

          // Populate form with recruitment data
          setRecruitType(recruitment.recruitment_type)
          setPosition(
            recruitment.player_position?.id?.toString() ||
              recruitment.coach_position?.id?.toString() ||
              ""
          )
          setTeam(recruitment.club_team_id?.toString() || "")
          setExperience(recruitment.experience || "")
          setTryoutDates(recruitment.end_date?.split(" ")[0] || "")
          setDescription(recruitment.description || "")
          setAgeGroup(recruitment.upto_age?.toString() || "13")
        }
      } catch (error) {
        console.error("Error fetching recruitment details:", error)
      }
    }

    fetchRecruitmentDetails()
  }, [editId])

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append("recruitment_type", recruitType)
      formData.append("player_position", position)
      formData.append("coach_position_id", coachPosition)
      formData.append("team_id", team)
      formData.append("experience", experience.trim())
      formData.append("end_date", tryoutDates.trim())
      formData.append("description", description.trim())
      formData.append("upto_age", ageGroup)

      const res = await addRecruitment(formData)

      if (
        typeof res === "object" &&
        res !== null &&
        "success" in res &&
        res.success
      ) {
        toast.success("Recruitment created successfully")
        window.dispatchEvent(new CustomEvent("recruitmentCreated"))
        close("add-new", ["recruitment"])
        return
      }

      const fallbackMessage =
        "Failed to create recruitment. Please check your inputs."
      const message =
        typeof res === "object" &&
        res !== null &&
        "message" in res &&
        typeof res.message === "string"
          ? res.message
          : fallbackMessage
      toast.error(message)
    } catch (error) {
      console.error("Error submitting recruitment:", error)
      toast.error("Failed to create recruitment. Please try again.")
    }
  }

  const handleUpdate = async () => {
    try {
      const formData = new FormData()
      formData.append("recruitment_type", recruitType)
      formData.append("player_position", position)
      formData.append("coach_position_id", coachPosition)
      formData.append("team_id", team)
      formData.append("experience", experience.trim())
      formData.append("end_date", tryoutDates.trim())
      formData.append("description", description.trim())
      formData.append("upto_age", ageGroup)

      const res = await updateRecruitment({
        data: formData,
        recruitment_id: editId as string,
      })

      if (
        typeof res === "object" &&
        res !== null &&
        "success" in res &&
        res.success
      ) {
        toast.success("Recruitment updated successfully")
        window.dispatchEvent(new CustomEvent("recruitmentUpdated"))
        close("edit-id", ["recruitment"])
        return
      }

      const fallbackMessage =
        "Failed to update recruitment. Please check your inputs."
      const message =
        typeof res === "object" &&
        res !== null &&
        "message" in res &&
        typeof res.message === "string"
          ? res.message
          : fallbackMessage
      toast.error(message)
    } catch (error) {
      console.error("Error updating recruitment:", error)
      toast.error("Failed to update recruitment. Please try again.")
    }
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

        {recruitType === "player" && (
          <div className="space-y-2">
            <label className="text-base text-white">Position</label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger className="mt-1 h-12 w-full border-white/15 bg-transparent px-3 py-6 text-base text-white data-placeholder:text-white/40">
                <SelectValue placeholder={positionPlaceholder} />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="bg-[#1a1c23] text-white"
              >
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
        )}

        {recruitType === "coach" && (
          <div className="space-y-2">
            <label className="text-base text-white">Position</label>
            <Select value={coachPosition} onValueChange={setCoachPosition}>
              <SelectTrigger className="mt-1 h-12 w-full border-white/15 bg-transparent px-3 py-6 text-base text-white data-placeholder:text-white/40">
                <SelectValue placeholder={positionPlaceholder} />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="bg-[#1a1c23] text-white"
              >
                {coachPositions.map((option) => (
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
        )}

        {recruitType === "player" && (
          <div className="flex flex-col">
            <span className="text-sm">Age Group</span>
            <Select value={ageGroup} onValueChange={setAgeGroup}>
              <SelectTrigger className={`mt-1 w-full py-5.5 text-white`}>
                <SelectValue placeholder="Select Age Group" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="8" className="hover:bg-brand!">
                  U03 - U08
                </SelectItem>
                <SelectItem value="12" className="hover:bg-brand!">
                  U09 - U12
                </SelectItem>
                <SelectItem value="17" className="hover:bg-brand!">
                  U13 - U17
                </SelectItem>
                <SelectItem value="21" className="hover:bg-brand!">
                  U18 - U21
                </SelectItem>
                <SelectItem value="30" className="hover:bg-brand!">
                  U21 - U30
                </SelectItem>
                <SelectItem value="200" className="hover:bg-brand!">
                  30+
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-base text-white">Team Select</label>
          <Select value={team} onValueChange={setTeam}>
            <SelectTrigger className="mt-1 h-12 w-full border-white/15 bg-transparent px-3 py-6 text-base text-white data-placeholder:text-white/40">
              <SelectValue placeholder={teamPlaceholder} />
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="bg-[#1a1c23] text-white"
            >
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
          <DatePickerDemo onDateChange={setTryoutDates} />
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

          {editId ? (
            <CommonBtn
              variant="outline"
              size="default"
              onClick={handleUpdate}
              text="Update"
              className="h-11 min-w-80 rounded-xl bg-brand! px-8 text-base font-semibold text-primary hover:bg-brand"
            />
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              className="h-11 min-w-80 rounded-xl bg-brand px-8 text-base font-semibold text-primary hover:bg-brand"
            >
              {submitLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
