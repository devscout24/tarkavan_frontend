"use client"
import UiInput from "@/components/common/ui-input"
import { motion } from "framer-motion"
import { ChevronDownIcon, ImagePlus, Sparkles } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
      const [sports] = await Promise.all([getSportOptions()])
      if (sports && "success" in sports && sports.success && sports.data)
        setSportsOptions(sports.data.data)
    }
    init()
  }, [])

  return (
    <div>
      <h3 className="my-4 text-[20px] leading-[120%] font-semibold text-white">
        Core Identity
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <UiInput
          label="First Name"
          placeholder="Enter First Name"
          className={controlClassName}
          value={payload.firstName || ""}
          onChange={(e) => {
            setPayload((prev) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }}
        />

        <UiInput
          label="Last Name"
          placeholder="Enter Last Name"
          className={controlClassName}
          value={payload.lastName || ""}
          onChange={(e) => {
            setPayload((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }}
        />

        {/* set mail */}
        <UiInput
          label="Email Address"
          type="email"
          placeholder="example@email.com"
          className={controlClassName}
          value={payload.email || ""}
          onChange={(e) => {
            setPayload((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }}
        />

        {/* Date of Birth */}
        <FieldGroup className="flex-row">
          <Field>
            <FieldLabel htmlFor="date-picker-optional" className="text-white">
              Date of Birth
            </FieldLabel>
            <Popover>
              <PopoverTrigger
                asChild
                className="border-white/20! bg-[#2B2E36]/20"
              >
                <Button
                  variant="outline"
                  id="date-picker-optional"
                  className="w-32 flex-row-reverse justify-between py-5! font-normal text-white"
                >
                  <ChevronDownIcon />
                  {payload.dateOfBirth ? moment(payload.dateOfBirth).format("MMM Do YY") : "Select date"}
                 
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={
                    payload.dateOfBirth
                      ? new Date(payload.dateOfBirth)
                      : undefined
                  }
                  captionLayout="dropdown"
                  //   defaultMonth={dateOfBirth}
                  onSelect={(date) => {
                    setPayload((prev) => ({
                      ...prev,
                      dateOfBirth: moment(date).format("YYYY/MM/DD"),
                    }))
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>
        </FieldGroup>

        <SelectField
          label="Select Gender"
          placeholder="Select Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          triggerClassName={triggerClassName}
          value={payload.gender || ""}
          onValueChange={(value) =>
            setPayload((prev) => ({
              ...prev,
              gender: value,
            }))
          }
        />

        {/* sport selection */}
        <div className="">
          <label className="mb-2 block text-sm font-medium text-white">
            Sport Selection
          </label>
          <Select
            value={String(payload.sport) || ""}
            onValueChange={(value) =>
              setPayload((prev) => ({
                ...prev,
                sport: value,
              }))
            }
          >
            <SelectTrigger className="w-full border-white/10! py-5.5 text-white data-placeholder:text-white/50">
              <SelectValue
                placeholder="Sport Selection"
                className="text-white"
              />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                {sportsOptions.map((sport , i) => (
                  <SelectItem
                    key={i}
                    value={String(sport.id)}
                    className="hover:bg-brand!"
                  >
                    {sport.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* joursy number */}
        <UiInput
          label="Jersey Number"
          placeholder="e.g. 10"
          className={controlClassName}
          value={payload.jerseyNumber || ""}
          onChange={(e) => {
            setPayload((prev) => ({
              ...prev,
              jerseyNumber: e.target.value,
            }))
          }}
          type="number"
        />

        {/* dominent foot */}
        <SelectField
          label="Dominant Foot"
          placeholder="Select"
          options={[
            { value: "right", label: "Right" },
            { value: "left", label: "Left" },
          ]}
          triggerClassName={triggerClassName}
          value={payload.dominantFoot || ""}
          onValueChange={(value) =>
            setPayload((prev) => ({
              ...prev,
              dominantFoot: value,
            }))
          }
        />

        {/* club / team */}
        <UiInput
          label="Club / Team"
          placeholder="e.g. Toronto United"
          className={controlClassName}
          value={payload.clubTeam || ""}
          onChange={(e) => {
            setPayload((prev) => ({
              ...prev,
              clubTeam: e.target.value,
            }))
          }}
        />

        {/* nationality */}
        <UiInput
          label="Nationality"
          placeholder="Canada / USA ..."
          className={controlClassName}
          value={payload.nationality || ""}
          onChange={(e) => {
            setPayload((prev) => ({
              ...prev,
              nationality: e.target.value,
            }))
          }}
        />
      </div>
      <div className="mt-2 w-full">
        <p className="text-[14px]! text-white">Country & City</p>
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
  )
}

const controlClassName =
  "h-11 rounded-xl border border-white/10 bg-[#0F1117] px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"

const triggerClassName =
  "h-11 w-full rounded-xl border-white/10 bg-[#0F1117] px-3 text-sm text-white data-placeholder:text-white/50 py-5! "
