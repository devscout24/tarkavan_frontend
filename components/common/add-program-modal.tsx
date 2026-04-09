import React, { useState } from "react"
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

interface AddProgramPageProps {
  onSave?: (data: any) => void
}

const AddProgramPage: React.FC<AddProgramPageProps> = ({ onSave }) => {
  const [form, setForm] = useState(() => {
    // Try to load photo from localStorage
    let photo = null
    const saved = localStorage.getItem("add-program-photo")
    if (saved) {
      photo = saved
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
      photo, // string (dataURL) or null
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

  const handleSave = () => {
    if (onSave) onSave(form)
    // Add navigation or notification as needed
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-0">
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
                localStorage.setItem("add-program-photo", dataUrl)
              }
              reader.readAsDataURL(file)
            }}
            title="UPLOAD PHOTO"
            subtitle="JPG or PNG, max 5MB. Headshots preferred."
          />
          {form.photo && (
            <div className="mt-2 flex items-center gap-2">
              <img
                src={form.photo}
                alt="Uploaded Preview"
                className="h-20 w-20 rounded border border-neutral-700 object-cover"
              />
              <button
                type="button"
                className="ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 bg-black/60 text-lg text-white hover:bg-red-600 hover:text-white"
                onClick={() => {
                  setForm((prev) => ({ ...prev, photo: null }))
                  localStorage.removeItem("add-program-photo")
                }}
                aria-label="Remove uploaded photo"
              >
                ×
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* First row: Sport Selection & Program Name */}
          <div className="flex flex-col">
            <span className="text-sm">Sport Selection</span>
            <Select
              value={form.sport}
              onValueChange={(v) => handleSelect("sport", v)}
            >
              <SelectTrigger className="mt-1 w-full border-neutral-700 bg-neutral-800">
                <SelectValue placeholder="Select Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
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
              className="mt-1 border-neutral-700 bg-neutral-800"
            />
          </div>
          {/* Second row: Age Group & Program Price */}
          <div className="flex flex-col">
            <span className="text-sm">Age Group</span>
            <Select
              value={form.ageGroup}
              onValueChange={(v) => handleSelect("ageGroup", v)}
            >
              <SelectTrigger className="mt-1 w-full border-neutral-700 bg-neutral-800">
                <SelectValue placeholder="Select Age Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="u10">U10</SelectItem>
                <SelectItem value="u12">U12</SelectItem>
                <SelectItem value="u14">U14</SelectItem>
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
              className="mt-1 border-neutral-700 bg-neutral-800"
              type="number"
            />
          </div>
          <Input
            name="discountPrice"
            value={form.discountPrice}
            onChange={handleChange}
            placeholder="Program Discount Price ($)"
            className="border-neutral-700 bg-neutral-800"
            type="number"
          />
          <Input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Program Location"
            className="border-neutral-700 bg-neutral-800"
          />
          <div className="flex gap-2">
            <Input
              name="start"
              value={form.start}
              onChange={handleChange}
              placeholder="Program Start (mm/dd/yyyy)"
              className="border-neutral-700 bg-neutral-800"
              type="date"
            />
            <Input
              name="end"
              value={form.end}
              onChange={handleChange}
              placeholder="Program End (mm/dd/yyyy)"
              className="border-neutral-700 bg-neutral-800"
              type="date"
            />
          </div>
          <div className="flex gap-2">
            {form.times.map((time, idx) => (
              <Input
                key={idx}
                value={time}
                onChange={(e) => handleTimeChange(idx, e.target.value)}
                placeholder="HH:MM"
                className="border-neutral-700 bg-neutral-800"
                type="time"
              />
            ))}
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
                  className="mx-auto w-97/100 border-neutral-700 bg-neutral-800"
                />
                {form.goals.length > 1 && (
                  <CommonBtn
                    text="✕"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeGoal(idx)}
                  />
                )}
              </div>
            ))}
            <CommonBtn
              text="+ Add Goals"
              size="sm"
              variant="outline"
              className="mx-auto mt-2 w-97/100"
              onClick={addGoal}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between gap-4">
          <CommonBtn
            text="Cancel"
            size="lg"
            variant="outline"
            className="w-1/2 hover:border-brand hover:bg-brand hover:text-white"
            onClick={() => {}}
          />
          <CommonBtn
            text="Save Program"
            size="lg"
            variant="default"
            className="w-1/2 bg-brand text-black hover:border hover:bg-transparent hover:text-white"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  )
}

export default AddProgramPage
