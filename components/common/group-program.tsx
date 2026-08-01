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

type TSportOption = {
  id: number
  name: string
  audience: string
  status: string
}

type TTimeSlot = { start: string; end: string }

const initialForm = {
  sport: "",
  name: "",
  ageGroup: "",
  price: "",
  discountPrice: "",
  location: "",
  start: "",
  end: "",
  timeSlot: { start: "", end: "" } as TTimeSlot,
  about: "",
  goals: [""],
  photo: null as string | null,
  type: "group",
  sportOptionId: "",
}

const fieldCls =
  "border-neutral-700 bg-neutral-800 py-5 placeholder:text-neutral-300 placeholder:opacity-100"
const selectCls =
  "mt-1 w-full border-neutral-700 bg-neutral-800 py-5 text-white data-[placeholder]:text-neutral-300"

type TTimeParts = { hour: string; minute: string; period: "AM" | "PM" }

const defaultTimeParts: TTimeParts = { hour: "12", minute: "00", period: "AM" }

/**
 * Parse a time string that is already in AM/PM format.
 * Handles formats like:
 *   "12:00AM"  "04:00AM"  "02:00PM"  "2:30PM"
 */
function fromAmPmStr(time: string): TTimeParts {
  if (!time) return defaultTimeParts

  // Match optional leading digits, colon, minutes, then AM/PM
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return defaultTimeParts

  const hour = String(parseInt(match[1], 10)) // remove leading zero for Select value
  const minute = match[2]
  const period = match[3].toUpperCase() as "AM" | "PM"

  return { hour, minute, period }
}

/**
 * Parse a 24-hour time string ("HH:MM") into AM/PM parts.
 * Used as a fallback when the API does provide start_time / end_time.
 */
function from24(time: string): TTimeParts {
  if (!time) return defaultTimeParts
  const [hStr, mStr] = time.split(":")
  let h = parseInt(hStr, 10)
  const period: "AM" | "PM" = h >= 12 ? "PM" : "AM"
  if (h === 0) h = 12
  else if (h > 12) h -= 12
  return { hour: String(h), minute: mStr || "00", period }
}

/**
 * Resolve start/end time parts from a times array entry.
 * Priority:
 *   1. Parse the `time` field ("12:00AM-04:00AM") — most reliable
 *   2. Fall back to start_time / end_time (24-hr) if time field is absent
 */
function resolveTimeParts(
  timeEntry:
    | {
        time?: string | null
        start_time?: string | null
        end_time?: string | null
      }
    | undefined
): { start: TTimeParts; end: TTimeParts } {
  if (!timeEntry) return { start: defaultTimeParts, end: defaultTimeParts }

  // Preferred: parse the composite "time" field, e.g. "12:00AM-04:00AM"
  if (timeEntry.time) {
    const parts = timeEntry.time.split("-")
    if (parts.length === 2) {
      return {
        start: fromAmPmStr(parts[0]),
        end: fromAmPmStr(parts[1]),
      }
    }
  }

  // Fallback: use start_time / end_time (24-hr format)
  return {
    start: timeEntry.start_time
      ? from24(timeEntry.start_time)
      : defaultTimeParts,
    end: timeEntry.end_time ? from24(timeEntry.end_time) : defaultTimeParts,
  }
}

/**
 * Serialize AM/PM parts back to the format the API expects: "02:00AM"
 */
function toAmPmString(
  hour: string,
  minute: string,
  period: "AM" | "PM"
): string {
  return `${String(hour).padStart(2, "0")}:${minute}${period}`
}

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

  const triggerCls =
    "border-neutral-700 bg-neutral-800 text-white h-10 px-3 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-brand"

  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <span className="text-xs text-neutral-400">{label}</span>
      <div className="flex items-center gap-1.5">
        {/* Hour */}
        <select
          value={value.hour}
          onChange={(e) => onChange({ ...value, hour: e.target.value })}
          className={triggerCls}
          style={{ minWidth: 56 }}
        >
          {hours.map((h) => (
            <option key={h} value={h} className="bg-neutral-800">
              {h.padStart(2, "0")}
            </option>
          ))}
        </select>

        <span className="font-bold text-neutral-400">:</span>

        {/* Minute */}
        <select
          value={value.minute}
          onChange={(e) => onChange({ ...value, minute: e.target.value })}
          className={triggerCls}
          style={{ minWidth: 56 }}
        >
          {minutes.map((m) => (
            <option key={m} value={m} className="bg-neutral-800">
              {m}
            </option>
          ))}
        </select>

        {/* AM/PM */}
        <div className="flex overflow-hidden rounded-md border border-neutral-700">
          {(["AM", "PM"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onChange({ ...value, period: p })}
              className={`h-10 px-3 text-sm font-medium transition-colors ${
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

// ─── Main Component ───────────────────────────────────────────────────────────
const GroupProgram: React.FC<{
  setProgramType: (type: "group" | "one-on-one") => void
}> = ({ setProgramType }) => {
  const { close } = useModal()
  const currentUser = localStorage.getItem("go_elite_user")
    ? JSON.parse(localStorage.getItem("go_elite_user") || "{}")
    : null
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sportOptions, setSportOptions] = useState<TSportOption[]>([])
  const [form, setForm] = useState(initialForm)

  // AM/PM time parts (separate from form so we can convert cleanly)
  const [startTime, setStartTime] = useState<TTimeParts>(defaultTimeParts)
  const [endTime, setEndTime] = useState<TTimeParts>(defaultTimeParts)

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

        const firstTime = p.times?.[0]
        setProgramType(p.program_type)

        // Resolve time parts from the first slot.
        // resolveTimeParts prefers the composite `time` field ("12:00AM-04:00AM")
        // and falls back to start_time / end_time (24-hr) when available.
        const { start, end } = resolveTimeParts(firstTime)
        setStartTime(start)
        setEndTime(end)

        setForm({
          sport: p.sport || "",
          name: p.program_name || "",
          ageGroup: p.age_group || (p.age_limit ? String(p.age_limit) : ""),
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
          timeSlot: {
            start: firstTime?.start_time || "",
            end: firstTime?.end_time || "",
          },
        })
      })
      .catch(console.error)
  }, [editId])

  // ─── Build FormData ───────────────────────────────────────────────────────────
  const buildFormData = async () => {
    const formData = new FormData()

    // Format as "02:00AM" / "03:00PM" for the API
    const startAmPm = toAmPmString(
      startTime.hour,
      startTime.minute,
      startTime.period
    )
    const endAmPm = toAmPmString(endTime.hour, endTime.minute, endTime.period)

    const fields: Record<string, string> = {
      sport: form.sport,
      program_type: "group",
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

    if (startAmPm && endAmPm) {
      formData.append("program_times[0]", `${startAmPm}-${endAmPm}`)
    }

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
    if (!form.name || !form.name.trim()) {
      toast.error("Please enter a program name")
      return false
    }
    if (
      form.price === "" ||
      form.price === null ||
      form.price === undefined ||
      Number(form.price) < 0
    ) {
      toast.error("Please enter a valid program price")
      return false
    }
    if (!form.start || !form.end) {
      toast.error("Please select program start/end dates and start/end times")
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
      <div className="flex flex-col gap-4 overflow-auto rounded-2xl bg-neutral-900 p-8 text-white">
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
            <p className="text-sm">Program Start</p>
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
            <p className="text-sm">Program End</p>
            <Input
              name="end"
              value={form.end}
              onChange={handleChange}
              className={`mt-1 ${fieldCls}`}
              type="date"
            />
          </div>

          {/* ── Program Time (AM/PM) ── */}
          <div className="col-span-full flex flex-col gap-3 rounded-lg border border-secondary bg-secondary/10 p-4">
            <p className="text-sm">Program Time</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <AmPmTimePicker
                label="Start Time"
                value={startTime}
                onChange={setStartTime}
              />
              <AmPmTimePicker
                label="End Time"
                value={endTime}
                onChange={setEndTime}
              />
            </div>
            {/* Live preview of what will be sent to the API */}
            <p className="text-xs text-neutral-500">
              Sends as:{" "}
              <span className="text-neutral-300">
                {toAmPmString(
                  startTime.hour,
                  startTime.minute,
                  startTime.period
                )}
                {"-"}
                {toAmPmString(endTime.hour, endTime.minute, endTime.period)}
              </span>
            </p>
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
