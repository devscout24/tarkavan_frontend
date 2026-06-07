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
import { sortPositions } from "@/lib/sort-position"
import { TPlayerSportOption, TTeamData } from "@/types"
import { Input } from "@/components/ui/input"
import { getHighestNumber, getLowestNumber } from "@/lib/get-highest-number"

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
  descriptionPlaceholder?: string
  defaultValues?: Partial<RecruitmentFormPayload>
  onCancel?: () => void
  onSubmit?: (payload: RecruitmentFormPayload) => void
}

export default function RecruitmentForm({
  title = "",
  cancelLabel = "Cancel",
  submitLabel = "Save",
  positionPlaceholder = "",
  teamPlaceholder = "",
  experiencePlaceholder = "e.g., 3+ years",
  descriptionPlaceholder = "Write role requirements and expectations...",
  defaultValues,
  onCancel,
}: RecruitmentFormProps) {
  const { close } = useModal()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit-id")
  const [loading, setLoading] = useState(false)
  const [recruitType, setRecruitType] = useState<RecruitType>(
    defaultValues?.recruitType ?? "coach"
  )
  const [position, setPosition] = useState(defaultValues?.position ?? "")
  const [team, setTeam] = useState(defaultValues?.team ?? "")
  const [positions, setPositions] = useState<TPlayerSportOption[]>([])
  const [teams, setTeams] = useState<TTeamData[]>([])
  const [coachPositions, setCoachPositions] = useState<TPlayerSportOption[]>([])
  const [coachPosition, setCoachPosition] = useState<string>("")
  const [experience, setExperience] = useState(defaultValues?.experience ?? "")
  const [tryoutDates, setTryoutDates] = useState(defaultValues?.tryoutDates ?? "")
  const [startDate, setStartDate] = useState("")
  const [ageGroup, setAgeGroup] = useState("")
  const [description, setDescription] = useState(defaultValues?.description ?? "")

  // get player positions
  useEffect(() => {
    const getPositions = async () => {
      try {
        const res = await getPlayerPosition()
        if (res && "success" in res && res.success && res.data && "data" in res.data && res.data.data) {
          setPositions(sortPositions(res.data.data))
        }
      } catch (error) {
        console.error("Error fetching positions:", error)
      }
    }
    getPositions()
  }, [])

  // get teams
  useEffect(() => {
    const getTeam = async () => {
      try {
        const res = await getTeams()
        if (res && "success" in res && res.success && res.data && "data" in res.data && res.data.data) {
          setTeams(res.data.data)
        }
      } catch (error) {
        console.error("Error fetching teams:", error)
      }
    }
    getTeam()
  }, [])

  // get coach positions
  useEffect(() => {
    const getCoachPosition = async () => {
      try {
        const res = await getCoachPositions()
        if (res && "success" in res && res.success && res.data && "data" in res.data && res.data.data) {
          setCoachPositions(res.data.data)
        }
      } catch (error) {
        console.error("Error fetching coach positions:", error)
      }
    }
    getCoachPosition()
  }, [])

  // load edit data
  useEffect(() => {
    if (!editId) return

    const fetchRecruitmentDetails = async () => {
      try {
        const res = await getRecruitmentDetails(editId)
        if (res && "success" in res && res.success && res.data && "data" in res.data && res.data.data) {
          const recruitment = res.data.data.recruitment

          setRecruitType(recruitment.recruitment_type)

          if (recruitment.recruitment_type === "coach") {
            setCoachPosition(recruitment.coach_position?.id?.toString() || "")
          } else {
            setPosition(recruitment.player_position?.id?.toString() || "")
          }

          setTeam(recruitment.club_team_id?.toString() || "")
          setExperience(recruitment.experience || "")
          setStartDate(recruitment.start_date || "")
          setTryoutDates(recruitment.end_date?.split(" ")[0] || "")
          setDescription(recruitment.description || "")
          setAgeGroup(recruitment.upto_age?.toString() || "")
        }
      } catch (error) {
        console.error("Error fetching recruitment details:", error)
      }
    }

    fetchRecruitmentDetails()
  }, [editId])

  const validateForm = () => {
    if (!recruitType) {
      toast.error("Please select recruitment type")
      return false
    }
    if (recruitType === "coach" && !coachPosition) {
      toast.error("Please select coach position")
      return false
    }
    if (recruitType === "player" && !position) {
      toast.error("Please select player position")
      return false
    }
    if (!team) {
      toast.error("Please select team")
      return false
    }
    if (!startDate || !startDate.trim()) {
      toast.error("Please select start date")
      return false
    }
    if (!tryoutDates || !tryoutDates.trim()) {
      toast.error("Please select end date")
      return false
    }
    if (recruitType === "player" && (!ageGroup || !ageGroup.trim())) {
      toast.error("Please enter age group")
      return false
    }
    return true
  }

  const buildFormData = () => {
    const formData = new FormData()
    formData.append("recruitment_type", recruitType)
    formData.append("coach_position_id", coachPosition)
    formData.append("team_id", team)
    formData.append("experience", experience.trim())
    formData.append("start_date", startDate.trim())
    formData.append("end_date", tryoutDates.trim())
    formData.append("description", description.trim())
    if(recruitType === "player"){ 
      formData.append("player_position", position)
      formData.append("upto_age", String(getHighestNumber(ageGroup)))
      formData.append("from_age", String(getLowestNumber(ageGroup)))
    }
    return formData
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    setLoading(true)
    try {
      const res = await addRecruitment(buildFormData())
      console.log(res)
      if (typeof res === "object" && res !== null && "success" in res && res.success) {
        window.dispatchEvent(new Event("recruitmentEvent"))
        toast.success("Recruitment created successfully")
        close("add-new", ["recruitment"])
        return
      }
      const message =
        typeof res === "object" && res !== null && "message" in res && typeof res.message === "string"
          ? res.message
          : "Failed to create recruitment. Please check your inputs."
      toast.error(message)
    } catch (error) {
      console.error("Error submitting recruitment:", error)
      toast.error("Failed to create recruitment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    if (!validateForm()) return
    setLoading(true)
    try {
      const res = await updateRecruitment({
        data: buildFormData(),
        recruitment_id: editId as string,
      })
      if (typeof res === "object" && res !== null && "success" in res && res.success) {
        window.dispatchEvent(new Event("recruitmentEvent"))
        toast.success("Recruitment updated successfully")
        close("add-new", ["recruitment"])
        return
      }
      const message =
        typeof res === "object" && res !== null && "message" in res && typeof res.message === "string"
          ? res.message
          : "Failed to update recruitment. Please check your inputs."
      toast.error(message)
    } catch (error) {
      console.error("Error updating recruitment:", error)
      toast.error("Failed to update recruitment. Please try again.")
    } finally {
      setLoading(false)
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
        {/* Recruit Type */}
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
              <span className="text-sm font-medium text-white">Coach Recruit</span>
            </label>
            <label
              htmlFor="recruit-type-player"
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/15 px-4 py-3 transition hover:border-brand/60"
            >
              <RadioGroupItem value="player" id="recruit-type-player" />
              <span className="text-sm font-medium text-white">Player Recruit</span>
            </label>
          </RadioGroup>
        </div>

        {/* Player Position */}
        {recruitType === "player" && (
          <div className="space-y-2">
            <label className="text-base text-white">Position</label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger className="mt-1 h-12 w-full border-white/15 bg-transparent px-3 py-6 text-base text-white data-placeholder:text-white/40">
                <SelectValue placeholder={positionPlaceholder} />
              </SelectTrigger>
              <SelectContent position="popper" className="bg-[#1a1c23] text-white">
                {positions.map((option) => (
                  <SelectItem key={option.id} value={String(option.id)} className="hover:bg-brand!">
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Coach Position */}
        {recruitType === "coach" && (
          <div className="space-y-2">
            <label className="text-base text-white">Position</label>
            <Select value={coachPosition} onValueChange={setCoachPosition}>
              <SelectTrigger className="mt-1 h-12 w-full border-white/15 bg-transparent px-3 py-6 text-base text-white data-placeholder:text-white/40">
                <SelectValue placeholder={positionPlaceholder} />
              </SelectTrigger>
              <SelectContent position="popper" className="bg-[#1a1c23] text-white">
                {coachPositions.map((option) => (
                  <SelectItem key={option.id} value={String(option.id)} className="hover:bg-brand!">
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Age Group - player only */}
        {recruitType === "player" && (
          <div className="flex flex-col">
            <span className="text-sm">Age Group</span>
            <Input
              placeholder="e.g U14 or U16-U20"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="mt-1 border-neutral-700 bg-neutral-800 py-5 placeholder:text-neutral-300 placeholder:opacity-100"
            />
          </div>
        )}

        {/* Team */}
        <div className="space-y-2">
          <label className="text-base text-white">Team Select</label>
          <Select value={team} onValueChange={setTeam}>
            <SelectTrigger className="mt-1 h-12 w-full border-white/15 bg-transparent px-3 py-6 text-base text-white data-placeholder:text-white/40">
              <SelectValue placeholder={teamPlaceholder} />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-[#1a1c23] text-white">
              {teams.map((option) => (
                <SelectItem key={option.id} value={String(option.id)} className="hover:bg-brand!">
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Experience */}
        <UiInput
          label="Experience"
          placeholder={experiencePlaceholder}
          value={experience}
          className="h-12 border-white/15 bg-transparent text-base text-white placeholder:text-white"
          onChange={(e) => setExperience(e.target.value)}
        />

        {/* Dates */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="pb-2 text-base text-white">Start Date</label>
            <DatePickerDemo onDateChange={setStartDate} />
          </div>
          <div className="space-y-2">
            <label className="pb-2 text-base text-white">End Date</label>
            <DatePickerDemo onDateChange={setTryoutDates} />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-base text-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={descriptionPlaceholder}
            className="min-h-28 w-full resize-none rounded-lg border border-white/15 bg-transparent px-3 py-2 text-base text-white transition outline-none placeholder:text-white/40 focus:border-brand/60 focus-visible:ring-2 focus-visible:ring-brand/30"
          />
        </div>

        {/* Actions */}
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
              isLoading={loading}
              disabled={loading}
              className="h-11 min-w-80 rounded-xl bg-brand! px-8 text-base font-semibold text-primary hover:bg-brand"
            />
          ) : (
            <CommonBtn
              variant="outline"
              size="default"
              onClick={handleSubmit}
              disabled={loading}
              isLoading={loading}
              className="h-11  px-10!  rounded-xl bg-brand px-8 text-base font-semibold text-primary hover:bg-brand"
              text={submitLabel}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}