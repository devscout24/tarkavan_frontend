"use client"

import * as React from "react"
import { CalendarDays } from "lucide-react"
import { format } from "date-fns"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { addUpdateMatch } from "@/app/(dashboards)/club/matches/action"
import { getTeams } from "@/app/(dashboards)/club/teams/action"
import { toast } from "sonner"
import useModal from "../../useModal"
import CommonBtn from "@/components/common/common-btn"

type TeamOption = {
  label: string
  value: string
}

type Team = {
  id: number
  club_id: number
  name: string
  age_group: string
  image: string
  competition_level_id: number
  created_at: string
  updated_at: string
  total_players: number
  total_coaches: number
}

type GetTeamsResponse = {
  success: true
  data: {
    status: boolean
    message: string
    data: Team[]
    meta: {
      current_page: number
      last_page: number
      per_page: number
      total: number
    }
  }
}

type FieldOpportunity =
  | "we-have-a-field"
  | "need-opponent-field"
  | "open-to-travel"

export type AddFriendlyMatchPayload = {
  team: string
  date?: Date
  location: string
  fieldOpportunity: FieldOpportunity
}

export type AddFriendlyMatchProps = {
  title?: string
  teamLabel?: string
  dateLabel?: string
  locationLabel?: string
  fieldLabel?: string
  teamPlaceholder?: string
  datePlaceholder?: string
  locationPlaceholder?: string
  cancelLabel?: string
  submitLabel?: string
  teams?: TeamOption[]
  defaultTeam?: string
  defaultDate?: Date
  defaultLocation?: string
  defaultFieldOpportunity?: FieldOpportunity
  onCancel?: () => void
  onSubmit?: (payload: AddFriendlyMatchPayload) => void
}

const defaultTeams: TeamOption[] = [
  { label: "U16 Elite Academy", value: "u16-elite-academy" },
  { label: "U14 Development Squad", value: "u14-development-squad" },
  { label: "U18 Select Team", value: "u18-select-team" },
]

const fieldOpportunityOptions: Array<{
  label: string
  value: FieldOpportunity
}> = [
  { label: "We have a field", value: "we-have-a-field" },
  { label: "Need opponent field", value: "need-opponent-field" },
  { label: "Open to travel", value: "open-to-travel" },
]

export default function AddFriendlyMatch({
  title = "Add Friendly Match",
  teamLabel = "Team Select",
  dateLabel = "Available Dates",
  locationLabel = "Location / City",
  fieldLabel = "Field Opportunity",
  teamPlaceholder = "Select Team",
  datePlaceholder = "mm/dd/yyyy",
  locationPlaceholder = "",
  cancelLabel = "Cancel",
  submitLabel = "Post Request",
  teams = defaultTeams,
  defaultTeam = "",
  defaultDate,
  defaultLocation = "",
  defaultFieldOpportunity = "we-have-a-field",
  onCancel,
  onSubmit,
}: AddFriendlyMatchProps) {
  const { close } = useModal()
  const [team, setTeam] = React.useState(defaultTeam)
  const [date, setDate] = React.useState<Date | undefined>(defaultDate)
  const [location, setLocation] = React.useState(defaultLocation)
  const [fieldOpportunity, setFieldOpportunity] =
    React.useState<FieldOpportunity>(defaultFieldOpportunity)
  const [dateOpen, setDateOpen] = React.useState(false)
  const [availableTeams, setAvailableTeams] = React.useState<TeamOption[]>(teams)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = React.useState(false)

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
      return
    }

    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.delete("add-new")

    router.replace(
      nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname
    )
  }
  
    React.useEffect(() => {
      const getData = async () => {
        try{
          const res = await getTeams()  
          
          if (res && typeof res === "object" && "success" in res && res.success && "data" in res) {
            const typedRes = res as GetTeamsResponse
            if (typedRes.data && typedRes.data.data) {
              const teamOptions: TeamOption[] = typedRes.data.data.map((team: Team) => ({
                label: team.name,
                value: team.id.toString(),
              }))
              setAvailableTeams(teamOptions)
            }
          }
        }catch(err){
          console.error("Error fetching teams data:", err)
        }
      }
      getData()
    }, [])

  const handleSubmit = async () => {
    setLoading(true)

    const formData = new FormData()
    formData.append("club_team_id", team)
    formData.append("available_date", date ? date.toISOString().split('T')[0] : "")
    formData.append("location", location.trim())
    formData.append("field_opportunity", fieldOpportunity)

    try{
      const res = await addUpdateMatch(formData)
      
      if (typeof res === "object" && res !== null && "success" in res && res.success) {
        toast.success("Match created successfully")
        setLoading(false)
        window.dispatchEvent(new CustomEvent('matchAdd'))
        close("add-new", ["friendly-match"])
        return
      }
      
      const fallbackMessage = "Failed to create match. Please check your inputs."
      const message = 
        typeof res === "object" && 
        res !== null && 
        "message" in res && 
        typeof res.message === "string"
          ? res.message
          : fallbackMessage
      toast.error(message)
    } catch (error) {
      setLoading(false)
      console.error("Error submitting friendly match:", error)
      toast.error("Failed to create match. Please try again.")
    }


  }

  return (
    <Card className="w-full rounded-[24px] border border-white/10 bg-[#14161b] py-0 text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <CardHeader className="space-y-4 px-6 pt-6 pb-0">
        <CardTitle className="text-[24px] leading-tight font-semibold text-white">
          {title}
        </CardTitle>
        <Separator className="bg-white/10" />
      </CardHeader>

      <CardContent className="space-y-5 px-6 pt-6 pb-6">
        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-medium text-white">
            {teamLabel}
          </label>
          <Select value={team} onValueChange={setTeam}>
            <SelectTrigger
              className={cn(
                "h-12 w-full rounded-lg border-white/10 bg-transparent px-3 text-[15px] text-white shadow-none",
                "py-6 data-[placeholder=true]:text-white/35"
              )}
            >
              <SelectValue placeholder={teamPlaceholder} />
            </SelectTrigger>
            <SelectContent
              className="border-white/10 bg-secondary text-white"
              position="popper"
            >
              {availableTeams.map((option) => (
                <SelectItem key={option.value} value={option.value} className="hover:bg-brand!  "  >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-base font-medium text-white">
            {dateLabel}
          </label>
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                data-empty={!date}
                className={cn(
                  "h-12 w-full justify-between rounded-lg border-white/10 bg-transparent px-3 text-left text-[15px] font-normal text-white shadow-none hover:text-white",
                  "hover:bg-white/5 data-[empty=true]:text-white",
                  dateOpen && "text-primary data-[empty=true]:text-primary"
                )}
              >
                <span>
                  {date ? format(date, "MM/dd/yyyy") : datePlaceholder}
                </span>
                <CalendarDays
                  className={cn(
                    "size-4",
                    dateOpen ? "text-primary" : "text-white/80"
                  )}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto border-white/10 bg-[#1b1d22] p-2 text-white shadow-xl"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(nextDate) => {
                  setDate(nextDate)
                  setDateOpen(false)
                }}
                initialFocus
                className="rounded-md bg-transparent text-white"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-medium text-white">
            {locationLabel}
          </label>
          <Input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder={locationPlaceholder || "Enter location..."}
            className="h-12 rounded-lg border-white/10 bg-transparent px-3 text-[15px] text-white placeholder:text-white/35 focus-visible:border-brand/50 focus-visible:ring-brand/20"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-medium text-white">
            {fieldLabel}
          </label>
          <RadioGroup
            value={fieldOpportunity}
            onValueChange={(value) =>
              setFieldOpportunity(value as FieldOpportunity)
            }
            className="gap-3"
          >
            {fieldOpportunityOptions.map((option) => {
              const isSelected = fieldOpportunity === option.value

              return (
                <label
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 transition-colors",
                    isSelected
                      ? "border-brand/70 bg-brand/6"
                      : "border-white/10 bg-transparent hover:border-white/20"
                  )}
                >
                  <RadioGroupItem
                    value={option.value}
                    className="border-white/35 data-checked:border-brand data-checked:bg-transparent dark:data-checked:bg-transparent"
                  />
                  <span className="text-[15px] font-medium text-white/90">
                    {option.label}
                  </span>
                </label>
              )
            })}
          </RadioGroup>
        </div>

        <div className="flex items-center justify-end  gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            style={{ minWidth: 94 }}
            className="h-11 rounded-xl border-brand/80 bg-transparent px-5 text-[15px] font-medium text-brand hover:bg-brand/10 hover:text-brand"
          >
            {cancelLabel}
          </Button>
 
          <CommonBtn
            variant="default"
            size="default"
            onClick={handleSubmit}
            text={submitLabel}
            isLoading={loading}
            className="h-11 w-fit  rounded-xl bg-brand px-6 text-[15px] font-semibold text-primary hover:bg-brand/95"
           />



        </div>
      </CardContent>
    </Card>
  )
}
