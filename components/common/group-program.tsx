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
 * TTimeParts → "02:00 AM" for the API
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

// ─── Date helpers ─────────────────────────────────────────────────────────────

/** "YYYY-MM-DD" → Date (local, no timezone shift) */
function parseISODate(value: string): Date | null {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return null
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
}

/** Date → "YYYY-MM-DD" (local) */
function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

/** Every date between start and end (inclusive) */
function datesBetween(start: string, end: string): string[] {
  const s = parseISODate(start)
  const e = parseISODate(end)
  if (!s || !e || s > e) return []

  const out: string[] = []
  const cur = new Date(s)
  while (cur <= e) {
    out.push(toISODate(cur))
    cur.setDate(cur.getDate() + 1)
  }
  return out
}

const MAX_GENERATED_DATES = 60

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

  const minutes = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ]

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
  type: "group",
  sportOptionId: "",
  isFree: false,
  isSingleDay: false,
}

const fieldCls =
  "border-neutral-700 bg-neutral-800 py-5 placeholder:text-neutral-300 placeholder:opacity-100"
const selectClsBase =
  "mt-1 w-full border-neutral-700 bg-neutral-800 py-5 text-white data-[placeholder]:text-neutral-300"

// ─── Main Component ───────────────────────────────────────────────────────────

const GroupProgram: React.FC<{
  setProgramType: (type: "group" | "one-on-one") => void
}> = ({ setProgramType }) => {
  const { close } = useModal()
  const currentUser =
    typeof window !== "undefined" && localStorage.getItem("go_elite_user")
      ? JSON.parse(localStorage.getItem("go_elite_user") || "{}")
      : null

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sportOptions, setSportOptions] = useState<TSportOption[]>([])
  const [form, setForm] = useState(initialForm)

  // Per-slot duration input (in minutes), keyed by slot index
  const [durations, setDurations] = useState<Record<number, string>>({})

  // Clear all dates asks for a second click before it wipes anything
  const [confirmClear, setConfirmClear] = useState(false)

  const set = (name: string, value: string) =>
    setForm((p) => ({ ...p, [name]: value }))

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => set(e.target.name, e.target.value)

  // ─── Date range handlers ──────────────────────────────────────────────────────

  // Single-day program: one date is used as both start and end
  const toggleSingleDay = (v: boolean) =>
    setForm((p) => ({
      ...p,
      isSingleDay: v,
      end: v ? p.start : p.end,
    }))

  const setStartDate = (value: string) =>
    setForm((p) => ({
      ...p,
      start: value,
      end: p.isSingleDay ? value : p.end,
    }))

  // Create one date slot per day between program start and end
  const generateSlotsFromRange = () => {
    if (!form.start) {
      toast.error("Set a program start date first")
      return
    }

    const endDate = form.isSingleDay ? form.start : form.end

    if (!endDate) {
      toast.error("Set a program end date first")
      return
    }

    const dates = datesBetween(form.start, endDate)

    if (!dates.length) {
      toast.error("End date must be on or after the start date")
      return
    }

    if (dates.length > MAX_GENERATED_DATES) {
      toast.error(
        `That range covers ${dates.length} days. Pick a range of ${MAX_GENERATED_DATES} days or fewer.`
      )
      return
    }

    setForm((p) => {
      // Keep the times already entered for dates that stay in the range
      const existing = new Map(
        p.timeSlots.filter((s) => s.date).map((s) => [s.date, s])
      )

      // Reuse the first slot's times as the template for new dates
      const template = p.timeSlots[0]?.times?.length
        ? p.timeSlots[0].times
        : [emptyTimeRange()]

      const timeSlots: TTimeSlot[] = dates.map((date) => {
        const found = existing.get(date)
        if (found) return found
        return {
          date,
          times: template.map((t) => ({
            start: { ...t.start },
            end: { ...t.end },
          })),
        }
      })

      return { ...p, timeSlots }
    })

    setDurations({})
    toast.success(
      `${dates.length} date slot${dates.length > 1 ? "s" : ""} added`
    )
  }

  // Wipe every date slot and start over with one empty row
  const clearAllSlots = () => {
    setForm((p) => ({
      ...p,
      timeSlots: [{ date: "", times: [emptyTimeRange()] }],
    }))
    setDurations({})
    setConfirmClear(false)
    toast.success("All date slots cleared")
  }

  // Auto-cancel the pending clear confirmation
  useEffect(() => {
    if (!confirmClear) return
    const t = setTimeout(() => setConfirmClear(false), 4000)
    return () => clearTimeout(t)
  }, [confirmClear])

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

  // Copy one date's time ranges onto every other date slot
  const copyTimesToAllSlots = (si: number) =>
    setForm((p) => {
      const source = p.timeSlots[si]
      if (!source) return p

      const timeSlots = p.timeSlots.map((slot, i) =>
        i === si
          ? slot
          : {
              ...slot,
              times: source.times.map((t) => ({
                start: { ...t.start },
                end: { ...t.end },
              })),
            }
      )
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

  const editId =
    typeof window !== "undefined"
      ? localStorage.getItem("edit_program_id")
      : null

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

          return Object.entries(grouped)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, times]) => ({
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
          type: "group",
          sportOptionId: p.sport_option ? String(p.sport_option.id) : "",
          timeSlots: groupedSlots,
          isFree: p.is_free === true || p.is_free === "1" || p.is_free === 1,
          isSingleDay: Boolean(
            p.start_date && p.end_date && p.start_date === p.end_date
          ),
        })
      })
      .catch(console.error)
  }, [editId])

  // ─── Build FormData ───────────────────────────────────────────────────────────

  const buildFormData = async () => {
    const formData = new FormData()

    const endDate = form.isSingleDay ? form.start : form.end

    const fields: Record<string, string> = {
      sport: form.sport,
      program_type: "group",
      program_name: form.name,
      program_price: form.isFree ? "0" : form.price || "0",
      program_location: form.location,
      program_start: form.start,
      program_end: endDate,
      about_program: form.about,
      discount_price: form.isFree ? "0" : form.discountPrice || "0",
      upto_age: String(getHighestNumber(form.ageGroup)),
      from_age: String(getLowestNumber(form.ageGroup)),
      sport_option_id: form.sportOptionId,
      is_free: form.isFree ? "1" : "0",
    }

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value)
    })

    // --------------------------------------------------
    // Build unique program time slots
    // --------------------------------------------------

    const uniqueTimes = new Set<string>()

    let timeIndex = 0

    form.timeSlots.forEach((slot) => {
      if (!slot.date) return

      slot.times.forEach((time) => {
        const startTime = toAmPmString(time.start)
        const endTime = toAmPmString(time.end)

        if (!startTime || !endTime) return

        // Unique key
        const uniqueKey = `${slot.date}|${startTime}|${endTime}`

        // Prevent exact duplicate time range
        if (uniqueTimes.has(uniqueKey)) {
          console.warn("Duplicate time skipped:", uniqueKey)
          return
        }

        uniqueTimes.add(uniqueKey)

        formData.append(`program_times[${timeIndex}][slot_date]`, slot.date)

        formData.append(`program_times[${timeIndex}][start_time]`, startTime)

        formData.append(`program_times[${timeIndex}][end_time]`, endTime)

        timeIndex++
      })
    })

    // --------------------------------------------------
    // Goals
    // --------------------------------------------------

    form.goals
      .filter((goal) => goal.trim())
      .forEach((goal, index) => {
        formData.append(`goals[${index}]`, goal.trim())
      })

    // --------------------------------------------------
    // Photo
    // --------------------------------------------------

    if (form.photo?.startsWith("data:")) {
      const response = await fetch(form.photo)
      const blob = await response.blob()

      const ext = blob.type.split("/")[1]?.toLowerCase() || "jpg"

      const file = new File([blob], `program-photo.${ext}`, {
        type: blob.type,
      })

      formData.append("program_photo", file)
    }

    // --------------------------------------------------
    // DEBUG
    // --------------------------------------------------

    console.log("========== FINAL PROGRAM TIMES ==========")

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("program_times")) {
        console.log(key, value)
      }
    }

    console.log("========================================")

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
    if (
      !form.isFree &&
      (form.price === "" ||
        form.price === null ||
        form.price === undefined ||
        Number(form.price) < 0)
    ) {
      toast.error("Please enter a valid program price")
      return false
    }
    if (!form.isSingleDay && form.start && form.end && form.start > form.end) {
      toast.error("Program end date must be on or after the start date")
      return false
    }

    // Duplicate date slots would create conflicting sessions
    const usedDates = form.timeSlots.map((s) => s.date).filter(Boolean)
    if (new Set(usedDates).size !== usedDates.length) {
      toast.error("Each date can only be added once")
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

  const handleApiError = (error: any) => {
    console.log("API ERROR:", error)

    // API response
    const data = error?.data || error

    // Validation errors
    if (data?.errors && typeof data.errors === "object") {
      const firstField = Object.keys(data.errors)[0]

      if (firstField) {
        const messages = data.errors[firstField]

        if (Array.isArray(messages) && messages.length > 0) {
          toast.error(messages[0])
          return
        }

        if (typeof messages === "string") {
          toast.error(messages)
          return
        }
      }
    }

    // Normal API message
    if (data?.message) {
      toast.error(data.message)
      return
    }

    // Fallback
    toast.error("Failed to create program.")
  }

  const handleAdd = async () => {
    if (isSubmitting) return
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const formData = await buildFormData()

      if (currentUser?.role === "club") {
        const res: any = await createProgram(formData)

        console.log("createProgram response club:", res)

        if (res?.success || res?.status === true) {
          onSuccess("Program created successfully!")
          close("add-new", ["program"])
        } else {
          handleApiError(res)
        }
      }

      if (currentUser?.role === "coach") {
        const res: any = await addCoachProgram(formData)

        console.log("addCoachProgram response coach:", res)

        if (res?.success || res?.status === true) {
          onSuccess("Program created successfully!")
          close("add-new", ["program"])
        } else {
          handleApiError(res)
        }
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdate = async () => {
    if (isSubmitting || !editId) return
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const formData = await buildFormData()

      if (currentUser?.role === "club") {
        const res: any = await updateProgram({
          program_id: editId,
          data: formData,
        })

        console.log("updateProgram response club:", res)

        if (res?.success || res?.status === true) {
          onSuccess("Program updated successfully!")

          window.dispatchEvent(new CustomEvent("programevent"))
          close("add-new", ["program"])
        } else {
          handleApiError(res)
        }
      }

      if (currentUser?.role === "coach") {
        const res: any = await updateCoachProgram({
          program_id: editId,
          data: formData,
        })

        console.log("updateCoachProgram response coach:", res)

        if (res?.success || res?.status === true) {
          onSuccess("Program updated successfully!")

          window.dispatchEvent(new CustomEvent("programevent"))
          close("add-new", ["program"])
        } else {
          handleApiError(res)
        }
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsSubmitting(false)
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

          <div className="col-span-full">
            <ToggleSwitch
              label="Is this a free program?"
              checked={form.isFree}
              onChange={(v) =>
                setForm((p) => ({
                  ...p,
                  isFree: v,
                  price: v ? "0" : p.price,
                }))
              }
            />
          </div>

          {/* Program Price */}
          {!form.isFree && (
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
          )}

          {/* Discount Price */}
          {!form.isFree && (
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
          )}

          {/* Single day toggle */}
          <div className="col-span-full">
            <ToggleSwitch
              label="Runs on a single day"
              checked={form.isSingleDay}
              onChange={toggleSingleDay}
            />
          </div>

          {/* Program Start */}
          <div className="flex flex-col">
            <p className="text-sm">
              {form.isSingleDay ? "Program Date" : "Program Start"}{" "}
              <span className="ml-1 text-brand!">(Optional)</span>
            </p>
            <Input
              name="start"
              value={form.start}
              onChange={(e) => setStartDate(e.target.value)}
              className={`mt-1 ${fieldCls}`}
              type="date"
            />
          </div>

          {/* Program End */}
          {!form.isSingleDay && (
            <div className="flex flex-col">
              <p className="text-sm">
                Program End <span className="ml-1 text-brand!">(Optional)</span>
              </p>
              <Input
                name="end"
                value={form.end}
                onChange={handleChange}
                min={form.start || undefined}
                className={`mt-1 ${fieldCls}`}
                type="date"
              />
            </div>
          )}

          {/* ── Program Times ── */}
          <div className="col-span-full flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm">Program Times</p>
              <div className="flex flex-wrap items-center gap-2">
                <CommonBtn
                  text={confirmClear ? "Click again to clear" : "Clear dates"}
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    confirmClear ? clearAllSlots() : setConfirmClear(true)
                  }
                  className={`w-fit px-3 ${
                    confirmClear
                      ? "border border-red-500! text-red-400 hover:bg-red-600 hover:text-white"
                      : "border border-secondary! hover:border-brand hover:bg-brand hover:text-primary"
                  }`}
                />
                <CommonBtn
                  text="Fill dates from program range"
                  size="sm"
                  variant="outline"
                  onClick={generateSlotsFromRange}
                  className="w-fit px-3 hover:border-brand hover:bg-brand hover:text-primary"
                />
              </div>
            </div>
            <p className="text-[10px] font-thin text-secondary!">
              Adds one date slot for every day between the start and end date.
              Dates already filled in keep their times.
            </p>

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
                      min={form.start || undefined}
                      max={
                        (form.isSingleDay ? form.start : form.end) || undefined
                      }
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
                  <div className="mt-3 flex flex-wrap items-center gap-2">
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

                    {form.timeSlots.length > 1 && (
                      <CommonBtn
                        text="Copy times to all dates"
                        size="sm"
                        variant="ghost"
                        onClick={() => copyTimesToAllSlots(si)}
                        className="w-fit border border-secondary! px-3 hover:border-brand hover:bg-brand hover:text-primary"
                      />
                    )}

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

export default GroupProgram

// ─── Toggle Switch Component ─────────────────────────────────────────────
function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3">
      <span className="text-sm text-white">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
          checked ? "bg-brand" : "bg-neutral-600"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-0" : "-translate-x-5"
          }`}
        />
      </button>
    </div>
  )
}

// "use client"
// import React, { useEffect, useState } from "react"
// import { Input } from "../ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select"
// import { Textarea } from "../ui/textarea"
// import CommonBtn from "@/components/common/common-btn"
// import UploadPhoto from "@/components/common/upload-photo"
// import Image from "next/image"
// import {
//   createProgram,
//   getProgramDetails,
//   updateProgram,
// } from "@/app/(dashboards)/club/action"
// import { toast } from "sonner"
// import { getSportOptions } from "@/app/(dashboards)/action"
// import useModal from "./modal/useModal"
// import { getHighestNumber, getLowestNumber } from "@/lib/get-highest-number"
// import {
//   addCoachProgram,
//   updateCoachProgram,
// } from "@/app/(dashboards)/coach/my-programs/action"

// // ─── Types ────────────────────────────────────────────────────────────────────

// type TSportOption = {
//   id: number
//   name: string
//   audience: string
//   status: string
// }

// // Internal AM/PM representation
// type TTimeParts = { hour: string; minute: string; period: "AM" | "PM" }

// // Each time range stores TTimeParts for start and end
// type TTimeRange = { start: TTimeParts; end: TTimeParts }

// // ─── Time helpers ─────────────────────────────────────────────────────────────

// const defaultTimeParts: TTimeParts = { hour: "12", minute: "00", period: "AM" }

// /**
//  * "HH:mm" (24-hr from server) → TTimeParts
//  */
// function from24(time?: string | null): TTimeParts {
//   if (!time) {
//     return {
//       hour: "12",
//       minute: "00",
//       period: "AM",
//     }
//   }

//   const value = time.trim().toUpperCase()

//   // 02:00 AM
//   const ampmMatch = value.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)$/)

//   if (ampmMatch) {
//     return {
//       hour: String(Number(ampmMatch[1])),
//       minute: ampmMatch[2],
//       period: ampmMatch[3] as "AM" | "PM",
//     }
//   }

//   // 14:00
//   const twentyFourMatch = value.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/)

//   if (twentyFourMatch) {
//     const h24 = Number(twentyFourMatch[1])

//     let h12 = h24 % 12

//     if (h12 === 0) h12 = 12

//     return {
//       hour: String(h12),
//       minute: twentyFourMatch[2],
//       period: h24 >= 12 ? "PM" : "AM",
//     }
//   }

//   return {
//     hour: "12",
//     minute: "00",
//     period: "AM",
//   }
// }

// /**
//  * TTimeParts → "02:00 AM" for the API
//  */

// function toAmPmString({ hour, minute, period }: TTimeParts): string {
//   return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")} ${period}`
// }

// /**
//  * Add `durationMins` to a TTimeParts and return a new TTimeParts.
//  * Wraps around 12-hr clock correctly.
//  */
// function addMinutes(base: TTimeParts, durationMins: number): TTimeParts {
//   let totalMins =
//     (parseInt(base.hour, 10) % 12) * 60 +
//     parseInt(base.minute, 10) +
//     (base.period === "PM" ? 12 * 60 : 0) +
//     durationMins

//   totalMins = totalMins % (24 * 60) // keep within 24 hrs
//   const h24 = Math.floor(totalMins / 60)
//   const m = totalMins % 60
//   const period: "AM" | "PM" = h24 >= 12 ? "PM" : "AM"
//   let h12 = h24 % 12
//   if (h12 === 0) h12 = 12
//   return {
//     hour: String(h12),
//     minute: String(m).padStart(2, "0"),
//     period,
//   }
// }

// const emptyTimeRange = (): TTimeRange => ({
//   start: { ...defaultTimeParts },
//   end: { ...defaultTimeParts },
// })

// // ─── AM/PM Time Picker Component ─────────────────────────────────────────────

// function AmPmTimePicker({
//   label,
//   value,
//   onChange,
// }: {
//   label: string
//   value: TTimeParts
//   onChange: (v: TTimeParts) => void
// }) {
//   const hours = Array.from({ length: 12 }, (_, i) => String(i + 1))

//   const minutes = [
//     "00",
//     "05",
//     "10",
//     "15",
//     "20",
//     "25",
//     "30",
//     "35",
//     "40",
//     "45",
//     "50",
//     "55",
//   ]

//   const selectCls =
//     "border-neutral-700 bg-neutral-800 text-white h-9 px-2 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-brand"

//   return (
//     <div className="flex flex-col gap-1">
//       {label && <span className="text-xs text-neutral-400">{label}</span>}
//       <div className="flex items-center gap-1">
//         {/* Hour */}
//         <select
//           value={value.hour}
//           onChange={(e) => onChange({ ...value, hour: e.target.value })}
//           className={selectCls}
//           style={{ minWidth: 50 }}
//         >
//           {hours.map((h) => (
//             <option key={h} value={h} className="bg-neutral-800">
//               {h.padStart(2, "0")}
//             </option>
//           ))}
//         </select>

//         <span className="text-sm font-bold text-neutral-400">:</span>

//         {/* Minute */}
//         <select
//           value={value.minute}
//           onChange={(e) => onChange({ ...value, minute: e.target.value })}
//           className={selectCls}
//           style={{ minWidth: 50 }}
//         >
//           {minutes.map((m) => (
//             <option key={m} value={m} className="bg-neutral-800">
//               {m}
//             </option>
//           ))}
//         </select>

//         {/* AM / PM toggle */}
//         <div className="flex shrink-0 overflow-hidden rounded-md border border-neutral-700">
//           {(["AM", "PM"] as const).map((p) => (
//             <button
//               key={p}
//               type="button"
//               onClick={() => onChange({ ...value, period: p })}
//               className={`h-9 px-2.5 text-xs font-medium transition-colors ${
//                 value.period === p
//                   ? "bg-brand text-black"
//                   : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
//               }`}
//             >
//               {p}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// // ─── Initial form state ───────────────────────────────────────────────────────

// const initialForm = {
//   sport: "",
//   name: "",
//   ageGroup: "",
//   price: "",
//   discountPrice: "",
//   location: "",
//   start: "",
//   end: "",
//   times: [emptyTimeRange()] as TTimeRange[],
//   about: "",
//   goals: [""],
//   photo: null as string | null,
//   type: "group",
//   sportOptionId: "",
//   isFree: false,
//   isSingleDay: false,
// }

// const fieldCls =
//   "border-neutral-700 bg-neutral-800 py-5 placeholder:text-neutral-300 placeholder:opacity-100"
// const selectClsBase =
//   "mt-1 w-full border-neutral-700 bg-neutral-800 py-5 text-white data-[placeholder]:text-neutral-300"

// // ─── Main Component ───────────────────────────────────────────────────────────

// const GroupProgram: React.FC<{
//   setProgramType: (type: "group" | "one-on-one") => void
// }> = ({ setProgramType }) => {
//   const { close } = useModal()
//   const currentUser =
//     typeof window !== "undefined" && localStorage.getItem("go_elite_user")
//       ? JSON.parse(localStorage.getItem("go_elite_user") || "{}")
//       : null

//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [sportOptions, setSportOptions] = useState<TSportOption[]>([])
//   const [form, setForm] = useState(initialForm)

//   // Duration input (in minutes) used to auto-fill the next time range
//   const [duration, setDuration] = useState("")

//   const set = (name: string, value: string) =>
//     setForm((p) => ({ ...p, [name]: value }))

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => set(e.target.name, e.target.value)

//   // ─── Date range handlers ──────────────────────────────────────────────────────

//   // Single-day program: one date is used as both start and end
//   const toggleSingleDay = (v: boolean) =>
//     setForm((p) => ({
//       ...p,
//       isSingleDay: v,
//       end: v ? p.start : p.end,
//     }))

//   const setStartDate = (value: string) =>
//     setForm((p) => ({
//       ...p,
//       start: value,
//       end: p.isSingleDay ? value : p.end,
//     }))

//   // ─── Goal handlers ───────────────────────────────────────────────────────────

//   const handleGoalChange = (idx: number, value: string) =>
//     setForm((p) => {
//       const goals = [...p.goals]
//       goals[idx] = value
//       return { ...p, goals }
//     })
//   const addGoal = () => setForm((p) => ({ ...p, goals: [...p.goals, ""] }))
//   const removeGoal = (idx: number) =>
//     setForm((p) => ({ ...p, goals: p.goals.filter((_, i) => i !== idx) }))

//   // ─── Time range handlers ───────────────────────────────────────────────────────

//   const addTimeRange = () => {
//     setForm((p) => {
//       const durationMins = parseInt(duration || "0", 10)

//       let newRange: TTimeRange

//       if (durationMins > 0 && p.times.length > 0) {
//         const lastEnd = p.times[p.times.length - 1].end
//         newRange = { start: lastEnd, end: addMinutes(lastEnd, durationMins) }
//       } else {
//         newRange = emptyTimeRange()
//       }

//       return { ...p, times: [...p.times, newRange] }
//     })
//   }

//   const removeTimeRange = (ti: number) =>
//     setForm((p) => ({
//       ...p,
//       times: p.times.filter((_, i) => i !== ti),
//     }))

//   const setTimeRangePart = (
//     ti: number,
//     field: "start" | "end",
//     value: TTimeParts
//   ) =>
//     setForm((p) => {
//       const times = [...p.times]
//       times[ti] = { ...times[ti], [field]: value }
//       return { ...p, times }
//     })

//   // ─── Load sport options ───────────────────────────────────────────────────────

//   useEffect(() => {
//     getSportOptions()
//       .then((res: any) => {
//         if (res?.success && res?.data?.data) setSportOptions(res.data.data)
//       })
//       .catch(console.error)
//   }, [])

//   // ─── Load program for editing ─────────────────────────────────────────────────

//   const editId =
//     typeof window !== "undefined"
//       ? localStorage.getItem("edit_program_id")
//       : null

//   useEffect(() => {
//     if (!editId) return
//     getProgramDetails(String(editId))
//       .then((res: any) => {
//         const p = res?.data?.data

//         if (!p) {
//           toast.error("Failed to load program data")
//           return
//         }
//         setProgramType(p.program_type)

//         const times: TTimeRange[] = p?.times?.length
//           ? p.times.map((t: any) => ({
//               start: from24(t.start_time),
//               end: from24(t.end_time),
//             }))
//           : [emptyTimeRange()]

//         setForm({
//           sport: p.sport || "",
//           name: p.program_name || "",
//           ageGroup: p.age_limit ? String(p.age_limit) : "",
//           price: p.price ? String(p.price) : "",
//           discountPrice: p.discount_price ? String(p.discount_price) : "",
//           location: p.location || "",
//           start: p.start_date || "",
//           end: p.end_date || "",
//           about: p.about || "",
//           goals: p.goals?.length
//             ? p.goals.map((g: { goal: string }) => g.goal)
//             : [""],
//           photo: p.photo || null,
//           type: "group",
//           sportOptionId: p.sport_option ? String(p.sport_option.id) : "",
//           times,
//           isFree: p.is_free === true || p.is_free === "1" || p.is_free === 1,
//           isSingleDay: Boolean(
//             p.start_date && p.end_date && p.start_date === p.end_date
//           ),
//         })
//       })
//       .catch(console.error)
//   }, [editId])

//   // ─── Build FormData ───────────────────────────────────────────────────────────

//   const buildFormData = async () => {
//     const formData = new FormData()

//     const endDate = form.isSingleDay ? form.start : form.end

//     const fields: Record<string, string> = {
//       sport: form.sport,
//       program_type: "group",
//       program_name: form.name,
//       program_price: form.isFree ? "0" : form.price || "0",
//       program_location: form.location,
//       program_start: form.start,
//       program_end: endDate,
//       about_program: form.about,
//       discount_price: form.isFree ? "0" : form.discountPrice || "0",
//       upto_age: String(getHighestNumber(form.ageGroup)),
//       from_age: String(getLowestNumber(form.ageGroup)),
//       sport_option_id: form.sportOptionId,
//       is_free: form.isFree ? "1" : "0",
//     }

//     Object.entries(fields).forEach(([k, v]) => formData.append(k, v))

//     let idx = 0
//     form.times.forEach((t) => {
//       const startStr = toAmPmString(t.start)
//       const endStr = toAmPmString(t.end)
//       if (!startStr || !endStr) return
//       formData.append(`program_times[${idx}][slot_date]`, form.start)
//       formData.append(`program_times[${idx}][start_time]`, startStr)
//       formData.append(`program_times[${idx}][end_time]`, endStr)
//       idx++
//     })

//     form.goals
//       .filter((g) => g.trim())
//       .forEach((g, i) => formData.append(`goals[${i}]`, g))

//     if (form.photo?.startsWith("data:")) {
//       const blob = await (await fetch(form.photo)).blob()
//       const ext = blob.type.split("/")[1]?.toLowerCase() || "jpg"
//       formData.append(
//         "program_photo",
//         new File([blob], `program-photo.${ext}`, { type: blob.type })
//       )
//     }

//     return formData
//   }

//   // ─── Validation ───────────────────────────────────────────────────────────────

//   const validateForm = () => {
//     if (!form.photo) {
//       toast.error("Please upload a program image")
//       return false
//     }
//     if (!form.sport) {
//       toast.error("Please select a sport")
//       return false
//     }
//     if (!form.name?.trim()) {
//       toast.error("Please enter a program name")
//       return false
//     }
//     if (
//       !form.isFree &&
//       (form.price === "" ||
//         form.price === null ||
//         form.price === undefined ||
//         Number(form.price) < 0)
//     ) {
//       toast.error("Please enter a valid program price")
//       return false
//     }
//     if (!form.isSingleDay && form.start && form.end && form.start > form.end) {
//       toast.error("Program end date must be on or after the start date")
//       return false
//     }

//     const hasValidTime = form.times.some(
//       (t) => toAmPmString(t.start) && toAmPmString(t.end)
//     )
//     if (!hasValidTime) {
//       toast.error(
//         "Please add at least one valid time range with start and end time"
//       )
//       return false
//     }
//     return true
//   }

//   // ─── Submit handlers ──────────────────────────────────────────────────────────

//   const onSuccess = (message: string) => {
//     toast.success(message)
//     window.dispatchEvent(new Event("programevent"))
//     close("add-new", ["program"])
//     close("editID")
//   }

// const handleApiError = (error: any) => {
//   console.log("API ERROR:", error)

//   // API response
//   const data = error?.data || error

//   // Validation errors
//   if (data?.errors && typeof data.errors === "object") {
//     const firstField = Object.keys(data.errors)[0]

//     if (firstField) {
//       const messages = data.errors[firstField]

//       if (Array.isArray(messages) && messages.length > 0) {
//         toast.error(messages[0])
//         return
//       }

//       if (typeof messages === "string") {
//         toast.error(messages)
//         return
//       }
//     }
//   }

//   // Normal API message
//   if (data?.message) {
//     toast.error(data.message)
//     return
//   }

//   // Fallback
//   toast.error("Failed to create program.")
// }

// const handleAdd = async () => {
//   if (isSubmitting) return
//   if (!validateForm()) return

//   setIsSubmitting(true)

//   try {
//     const formData = await buildFormData()

//     if (currentUser?.role === "club") {
//       const res: any = await createProgram(formData)

//       console.log("createProgram response club:", res)

//       if (res?.success || res?.status === true) {
//         onSuccess("Program created successfully!")
//         close("add-new", ["program"])
//       } else {
//         handleApiError(res)
//       }
//     }

//     if (currentUser?.role === "coach") {
//       const res: any = await addCoachProgram(formData)

//       console.log("addCoachProgram response coach:", res)

//       if (res?.success || res?.status === true) {
//         onSuccess("Program created successfully!")
//         close("add-new", ["program"])
//       } else {
//         handleApiError(res)
//       }
//     }
//   } catch (error) {
//     handleApiError(error)
//   } finally {
//     setIsSubmitting(false)
//   }
// }

// const handleUpdate = async () => {
//   if (isSubmitting || !editId) return
//   if (!validateForm()) return

//   setIsSubmitting(true)

//   try {
//     const formData = await buildFormData()

//     if (currentUser?.role === "club") {
//       const res: any = await updateProgram({
//         program_id: editId,
//         data: formData,
//       })

//       console.log("updateProgram response club:", res)

//       if (res?.success || res?.status === true) {
//         onSuccess("Program updated successfully!")

//         window.dispatchEvent(new CustomEvent("programevent"))
//         close("add-new", ["program"])
//       } else {
//         handleApiError(res)
//       }
//     }

//     if (currentUser?.role === "coach") {
//       const res: any = await updateCoachProgram({
//         program_id: editId,
//         data: formData,
//       })

//       console.log("updateCoachProgram response coach:", res)

//       if (res?.success || res?.status === true) {
//         onSuccess("Program updated successfully!")

//         window.dispatchEvent(new CustomEvent("programevent"))
//         close("add-new", ["program"])
//       } else {
//         handleApiError(res)
//       }
//     }
//   } catch (error) {
//     handleApiError(error)
//   } finally {
//     setIsSubmitting(false)
//   }
// }

//   // ─── Render ───────────────────────────────────────────────────────────────────

//   return (
//     <div className="mx-auto w-full p-0">
//       <div className="flex flex-col gap-4 rounded-2xl bg-neutral-900 p-8 text-white">
//         {/* Photo Upload */}
//         <div className="mb-2">
//           <UploadPhoto
//             onFileSelect={(file) => {
//               const reader = new FileReader()
//               reader.onload = () =>
//                 setForm((p) => ({ ...p, photo: reader.result as string }))
//               reader.readAsDataURL(file)
//             }}
//             title="UPLOAD PHOTO"
//             subtitle="JPG or PNG, max 5MB. Headshots preferred."
//           />
//           {form.photo && (
//             <div className="mt-2 flex items-center gap-2">
//               <Image
//                 src={form.photo}
//                 alt="Uploaded Preview"
//                 width={80}
//                 height={80}
//                 unoptimized
//                 className="h-20 w-20 rounded border border-neutral-700 object-cover"
//               />
//               <button
//                 type="button"
//                 aria-label="Remove uploaded photo"
//                 className="ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 bg-black/60 text-lg text-white hover:bg-red-600"
//                 onClick={() => setForm((p) => ({ ...p, photo: null }))}
//               >
//                 ×
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           {/* Sport Selection */}
//           <div className="flex flex-col">
//             <span className="text-sm">Sport Selection</span>
//             <Select
//               value={form.sport}
//               onValueChange={(v) => {
//                 set("sport", v)
//                 const s = sportOptions.find((s) => s.name === v)
//                 if (s) set("sportOptionId", String(s.id))
//               }}
//             >
//               <SelectTrigger className={selectClsBase}>
//                 <SelectValue placeholder="Select Sport" />
//               </SelectTrigger>
//               <SelectContent position="popper">
//                 {sportOptions.map((s) => (
//                   <SelectItem
//                     key={s.id}
//                     value={s.name}
//                     className="hover:bg-brand!"
//                   >
//                     {s.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Program Name */}
//           <div className="flex flex-col">
//             <span className="text-sm">Program Name</span>
//             <Input
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Program Name"
//               className={`mt-1 ${fieldCls}`}
//             />
//           </div>

//           {/* Age Group */}
//           <div className="flex flex-col">
//             <span className="text-sm">Age Group</span>
//             <Input
//               placeholder="e.g U14 or U16-U20"
//               value={form.ageGroup}
//               onChange={(e) => set("ageGroup", e.target.value)}
//               className={`mt-1 ${fieldCls}`}
//             />
//           </div>

//           {/* Program Location */}
//           <div className="flex flex-col">
//             <p className="text-sm">Program Location</p>
//             <Input
//               name="location"
//               value={form.location}
//               onChange={handleChange}
//               placeholder="Program Location"
//               className={fieldCls}
//             />
//           </div>

//           <div className="col-span-full">
//             <ToggleSwitch
//               label="Is this a free program?"
//               checked={form.isFree}
//               onChange={(v) =>
//                 setForm((p) => ({
//                   ...p,
//                   isFree: v,
//                   price: v ? "0" : p.price,
//                 }))
//               }
//             />
//           </div>

//           {/* Program Price */}
//           {!form.isFree && (
//             <div className="flex flex-col">
//               <span className="text-sm">Program Price ($)</span>
//               <Input
//                 name="price"
//                 value={form.price}
//                 onChange={handleChange}
//                 placeholder="Program Price ($)"
//                 className={`mt-1 ${fieldCls}`}
//                 type="number"
//               />
//             </div>
//           )}

//           {/* Discount Price */}
//           {!form.isFree && (
//             <div className="flex flex-col">
//               <p className="text-sm">
//                 Discount Price{" "}
//                 <span className="ml-1 text-brand!">(Optional)</span>
//               </p>
//               <Input
//                 name="discountPrice"
//                 value={form.discountPrice}
//                 onChange={handleChange}
//                 placeholder="Program Discount Price ($)"
//                 className={fieldCls}
//                 type="number"
//               />
//             </div>
//           )}

//           {/* Single day toggle */}
//           <div className="col-span-full">
//             <ToggleSwitch
//               label="Runs on a single day"
//               checked={form.isSingleDay}
//               onChange={toggleSingleDay}
//             />
//           </div>

//           {/* Program Start */}
//           <div className="flex flex-col">
//             <p className="text-sm">
//               {form.isSingleDay ? "Program Date" : "Program Start"}{" "}
//               <span className="ml-1 text-brand!">(Optional)</span>
//             </p>
//             <Input
//               name="start"
//               value={form.start}
//               onChange={(e) => setStartDate(e.target.value)}
//               className={`mt-1 ${fieldCls}`}
//               type="date"
//             />
//           </div>

//           {/* Program End */}
//           {!form.isSingleDay && (
//             <div className="flex flex-col">
//               <p className="text-sm">
//                 Program End <span className="ml-1 text-brand!">(Optional)</span>
//               </p>
//               <Input
//                 name="end"
//                 value={form.end}
//                 onChange={handleChange}
//                 min={form.start || undefined}
//                 className={`mt-1 ${fieldCls}`}
//                 type="date"
//               />
//             </div>
//           )}

//           {/* ── Program Times ── */}
//           <div className="col-span-full flex flex-col gap-2">
//             <p className="text-sm">Program Times</p>

//             <div className="rounded-lg border border-neutral-700 bg-neutral-800 p-3">
//               {/* ── Time range rows ── */}
//               <div className="flex flex-col gap-3 pl-1">
//                 {form.times.map((t, ti) => (
//                   <div
//                     key={ti}
//                     className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2"
//                   >
//                     <AmPmTimePicker
//                       label="Start"
//                       value={t.start}
//                       onChange={(v) => setTimeRangePart(ti, "start", v)}
//                     />
//                     <AmPmTimePicker
//                       label="End"
//                       value={t.end}
//                       onChange={(v) => setTimeRangePart(ti, "end", v)}
//                     />
//                     {/* API preview */}
//                     <div className="flex gap-1">
//                       <span className="self-end pb-1 text-[10px] text-neutral-500">
//                         {toAmPmString(t.start)}–{toAmPmString(t.end)}
//                       </span>
//                       {form.times.length > 1 && (
//                         <CommonBtn
//                           text="✕"
//                           size="sm"
//                           variant="ghost"
//                           onClick={() => removeTimeRange(ti)}
//                           className="cursor-pointer self-end border border-secondary! hover:border-brand hover:bg-brand hover:text-primary"
//                         />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* ── Duration + Add Time Range ── */}
//               <div className="mt-3 flex flex-wrap items-center gap-2">
//                 {/* Duration input */}
//                 <div className="flex h-9 items-center gap-1.5 rounded-md border border-neutral-700 bg-neutral-900 px-3">
//                   <span className="text-xs whitespace-nowrap text-neutral-400">
//                     Duration
//                   </span>
//                   <input
//                     type="number"
//                     min="1"
//                     placeholder="60"
//                     value={duration}
//                     onChange={(e) => setDuration(e.target.value)}
//                     className="w-14 bg-transparent text-sm text-white outline-none placeholder:text-neutral-600"
//                   />
//                   <span className="text-xs text-neutral-500">min</span>
//                 </div>

//                 <CommonBtn
//                   text="+ Add Time Range"
//                   size="sm"
//                   variant="outline"
//                   onClick={addTimeRange}
//                   className="ml-auto w-fit px-3 hover:border-brand hover:bg-brand hover:text-primary"
//                 />
//               </div>

//               {/* Duration hint */}
//               {duration && parseInt(duration, 10) > 0 && (
//                 <p className="mt-1.5 pl-1 text-[10px] font-thin text-secondary!">
//                   Each new slot will be{" "}
//                   <span className="text-brand">{duration} min</span> after
//                   the previous end time.
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* About */}
//         <Textarea
//           name="about"
//           value={form.about}
//           onChange={handleChange}
//           placeholder="About This Program"
//           className="mt-2 border-neutral-700 bg-neutral-800 placeholder:text-neutral-300 placeholder:opacity-100"
//         />

//         {/* Goals */}
//         <div className="mt-2 rounded-lg border border-dashed border-neutral-700 p-3">
//           <div className="flex flex-col gap-2">
//             {form.goals.map((goal, idx) => (
//               <div key={idx} className="flex items-center gap-2">
//                 <Input
//                   value={goal}
//                   onChange={(e) => handleGoalChange(idx, e.target.value)}
//                   placeholder={`Goal ${idx + 1}`}
//                   className={`mx-auto w-97/100 ${fieldCls}`}
//                 />
//                 {form.goals.length > 1 && (
//                   <CommonBtn
//                     text="✕"
//                     size="sm"
//                     variant="ghost"
//                     onClick={() => removeGoal(idx)}
//                     className="hover:border-brand hover:bg-brand hover:text-primary"
//                   />
//                 )}
//               </div>
//             ))}
//             <CommonBtn
//               text="+ Add Goals"
//               size="sm"
//               variant="outline"
//               onClick={addGoal}
//               className="mx-auto mt-2 w-97/100 py-5! hover:border-brand hover:bg-brand hover:text-primary"
//             />
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="mt-6 mr-4 flex justify-end gap-4">
//           <CommonBtn
//             text="Cancel"
//             size="lg"
//             variant="outline"
//             onClick={() => {
//               localStorage.removeItem("edit_program_id")
//               close("add-new", ["program"])
//             }}
//             className="w-fit px-10 hover:border-brand hover:bg-brand hover:text-primary"
//           />
//           <CommonBtn
//             text={
//               isSubmitting
//                 ? "Saving..."
//                 : editId
//                   ? "Update Program"
//                   : "Save Program"
//             }
//             size="lg"
//             variant="default"
//             className="w-fit bg-brand px-10 text-black hover:border hover:bg-transparent hover:text-white"
//             onClick={editId ? handleUpdate : handleAdd}
//             disabled={isSubmitting}
//             isLoading={isSubmitting}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GroupProgram

// // ─── Toggle Switch Component ─────────────────────────────────────────────
// function ToggleSwitch({
//   checked,
//   onChange,
//   label,
// }: {
//   checked: boolean
//   onChange: (v: boolean) => void
//   label: string
// }) {
//   return (
//     <div className="flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3">
//       <span className="text-sm text-white">{label}</span>
//       <button
//         type="button"
//         role="switch"
//         aria-checked={checked}
//         onClick={() => onChange(!checked)}
//         className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
//           checked ? "bg-brand" : "bg-neutral-600"
//         }`}
//       >
//         <span
//           className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
//             checked ? "translate-x-0" : "-translate-x-5"
//           }`}
//         />
//       </button>
//     </div>
//   )
// }
