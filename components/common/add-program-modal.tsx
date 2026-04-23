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
import { createProgram } from "@/app/(dashboards)/club/action"
import { toast } from "sonner"
import { getSportOptions } from "@/app/(dashboards)/action"

interface AddProgramPageProps {
  onSave?: (data: unknown) => void
}

type TSportOption = {
  id: number
  name: string
  audience: string
  status: string
}

type TSportOptionsPayload = {
  status: boolean
  message: string
  data: TSportOption[]
}

type TSportOptionsSuccessResponse = {
  success: true
  data: TSportOptionsPayload
}

const isSportOptionsSuccessResponse = (
  value: unknown
): value is TSportOptionsSuccessResponse => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  if (!("success" in value) || !("data" in value)) {
    return false
  }

  return value.success === true
}

const AddProgramPage: React.FC<AddProgramPageProps> = ({ onSave }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sportOptions, setSportOptions] = useState<TSportOption[]>([])
  const [form, setForm] = useState(() => {
    // Try to load photo from sessionStorage (better size limits than localStorage)
    let photo = null
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("add-program-photo")
        if (saved) {
          photo = saved
        }
      } catch {
        // Ignore storage access errors
      }
    }
    return {
      sport: "",
      name: "",
      ageGroup: "",
      price: "",
      discountPrice: "",
      location: "",
      start: "",
      end: "",
      times: ["", "", ""],
      about: "",
      goals: [""],
      photo,
      type: "one_one",
    }
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelect = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Use UploadPhoto instead

  const handleTimeChange = (idx: number, value: string) => {
    setForm((prev) => {
      const times = [...prev.times]
      times[idx] = value
      return { ...prev, times }
    })
  }

  const handleGoalChange = (idx: number, value: string) => {
    setForm((prev) => {
      const goals = [...prev.goals]
      goals[idx] = value
      return { ...prev, goals }
    })
  }

  const addGoal = () => {
    setForm((prev) => ({ ...prev, goals: [...prev.goals, ""] }))
  }

  const removeGoal = (idx: number) => {
    setForm((prev) => {
      const goals = prev.goals.filter((_, i) => i !== idx)
      return { ...prev, goals }
    })
  }

  useEffect(() => {
    const getSportData = async () => {
      try {
        const res = await getSportOptions()

        if (!isSportOptionsSuccessResponse(res)) {
          return
        }

        const payload = res.data
        if (!payload.status || !Array.isArray(payload.data)) {
          return
        }

        const activeSportOptions = payload.data.filter(
          (sport) => sport.status === "active"
        )
        setSportOptions(activeSportOptions)
      } catch (err) {
        console.error("Error fetching sport data:", err)
      }
    }
    getSportData()
  }, [])

  const handleAddProgram = async () => {
    if (isSubmitting) {
      return
    }

    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append("sport", form.sport)
      formData.append("program_type", form.type)
      formData.append("program_name", form.name)
      formData.append("program_price", form.price)
      formData.append("program_location", form.location)
      formData.append("program_start", form.start)
      formData.append("program_end", form.end)
      formData.append("about_program", form.about)
      formData.append("discount_price", form.discountPrice || "0")
      formData.append("upto_age", form.ageGroup)

      // if (form.type) {
      //   formData.append("program_type", form.type)
      // }

      form.times
        .filter((time) => Boolean(time.trim()))
        .forEach((time, index) => {
          formData.append(`program_times[${index}]`, time)
        })

      form.goals
        .filter((goal) => Boolean(goal.trim()))
        .forEach((goal, index) => {
          formData.append(`goals[${index}]`, goal)
        })

      if (form.photo && form.photo.startsWith("data:")) {
        const photoResponse = await fetch(form.photo)
        const photoBlob = await photoResponse.blob()
        const extension = photoBlob.type.split("/")[1]?.toLowerCase() || "jpg"
        const file = new File([photoBlob], `program-photo.${extension}`, {
          type: photoBlob.type || "image/jpeg",
        })
        formData.append("program_photo", file)
      }

      const res = await createProgram(formData)
      console.log(res)

      if (
        typeof res === "object" &&
        res !== null &&
        "success" in res &&
        res.success
      ) {
        toast.success("Program added successfully")
        if (onSave) {
          onSave(form)
        }
        try {
          sessionStorage.removeItem("add-program-photo")
        } catch {
          // Ignore storage removal errors
        }
        return
      }

      const fallbackMessage =
        "Failed to create program. Please check your inputs."
      const message =
        typeof res === "object" &&
        res !== null &&
        "message" in res &&
        typeof res.message === "string"
          ? res.message
          : fallbackMessage
      toast.error(message)
    } catch {
      toast.error("Failed to create program. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full p-0">
      <div className="flex flex-col gap-4 rounded-2xl bg-neutral-900 p-8 text-white">
        <h2 className="mb-2 text-2xl font-semibold">Add Program</h2>

        {/* Photo Upload */}
        <div className="mb-2">
          <UploadPhoto
            onFileSelect={async (file) => {
              // Convert file to dataURL
              const reader = new FileReader()
              reader.onload = () => {
                const dataUrl = reader.result as string
                setForm((prev) => ({ ...prev, photo: dataUrl }))
                try {
                  sessionStorage.setItem("add-program-photo", dataUrl)
                } catch {
                  // If sessionStorage is full, keep in memory only
                  console.warn("sessionStorage full, keeping image in memory")
                }
              }
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
                className="ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 bg-black/60 text-lg text-white hover:bg-red-600 hover:text-white"
                onClick={() => {
                  setForm((prev) => ({ ...prev, photo: null }))
                  try {
                    sessionStorage.removeItem("add-program-photo")
                  } catch {
                    // Ignore removal errors
                  }
                }}
                aria-label="Remove uploaded photo"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm">Program Type</span>
          <Select
            value={form.type}
            onValueChange={(v) => handleSelect("type", v)}
          >
            <SelectTrigger className="mt-1 w-full border-neutral-700 bg-neutral-800 py-5">
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
          {/* First row: Sport Selection & Program Name */}
          <div className="flex flex-col">
            <span className="text-sm">Sport Selection</span>
            <Select
              value={form.sport}
              onValueChange={(v) => handleSelect("sport", v)}
            >
              <SelectTrigger className="p mt-1 w-full border-neutral-700 bg-neutral-800 py-5">
                <SelectValue placeholder="Select Sport" />
              </SelectTrigger>
              <SelectContent position="popper">
                {sportOptions.map((sport) => (
                  <SelectItem
                    key={sport.id}
                    value={String(sport.id)}
                    className="hover:bg-brand"
                  >
                    {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Program Name</span>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Program Name"
              className="mt-1 border-neutral-700 bg-neutral-800 py-5"
            />
          </div>
          {/* Second row: Age Group & Program Price */}
          <div className="flex flex-col">
            <span className="text-sm">Age Group</span>
            <Select
              value={form.ageGroup}
              onValueChange={(v) => handleSelect("ageGroup", v)}
            >
              <SelectTrigger className="mt-1 w-full border-neutral-700 bg-neutral-800 py-5">
                <SelectValue placeholder="Select Age Group" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="13" className="hover:bg-brand!">
                  U13
                </SelectItem>
                <SelectItem value="15" className="hover:bg-brand!">
                  U15
                </SelectItem>
                <SelectItem value="17" className="hover:bg-brand!">
                  U17
                </SelectItem>
                <SelectItem value="18" className="hover:bg-brand!">
                  18-plus
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Program Price ($)</span>
            <Input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Program Price ($)"
              className="mt-1 border-neutral-700 bg-neutral-800 py-5"
              type="number"
            />
          </div>
          <Input
            name="discountPrice"
            value={form.discountPrice}
            onChange={handleChange}
            placeholder="Program Discount Price ($)"
            className="border-neutral-700 bg-neutral-800 py-5"
            type="number"
          />
          <Input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Program Location"
            className="border-neutral-700 bg-neutral-800 py-5"
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm">Program Start</span>
              <Input
                name="start"
                value={form.start}
                onChange={handleChange}
                placeholder="Program Start (mm/dd/yyyy)"
                className="mt-1 border-neutral-700 bg-neutral-800 py-5"
                type="date"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm">Program End</span>
              <Input
                name="end"
                value={form.end}
                onChange={handleChange}
                placeholder="Program End (mm/dd/yyyy)"
                className="mt-1 border-neutral-700 bg-neutral-800 py-5"
                type="date"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Add Program Time</span>
            <div className="mt-1 flex gap-2">
              {form.times.map((time, idx) => (
                <Input
                  key={idx}
                  value={time}
                  onChange={(e) => handleTimeChange(idx, e.target.value)}
                  placeholder="HH:MM"
                  className="border-neutral-700 bg-neutral-800 py-5"
                  type="time"
                />
              ))}
            </div>
          </div>
        </div>

        <Textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          placeholder="About This Program"
          className="mt-2 border-neutral-700 bg-neutral-800"
        />

        <div className="mt-2 rounded-lg border border-dashed border-neutral-700 p-3">
          <div className="flex flex-col gap-2">
            {form.goals.map((goal, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={goal}
                  onChange={(e) => handleGoalChange(idx, e.target.value)}
                  placeholder={`Goal ${idx + 1}`}
                  className="mx-auto w-97/100 border-neutral-700 bg-neutral-800 py-5"
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
              className="mx-auto mt-2 w-97/100 py-5! hover:border-brand hover:bg-brand hover:text-primary"
              onClick={addGoal}
            />
          </div>
        </div>

        <div className="mt-6 mr-4 flex justify-end gap-4">
          <CommonBtn
            text="Cancel"
            size="lg"
            variant="outline"
            className="w-fit px-10 hover:border-brand hover:bg-brand hover:text-primary"
            onClick={() => {}}
          />
          <CommonBtn
            text={isSubmitting ? "Saving..." : "Save Program"}
            size="lg"
            variant="default"
            className="w-fit bg-brand px-10 text-black hover:border hover:bg-transparent hover:text-white"
            onClick={handleAddProgram}
          />
        </div>
      </div>
    </div>
  )
}

export default AddProgramPage
