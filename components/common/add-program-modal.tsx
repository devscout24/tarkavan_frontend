"use client"
import React, { useEffect, useState } from "react"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"
import CommonBtn from "@/components/common/common-btn"
import UploadPhoto from "@/components/common/upload-photo"
import Image from "next/image"
import { getProgramDetails } from "@/app/(dashboards)/club/action"
import { toast } from "sonner"
import { usePathname, useSearchParams } from "next/navigation"
import { getSportOptions } from "@/app/(dashboards)/action"
import useModal from "./modal/useModal"
import CountryCitySelector from "./country-city-selector"
import { getHighestNumber } from "@/lib/get-highest-number"
import api from "@/lib/api-fetcher"
import TimePicker from "react-time-picker"
import "react-time-picker/dist/TimePicker.css"
import "react-clock/dist/Clock.css"

type TSportOption = {
  id: number
  name: string
  audience: string
  status: string
}

type TTimeRange = { start: string; end: string }
type TTimeSlot = { date: string; times: TTimeRange[] }

const initialForm = {
  sport: "",
  name: "",
  ageGroup: "",
  price: "",
  discountPrice: "",
  location: "",
  country: "",
  city: "",
  start: "",
  end: "",
  timeSlots: [{ date: "", times: [{ start: "", end: "" }] }] as TTimeSlot[],
  about: "",
  goals: [""],
  photo: null as string | null,
  type: "one_one",
  sportOptionId: "",
}

const fieldCls =
  "border-neutral-700 bg-neutral-800 py-5 placeholder:text-neutral-300 placeholder:opacity-100"
const selectCls =
  "mt-1 w-full border-neutral-700 bg-neutral-800 py-5 text-white data-[placeholder]:text-neutral-300"

const AddProgramPage: React.FC = () => {
  const { close } = useModal()
  const pathname = usePathname()
  const isCoachDashboard = pathname?.startsWith("/coach")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sportOptions, setSportOptions] = useState<TSportOption[]>([])
  const [form, setForm] = useState(initialForm)

  const set = (name: string, value: string) =>
    setForm((p) => ({ ...p, [name]: value }))
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => set(e.target.name, e.target.value)

  // ─── Goal handlers ───────────────────────────────────────────────────────────
  const handleGoalChange = (idx: number, value: string) =>
    setForm((p) => {
      const goals = [...p.goals]
      goals[idx] = value
      return { ...p, goals }
    })

  const addGoal = () => setForm((p) => ({ ...p, goals: [...p.goals, ""] }))

  const removeGoal = (idx: number) =>
    setForm((p) => ({ ...p, goals: p.goals.filter((_, i) => i !== idx) }))

  // ─── Time slot handlers ───────────────────────────────────────────────────────
  const addSlot = () =>
    setForm((p) => ({
      ...p,
      timeSlots: [
        ...p.timeSlots,
        { date: "", times: [{ start: "", end: "" }] },
      ],
    }))

  const removeSlot = (si: number) =>
    setForm((p) => ({
      ...p,
      timeSlots: p.timeSlots.filter((_, i) => i !== si),
    }))

  const setSlotDate = (si: number, date: string) =>
    setForm((p) => {
      const timeSlots = [...p.timeSlots]
      timeSlots[si] = { ...timeSlots[si], date }
      return { ...p, timeSlots }
    })

  const addTimeRange = (si: number) =>
    setForm((p) => {
      const timeSlots = [...p.timeSlots]
      timeSlots[si] = {
        ...timeSlots[si],
        times: [...timeSlots[si].times, { start: "", end: "" }],
      }
      return { ...p, timeSlots }
    })

  const removeTimeRange = (si: number, ti: number) =>
    setForm((p) => {
      const timeSlots = [...p.timeSlots]
      timeSlots[si] = {
        ...timeSlots[si],
        times: timeSlots[si].times.filter((_, i) => i !== ti),
      }
      return { ...p, timeSlots }
    })

  const setTimeRange = (
    si: number,
    ti: number,
    field: "start" | "end",
    value: string
  ) =>
    setForm((p) => {
      const timeSlots = [...p.timeSlots]
      const times = [...timeSlots[si].times]
      times[ti] = { ...times[ti], [field]: value }
      timeSlots[si] = { ...timeSlots[si], times }
      return { ...p, timeSlots }
    })

  // ─── Load sport options ───────────────────────────────────────────────────────
  useEffect(() => {
    getSportOptions()
      .then((res: any) => {
        if (res?.success && res?.data?.data) setSportOptions(res.data.data)
      })
      .catch(console.error)
  }, [])

  // ─── Load program for editing (Not needed for AddProgramPage) ─────────────────
  const searchParams = useSearchParams()
  const isModalOpen = searchParams.get("add-new") === "program"

  useEffect(() => {
    if (isModalOpen) {
      setForm(initialForm)
    }
  }, [isModalOpen])

  // ─── Build FormData ───────────────────────────────────────────────────────────
  const buildFormData = async () => {
    const formData = new FormData()

    const fields: Record<string, string> = {
      sport: form.sport,
      program_type: form.type,
      program_name: form.name,
      program_price: form.price,
      program_location: `${form.country}, ${form.city}`,
      program_start: form.start,
      program_end: form.end,
      about_program: form.about,
      discount_price: form.discountPrice || "0",
      upto_age: String(getHighestNumber(form.ageGroup)),
    }

    Object.entries(fields).forEach(([k, v]) => formData.append(k, v))

    // Add access_token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("go_elite_token="))
      ?.split("=")[1]

    if (token) {
      formData.append("access_token", token)
    }

    // Flatten timeSlots → program_times[N] and program_dates[N]
    let idx = 0
    form.timeSlots.forEach((slot) => {
      slot.times.forEach((t) => {
        if (!t.start || !t.end) return
        formData.append(`program_times[${idx}]`, `${t.start}-${t.end}`)
        if (slot.date) {
          formData.append(`program_dates[${idx}]`, slot.date)
        }
        idx++
      })
    })

    form.goals
      .filter((g) => g.trim())
      .forEach((g, i) => formData.append(`goals[${i}]`, g))

    if (form.photo?.startsWith("data:")) {
      const blob = await (await fetch(form.photo)).blob()
      const ext = blob.type.split("/")[1]?.toLowerCase() || "jpg"
      formData.append(
        "program_photo",
        new File([blob], `program-photo.${ext}`, { type: blob.type })
      )
    }

    return formData
  }

  // ─── Submit handlers ──────────────────────────────────────────────────────────
  const onSuccess = (message: string) => {
    toast.success(message)
    window.dispatchEvent(new Event("programevent"))
    close("add-new", ["program"])
  }

  const handleAdd = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      const formData = await buildFormData()
      const endpoint = isCoachDashboard
        ? "/coach/program/add"
        : "/club/program/add"
      const res = await api.post(endpoint, formData)
      console.log("Create Program Response:", res)
      res?.data?.success || res?.status === 200
        ? onSuccess("Program created successfully!")
        : toast.error(res?.data?.message || "Failed to create program.")
      close("add-new", ["program"])
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create program. Please try again."
      )
      toast.error("Failed to create program. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full p-0">
      <div className="flex flex-col gap-4 rounded-2xl bg-neutral-900 p-8 text-white">
        <h2 className="mb-2 text-2xl font-semibold">Add Program</h2>

        {/* Photo Upload */}
        <div className="mb-2">
          <UploadPhoto
            onFileSelect={(file) => {
              const reader = new FileReader()
              reader.onload = () =>
                setForm((p) => ({ ...p, photo: reader.result as string }))
              reader.readAsDataURL(file)
            }}
            title="UPLOAD PHOTO"
            subtitle="JPG or PNG, max 5MB. Headshots preferred."
          />
          {form.photo && (
            <div className="mt-2 flex items-center gap-2">
              <Image
                src={form.photo}
                alt="Uploaded Preview"
                width={80}
                height={80}
                unoptimized
                className="h-20 w-20 rounded border border-neutral-700 object-cover"
              />
              <button
                type="button"
                aria-label="Remove uploaded photo"
                className="ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 bg-black/60 text-lg text-white hover:bg-red-600"
                onClick={() => setForm((p) => ({ ...p, photo: null }))}
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Program Type */}
        <div className="flex flex-col">
          <span className="text-sm">Program Type</span>
          <Select value={form.type} onValueChange={(v) => set("type", v)}>
            <SelectTrigger className={selectCls}>
              <SelectValue placeholder="Select Program Type" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="group" className="hover:bg-brand!">
                Group
              </SelectItem>
              <SelectItem value="one_one" className="hover:bg-brand!">
                One-on-One
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Sport Selection */}
          <div className="flex flex-col">
            <span className="text-sm">Sport Selection</span>
            <Select
              value={form.sport}
              onValueChange={(v) => {
                set("sport", v)
                const s = sportOptions.find((s) => s.name === v)
                if (s) set("sportOptionId", String(s.id))
              }}
            >
              <SelectTrigger className={selectCls}>
                <SelectValue placeholder="Select Sport" />
              </SelectTrigger>
              <SelectContent position="popper">
                {sportOptions.map((s) => (
                  <SelectItem
                    key={s.id}
                    value={s.name}
                    className="hover:bg-brand!"
                  >
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Program Name */}
          <div className="flex flex-col">
            <span className="text-sm">Program Name</span>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Program Name"
              className={`mt-1 ${fieldCls}`}
            />
          </div>

          {/* Age Group */}
          <div className="flex flex-col">
            <span className="text-sm">Age Group</span>
            <Input
              placeholder="e.g U14 or U16-U20"
              value={form.ageGroup}
              onChange={(e) => set("ageGroup", e.target.value)}
              className={`mt-1 ${fieldCls}`}
            />
          </div>

          {/* Program Price */}
          <div className="flex flex-col">
            <span className="text-sm">Program Price ($)</span>
            <Input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Program Price ($)"
              className={`mt-1 ${fieldCls}`}
              type="number"
            />
          </div>

          {/* Discount Price */}
          <div className="flex flex-col">
            <span className="text-sm">Discount Price ($)</span>
            <Input
              name="discountPrice"
              value={form.discountPrice}
              onChange={handleChange}
              placeholder="Program Discount Price ($)"
              className={fieldCls}
              type="number"
            />
          </div>

          {/* Program Location */}
          <div className="flex flex-col">
            <span className="text-sm">Program Location</span>
            <CountryCitySelector
              onSelect={(data) => {
                setForm((p) => ({
                  ...p,
                  country: data.country_name,
                  city: data.city_name,
                }))
              }}
            />
          </div>

          {/* Program Start / End */}

          <div className="flex flex-col">
            <span className="text-sm">Program Start</span>
            <Input
              name="start"
              value={form.start}
              onChange={handleChange}
              className={`mt-1 ${fieldCls}`}
              type="date"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Program End</span>
            <Input
              name="end"
              value={form.end}
              onChange={handleChange}
              className={`mt-1 ${fieldCls}`}
              type="date"
            />
          </div>

          {/* ── Program Times (date + time slots) ── */}
          <div className="col-span-full flex flex-col gap-2">
            <span className="text-sm">Program Times</span>

            <div className="flex flex-col gap-3">
              {form.timeSlots.map((slot, si) => (
                <div
                  key={si}
                  className="rounded-lg border border-neutral-700 bg-neutral-800 p-3"
                >
                  {/* Date row */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="min-w-fit text-xs text-neutral-400">
                      Date
                    </span>
                    <Input
                      type="date"
                      value={slot.date}
                      onChange={(e) => setSlotDate(si, e.target.value)}
                      className={`flex-1 ${fieldCls}`}
                    />
                    {form.timeSlots.length > 1 && (
                      <CommonBtn
                        text="✕"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeSlot(si)}
                        className="hover:border-brand hover:bg-brand hover:text-primary"
                      />
                    )}
                  </div>

                  {/* Time range rows */}
                  <div className="flex flex-col gap-2 pl-2">
                    {slot.times.map((t, ti) => (
                      <div key={ti} className="flex items-center gap-2">
                        <span className="min-w-fit text-xs text-neutral-400">
                          Start
                        </span>
                        <TimePicker
                          value={t.start}
                          onChange={(value) =>
                            setTimeRange(si, ti, "start", value || "")
                          }
                          disableClock
                          format="HH:mm"
                          className="flex-1"
                        />

                        <span className="text-xs text-neutral-400">End</span>
                        <TimePicker
                          value={t.end}
                          onChange={(value) =>
                            setTimeRange(si, ti, "end", value || "")
                          }
                          disableClock
                          format="HH:mm"
                          className="flex-1 rounded-md!"
                        />
                        {slot.times.length > 1 && (
                          <CommonBtn
                            text="✕"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeTimeRange(si, ti)}
                            className="hover:border-brand hover:bg-brand hover:text-primary"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add time range button */}
                  <CommonBtn
                    text="+ Add Time Range"
                    size="sm"
                    variant="outline"
                    onClick={() => addTimeRange(si)}
                    className="mt-4 ml-auto w-fit px-2 hover:border-brand hover:bg-brand hover:text-primary"
                  />
                </div>
              ))}

              {/* Add date slot button */}
              <CommonBtn
                text="+ Add Date Slot"
                size="sm"
                variant="outline"
                onClick={addSlot}
                className="w-full py-5! hover:border-brand hover:bg-brand hover:text-primary"
              />
            </div>
          </div>
        </div>

        {/* About */}
        <Textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          placeholder="About This Program"
          className="mt-2 border-neutral-700 bg-neutral-800 placeholder:text-neutral-300 placeholder:opacity-100"
        />

        {/* Goals */}
        <div className="mt-2 rounded-lg border border-dashed border-neutral-700 p-3">
          <div className="flex flex-col gap-2">
            {form.goals.map((goal, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={goal}
                  onChange={(e) => handleGoalChange(idx, e.target.value)}
                  placeholder={`Goal ${idx + 1}`}
                  className={`mx-auto w-97/100 ${fieldCls}`}
                />
                {form.goals.length > 1 && (
                  <CommonBtn
                    text="✕"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeGoal(idx)}
                    className="hover:border-brand hover:bg-brand hover:text-primary"
                  />
                )}
              </div>
            ))}
            <CommonBtn
              text="+ Add Goals"
              size="sm"
              variant="outline"
              onClick={addGoal}
              className="mx-auto mt-2 w-97/100 py-5! hover:border-brand hover:bg-brand hover:text-primary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 mr-4 flex justify-end gap-4">
          <CommonBtn
            text="Cancel"
            size="lg"
            variant="outline"
            onClick={() => {
              localStorage.removeItem("edit_program_id")
              close("add-new", ["program"])
            }}
            className="w-fit px-10 hover:border-brand hover:bg-brand hover:text-primary"
          />
          <CommonBtn
            text={isSubmitting ? "Saving..." : "Save Program"}
            size="lg"
            variant="default"
            className="w-fit bg-brand px-10 text-black hover:border hover:bg-transparent hover:text-white"
            onClick={handleAdd}
          />
        </div>
      </div>
    </div>
  )
}

export default AddProgramPage
