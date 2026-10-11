"use client"

import UiInput from "@/components/common/ui-input"
import { ChevronDownIcon, Calendar as CalendarIcon, UserRound, Trophy, MapPin } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import SelectField from "@/components/common/select-field"
import { useEffect, useState } from "react"
import { SportOption } from "@/types"
import { getSportOptions } from "@/app/(dashboards)/action"
import CountryCitySelector from "@/components/common/country-city-selector"
import { TPlayerProfilePayload } from "../type"
import moment from "moment"

export default function CoreIdentity({
  payload,
  setPayload,
}: {
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}) {
  const [sportsOptions, setSportsOptions] = useState<SportOption[]>([])

  useEffect(() => {
    const init = async () => {
      const sports = await getSportOptions()
      if (sports && "success" in sports && sports.success && sports.data) {
        setSportsOptions(sports.data.data)
      }
    }
    init()
  }, [])

  const updateField = (key: keyof TPlayerProfilePayload, value: any) => {
    setPayload((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="space-y-5">
      {/* 1. Personal Identity */}
      <div className="rounded-2xl border border-white/10 bg-[#181E2B] p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <UserRound className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Personal Identity</h3>
            <p className="text-[11px] text-white/50">Core athlete name and contact information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <UiInput
            label="First Name"
            placeholder="e.g. Leo"
            className={controlClassName}
            value={payload.firstName || ""}
            onChange={(e) => updateField("firstName", e.target.value)}
          />

          <UiInput
            label="Last Name"
            placeholder="e.g. Messi"
            className={controlClassName}
            value={payload.lastName || ""}
            onChange={(e) => updateField("lastName", e.target.value)}
          />

          <UiInput
            label="Email Address"
            type="email"
            placeholder="player@academy.com"
            className={controlClassName}
            value={payload.email || ""}
            onChange={(e) => updateField("email", e.target.value)}
          />

          {/* Date of Birth */}
          <Field className="space-y-1">
            <FieldLabel htmlFor="date-picker-optional" className="text-xs font-medium text-white/90">
              Date of Birth <span className="text-brand">*</span>
            </FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker-optional"
                  className="h-11 w-full justify-between rounded-xl border border-white/10 bg-[#222A3B] px-3 font-normal text-white hover:border-brand/40 hover:bg-[#2A344A] hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2 text-xs">
                    <CalendarIcon className="size-3.5 text-brand/80" />
                    {payload.dateOfBirth
                      ? moment(payload.dateOfBirth).format("MMM Do, YYYY")
                      : <span className="text-white/40">Select Date</span>}
                  </span>
                  <ChevronDownIcon className="size-3.5 text-white/50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0 border-white/10 bg-[#1E2536] text-white shadow-xl" align="start">
                <Calendar
                  mode="single"
                  selected={payload.dateOfBirth ? new Date(payload.dateOfBirth) : undefined}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    if (date) {
                      updateField("dateOfBirth", moment(date).format("YYYY/MM/DD"))
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <SelectField
            label="Gender"
            placeholder="Select Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            triggerClassName={triggerClassName}
            value={payload.gender || ""}
            onValueChange={(value) => updateField("gender", value)}
          />

          <UiInput
            label="Nationality"
            placeholder="e.g. Canadian"
            className={controlClassName}
            value={payload.nationality || ""}
            onChange={(e) => updateField("nationality", e.target.value)}
          />
        </div>
      </div>

      {/* 2. Sporting Credentials */}
      <div className="rounded-2xl border border-white/10 bg-[#181E2B] p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Trophy className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Athletic Profile</h3>
            <p className="text-[11px] text-white/50">Sport specialization, team affiliation and match kit</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Sport selection */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-white/90">
              Sport Selection <span className="text-brand">*</span>
            </label>
            <Select
              value={String(payload.sport || "")}
              onValueChange={(value) => updateField("sport", value)}
            >
              <SelectTrigger className="h-11 w-full rounded-xl border border-white/10 bg-[#222A3B] px-3.5 text-xs text-white data-placeholder:text-white/40 hover:border-brand/40 transition-colors">
                <SelectValue placeholder="Select Sport" />
              </SelectTrigger>
              <SelectContent position="popper" className="border-white/10 bg-[#1E2536] text-white shadow-xl">
                <SelectGroup>
                  {sportsOptions.map((sport, i) => (
                    <SelectItem
                      key={sport.id || i}
                      value={String(sport.id)}
                      className="text-xs hover:bg-brand hover:text-black focus:bg-brand focus:text-black"
                    >
                      {sport.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <UiInput
            label="Jersey Number"
            placeholder="e.g. 10"
            className={controlClassName}
            value={payload.jerseyNumber || ""}
            onChange={(e) => updateField("jerseyNumber", e.target.value)}
            type="number"
          />

          <SelectField
            label="Dominant Foot"
            placeholder="Select Dominant Foot"
            options={[
              { value: "right", label: "Right Foot" },
              { value: "left", label: "Left Foot" },
              { value: "both", label: "Both (Ambidextrous)" },
            ]}
            triggerClassName={triggerClassName}
            value={payload.dominantFoot || ""}
            onValueChange={(value) => updateField("dominantFoot", value)}
          />

          <UiInput
            label="Club / Team"
            placeholder="e.g. Toronto United FC"
            className={controlClassName}
            value={payload.clubTeam || ""}
            onChange={(e) => updateField("clubTeam", e.target.value)}
          />
        </div>
      </div>

      {/* 3. Geographic Location */}
      <div className="rounded-2xl border border-white/10 bg-[#181E2B] p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <MapPin className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Geographic Location</h3>
            <p className="text-[11px] text-white/50">Country, province/state, and city for scouting filters</p>
          </div>
        </div>

        <div className="pt-1">
          <CountryCitySelector
            initialCountry={payload.country}
            initialCity={payload.city}
            initialProvince={payload.province}
            onSelect={(data) => {
              setPayload((prev) => ({
                ...prev,
                country: data.country_name,
                city: data.city_name,
                province: data.province_name,
              }))
            }}
          />
        </div>
      </div>
    </div>
  )
}

const controlClassName =
  "h-11 rounded-xl border border-white/10 bg-[#222A3B] px-3.5 text-xs text-white placeholder:text-white/40 hover:border-white/20 focus-visible:border-brand focus-visible:ring-1 focus-visible:ring-brand/30 transition-colors"

const triggerClassName =
  "h-11 w-full rounded-xl border-white/10 bg-[#222A3B] px-3.5 text-xs text-white data-placeholder:text-white/40 hover:border-white/20 focus:border-brand transition-colors"
