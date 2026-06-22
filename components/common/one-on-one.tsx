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
import {
  createProgram,
  getProgramDetails,
  updateProgram,
} from "@/app/(dashboards)/club/action"
import { toast } from "sonner"
import { getSportOptions } from "@/app/(dashboards)/action"
import useModal from "./modal/useModal"
import { getHighestNumber, getLowestNumber } from "@/lib/get-highest-number"
import {
  addCoachProgram,
  updateCoachProgram,
} from "@/app/(dashboards)/coach/my-programs/action"

// ─── Types ────────────────────────────────────────────────────────────────────

type TSportOption = {
  id: number
  name: string
  audience: string
  status: string
}

// Internal AM/PM representation
type TTimeParts = { hour: string; minute: string; period: "AM" | "PM" }

// Each time range stores TTimeParts for start and end
type TTimeRange = { start: TTimeParts; end: TTimeParts }
type TTimeSlot = { date: string; times: TTimeRange[] }

// ─── Time helpers ─────────────────────────────────────────────────────────────

const defaultTimeParts: TTimeParts = { hour: "12", minute: "00", period: "AM" }

/**
 * "HH:mm" (24-hr from server) → TTimeParts
 */
function from24(time?: string | null): TTimeParts {
  if (!time) {
    return {
      hour: "12",
      minute: "00",
      period: "AM",
    }
  }

  const value = time.trim().toUpperCase()

  // 02:00 AM
  const ampmMatch = value.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)$/)

  if (ampmMatch) {
    return {
      hour: String(Number(ampmMatch[1])),
      minute: ampmMatch[2],
      period: ampmMatch[3] as "AM" | "PM",
    }
  }

  // 14:00
  const twentyFourMatch = value.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/)

  if (twentyFourMatch) {
    const h24 = Number(twentyFourMatch[1])

    let h12 = h24 % 12

    if (h12 === 0) h12 = 12

    return {
      hour: String(h12),
      minute: twentyFourMatch[2],
      period: h24 >= 12 ? "PM" : "AM",
    }
  }

  return {
    hour: "12",
    minute: "00",
    period: "AM",
  }
}

/**
 * TTimeParts → "02:00AM" for the API
 */

function toAmPmString({ hour, minute, period }: TTimeParts): string {
  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")} ${period}`
}

/**
 * Add `durationMins` to a TTimeParts and return a new TTimeParts.
 * Wraps around 12-hr clock correctly.
 */
function addMinutes(base: TTimeParts, durationMins: number): TTimeParts {
  let totalMins =
    (parseInt(base.hour, 10) % 12) * 60 +
    parseInt(base.minute, 10) +
    (base.period === "PM" ? 12 * 60 : 0) +
    durationMins

  totalMins = totalMins % (24 * 60) // keep within 24 hrs
  const h24 = Math.floor(totalMins / 60)
  const m = totalMins % 60
  const period: "AM" | "PM" = h24 >= 12 ? "PM" : "AM"
  let h12 = h24 % 12
  if (h12 === 0) h12 = 12
  return {
    hour: String(h12),
    minute: String(m).padStart(2, "0"),
    period,
  }
}

const emptyTimeRange = (): TTimeRange => ({
  start: { ...defaultTimeParts },
  end: { ...defaultTimeParts },
})

// ─── AM/PM Time Picker Component ─────────────────────────────────────────────

function AmPmTimePicker({
  label,
  value,
  onChange,
}: {
  label: string
  value: TTimeParts
  onChange: (v: TTimeParts) => void
}) {
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1))

  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  )

  const selectCls =
    "border-neutral-700 bg-neutral-800 text-white h-9 px-2 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-brand"

  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-xs text-neutral-400">{label}</span>}
      <div className="flex items-center gap-1">
        {/* Hour */}
        <select
          value={value.hour}
          onChange={(e) => onChange({ ...value, hour: e.target.value })}
          className={selectCls}
          style={{ minWidth: 50 }}
        >
          {hours.map((h) => (
            <option key={h} value={h} className="bg-neutral-800">
              {h.padStart(2, "0")}
            </option>
          ))}
        </select>

        <span className="text-sm font-bold text-neutral-400">:</span>

        {/* Minute */}
        <select
          value={value.minute}
          onChange={(e) => onChange({ ...value, minute: e.target.value })}
          className={selectCls}
          style={{ minWidth: 50 }}
        >
          {minutes.map((m) => (
            <option key={m} value={m} className="bg-neutral-800">
              {m}
            </option>
          ))}
        </select>

        {/* AM / PM toggle */}
        <div className="flex shrink-0 overflow-hidden rounded-md border border-neutral-700">
          {(["AM", "PM"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onChange({ ...value, period: p })}
              className={`h-9 px-2.5 text-xs font-medium transition-colors ${
                value.period === p
                  ? "bg-brand text-black"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Initial form state ───────────────────────────────────────────────────────

const initialForm = {
  sport: "",
  name: "",
  ageGroup: "",
  price: "",
  discountPrice: "",
  location: "",
  start: "",
  end: "",
  timeSlots: [{ date: "", times: [emptyTimeRange()] }] as TTimeSlot[],
  about: "",
  goals: [""],
  photo: null as string | null,
  type: "one_one",
  sportOptionId: "",
}

const fieldCls =
  "border-neutral-700 bg-neutral-800 py-5 placeholder:text-neutral-300 placeholder:opacity-100"
const selectClsBase =
  "mt-1 w-full border-neutral-700 bg-neutral-800 py-5 text-white data-[placeholder]:text-neutral-300"

// ─── Main Component ───────────────────────────────────────────────────────────

const OneonOneProgram: React.FC<{
  setProgramType: (type: "group" | "one-on-one") => void
}> = ({ setProgramType }) => {
  const { close } = useModal()
  const currentUser = localStorage.getItem("go_elite_user")
    ? JSON.parse(localStorage.getItem("go_elite_user") || "{}")
    : null

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sportOptions, setSportOptions] = useState<TSportOption[]>([])
  const [form, setForm] = useState(initialForm)

  // Per-slot duration input (in minutes), keyed by slot index
  const [durations, setDurations] = useState<Record<number, string>>({})

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
      timeSlots: [...p.timeSlots, { date: "", times: [emptyTimeRange()] }],
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

  const addTimeRange = (si: number) => {
    setForm((p) => {
      const timeSlots = [...p.timeSlots]
      const slot = timeSlots[si]
      const durationMins = parseInt(durations[si] || "0", 10)

      let newRange: TTimeRange

      if (durationMins > 0 && slot.times.length > 0) {
        const lastEnd = slot.times[slot.times.length - 1].end
        const newStart = lastEnd
        const newEnd = addMinutes(lastEnd, durationMins)
        newRange = { start: newStart, end: newEnd }
      } else {
        newRange = emptyTimeRange()
      }

      timeSlots[si] = { ...slot, times: [...slot.times, newRange] }
      return { ...p, timeSlots }
    })
  }

  const removeTimeRange = (si: number, ti: number) =>
    setForm((p) => {
      const timeSlots = [...p.timeSlots]
      timeSlots[si] = {
        ...timeSlots[si],
        times: timeSlots[si].times.filter((_, i) => i !== ti),
      }
      return { ...p, timeSlots }
    })

  const setTimeRangePart = (
    si: number,
    ti: number,
    field: "start" | "end",
    value: TTimeParts
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

  // ─── Load program for editing ─────────────────────────────────────────────────

  const editId = localStorage.getItem("edit_program_id")

  useEffect(() => {
    if (!editId) return
    getProgramDetails(String(editId))
      .then((res: any) => {
        const p = res?.data?.data

        if (!p) {
          toast.error("Failed to load program data")
          return
        }
        setProgramType(p.program_type)

        // Group flat times array by slot_date

        const groupedSlots: TTimeSlot[] = (() => {
          if (!p?.times?.length) {
            return [
              {
                date: "",
                times: [emptyTimeRange()],
              },
            ]
          }

          const grouped: Record<string, TTimeRange[]> = {}

          p.times.forEach((t: any) => {
            const date = t.slot_date || ""

            if (!grouped[date]) {
              grouped[date] = []
            }

            grouped[date].push({
              start: from24(t.start_time),
              end: from24(t.end_time),
            })
          })

          return Object.entries(grouped).map(([date, times]) => ({
            date,
            times,
          }))
        })()

        setForm({
          sport: p.sport || "",
          name: p.program_name || "",
          ageGroup: p.age_limit ? String(p.age_limit) : "",
          price: p.price ? String(p.price) : "",
          discountPrice: p.discount_price ? String(p.discount_price) : "",
          location: p.location || "",
          start: p.start_date || "",
          end: p.end_date || "",
          about: p.about || "",
          goals: p.goals?.length
            ? p.goals.map((g: { goal: string }) => g.goal)
            : [""],
          photo: p.photo || null,
          type: "one_one",
          sportOptionId: p.sport_option ? String(p.sport_option.id) : "",
          timeSlots: groupedSlots,
        })
      })
      .catch(console.error)
  }, [editId])

  // ─── Build FormData ───────────────────────────────────────────────────────────

  const buildFormData = async () => {
    const formData = new FormData()

    const fields: Record<string, string> = {
      sport: form.sport,
      program_type: "one_one",
      program_name: form.name,
      program_price: form.price,
      program_location: form.location,
      program_start: form.start,
      program_end: form.end,
      about_program: form.about,
      discount_price: form.discountPrice || "0",
      upto_age: String(getHighestNumber(form.ageGroup)),
      from_age: String(getLowestNumber(form.ageGroup)),
      sport_option_id: form.sportOptionId,
    }

    Object.entries(fields).forEach(([k, v]) => formData.append(k, v))

    let idx = 0
    form.timeSlots.forEach((slot) => {
      if (!slot.date) return

      slot.times.forEach((t) => {
        const startStr = toAmPmString(t.start)
        const endStr = toAmPmString(t.end)
        if (!startStr || !endStr) return
        formData.append(`program_times[${idx}][slot_date]`, slot.date)
        formData.append(`program_times[${idx}][start_time]`, startStr)
        formData.append(`program_times[${idx}][end_time]`, endStr)
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

  // ─── Validation ───────────────────────────────────────────────────────────────

  const validateForm = () => {
    if (!form.photo) {
      toast.error("Please upload a program image")
      return false
    }
    if (!form.sport) {
      toast.error("Please select a sport")
      return false
    }
    if (!form.name?.trim()) {
      toast.error("Please enter a program name")
      return false
    }
    if (!form.price || Number(form.price) <= 0) {
      toast.error("Please enter a valid program price")
      return false
    }
    const hasValidTime = form.timeSlots.some((slot) =>
      Boolean(
        slot.date &&
        slot.times.some((t) => toAmPmString(t.start) && toAmPmString(t.end))
      )
    )
    if (!hasValidTime) {
      toast.error(
        "Please add at least one valid time slot with start and end time"
      )
      return false
    }
    return true
  }

  // ─── Submit handlers ──────────────────────────────────────────────────────────

  const onSuccess = (message: string) => {
    toast.success(message)
    window.dispatchEvent(new Event("programevent"))
    close("add-new", ["program"])
    close("editID")
  }

  const handleAdd = async () => {
    if (isSubmitting) return
    if (!validateForm()) return
    setIsSubmitting(true)

    if (currentUser?.role === "club") {
      try {
        const res: any = await createProgram(await buildFormData())
        res?.success || res?.status
          ? onSuccess("Program created successfully!")
          : toast.error(res?.message || "Failed to create program.")
        close("add-new", ["program"])
      } catch {
        toast.error("Failed to create program. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }

    if (currentUser?.role === "coach") {
      try {
        const res: any = await addCoachProgram(await buildFormData())
        res?.success || res?.status
          ? onSuccess("Program created successfully!")
          : toast.error(res?.message || "Failed to create program.")
        close("add-new", ["program"])
      } catch {
        toast.error("Failed to create program. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleUpdate = async () => {
    if (isSubmitting || !editId) return
    if (!validateForm()) return
    setIsSubmitting(true)

    if (currentUser?.role === "club") {
      try {
        const res: any = await updateProgram({
          program_id: editId,
          data: await buildFormData(),
        })
        res?.success || res?.status
          ? onSuccess("Program updated successfully!")
          : toast.error(res?.message || "Failed to update program.")
        window.dispatchEvent(new CustomEvent("programevent"))
        close("add-new", ["program"])
      } catch {
        toast.error("Failed to update program. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }

    if (currentUser?.role === "coach") {
      try {
        const res: any = await updateCoachProgram({
          program_id: editId,
          data: await buildFormData(),
        })
        res?.success || res?.status
          ? onSuccess("Program updated successfully!")
          : toast.error(res?.message || "Failed to update program.")
        window.dispatchEvent(new CustomEvent("programevent"))
        close("add-new", ["program"])
      } catch {
        toast.error("Failed to update program. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto w-full p-0">
      <div className="flex flex-col gap-4 rounded-2xl bg-neutral-900 p-8 text-white">
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
              <SelectTrigger className={selectClsBase}>
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
            <p className="text-sm">
              Discount Price{" "}
              <span className="ml-1 text-brand!">(Optional)</span>
            </p>
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
            <p className="text-sm">Program Location</p>
            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Program Location"
              className={fieldCls}
            />
          </div>

          {/* Program Start */}
          <div className="flex flex-col">
            <p className="text-sm">
              Program Start <span className="ml-1 text-brand!">(Optional)</span>
            </p>
            <Input
              name="start"
              value={form.start}
              onChange={handleChange}
              className={`mt-1 ${fieldCls}`}
              type="date"
            />
          </div>

          {/* Program End */}
          <div className="flex flex-col">
            <p className="text-sm">
              Program End <span className="ml-1 text-brand!">(Optional)</span>
            </p>
            <Input
              name="end"
              value={form.end}
              onChange={handleChange}
              className={`mt-1 ${fieldCls}`}
              type="date"
            />
          </div>

          {/* ── Program Times ── */}
          <div className="col-span-full flex flex-col gap-2">
            <p className="text-sm">Program Times</p>

            <div className="flex flex-col gap-3">
              {form.timeSlots.map((slot, si) => (
                <div
                  key={si}
                  className="rounded-lg border border-neutral-700 bg-neutral-800 p-3"
                >
                  {/* ── Date row ── */}
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

                  {/* ── Time range rows ── */}
                  <div className="flex flex-col gap-3 pl-1">
                    {slot.times.map((t, ti) => (
                      <div
                        key={ti}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2"
                      >
                        <AmPmTimePicker
                          label="Start"
                          value={t.start}
                          onChange={(v) => setTimeRangePart(si, ti, "start", v)}
                        />
                        <AmPmTimePicker
                          label="End"
                          value={t.end}
                          onChange={(v) => setTimeRangePart(si, ti, "end", v)}
                        />
                        {/* API preview */}
                        <div className="flex gap-1">
                          <span className="self-end pb-1 text-[10px] text-neutral-500">
                            {toAmPmString(t.start)}–{toAmPmString(t.end)}
                          </span>
                          {slot.times.length > 1 && (
                            <CommonBtn
                              text="✕"
                              size="sm"
                              variant="ghost"
                              onClick={() => removeTimeRange(si, ti)}
                              className="cursor-pointer self-end border border-secondary! hover:border-brand hover:bg-brand hover:text-primary"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ── Duration + Add Time Range ── */}
                  <div className="mt-3 flex items-center gap-2">
                    {/* Duration input */}
                    <div className="flex h-9 items-center gap-1.5 rounded-md border border-neutral-700 bg-neutral-900 px-3">
                      <span className="text-xs whitespace-nowrap text-neutral-400">
                        Duration
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder="60"
                        value={durations[si] ?? ""}
                        onChange={(e) =>
                          setDurations((prev) => ({
                            ...prev,
                            [si]: e.target.value,
                          }))
                        }
                        className="w-14 bg-transparent text-sm text-white outline-none placeholder:text-neutral-600"
                      />
                      <span className="text-xs text-neutral-500">min</span>
                    </div>

                    <CommonBtn
                      text="+ Add Time Range"
                      size="sm"
                      variant="outline"
                      onClick={() => addTimeRange(si)}
                      className="ml-auto w-fit px-3 hover:border-brand hover:bg-brand hover:text-primary"
                    />
                  </div>

                  {/* Duration hint */}
                  {durations[si] && parseInt(durations[si], 10) > 0 && (
                    <p className="mt-1.5 pl-1 text-[10px] font-thin text-secondary!">
                      Each new slot will be{" "}
                      <span className="text-brand">{durations[si]} min</span>{" "}
                      after the previous end time.
                    </p>
                  )}
                </div>
              ))}

              {/* Add date slot */}
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
            text={
              isSubmitting
                ? "Saving..."
                : editId
                  ? "Update Program"
                  : "Save Program"
            }
            size="lg"
            variant="default"
            className="w-fit bg-brand px-10 text-black hover:border hover:bg-transparent hover:text-white"
            onClick={editId ? handleUpdate : handleAdd}
            disabled={isSubmitting}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </div>
  )
}

export default OneonOneProgram
