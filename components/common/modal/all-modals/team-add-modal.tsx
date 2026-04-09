import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import CommonBtn from "@/components/common/common-btn"
import UploadPhoto from "@/components/common/upload-photo"

export default function TeamAddModal() {
  const [form, setForm] = useState({
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
    photo: null as File | null,
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

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, photo: e.target.files![0] }))
    }
  }

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

  return (
    <div className="mx-auto w-full max-w-3xl p-0">
      <div className="flex flex-col gap-4 rounded-2xl bg-neutral-900 p-8 text-white">
        <h2 className="mb-2 text-2xl font-semibold">Add Program</h2>
        {/* Photo Upload */}
        <div className="mb-2">
          <UploadPhoto
            onFileSelect={(file) =>
              setForm((prev) => ({ ...prev, photo: file }))
            }
            title="UPLOAD PHOTO"
            subtitle="JPG or PNG, max 5MB. Headshots preferred."
          />
          {form.photo && (
            <span className="mt-2 block text-xs text-white/70">
              {form.photo.name}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
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
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Program Name"
            className="border-neutral-700 bg-neutral-800"
          />
          <div>
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
          <Input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Program Price ($)"
            className="border-neutral-700 bg-neutral-800"
            type="number"
          />
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
                  className="border-neutral-700 bg-neutral-800"
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
              className="mt-2 w-full"
              onClick={addGoal}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between gap-4">
          <CommonBtn
            text="Cancel"
            size="lg"
            variant="outline"
            className="w-1/2"
            onClick={() => {}}
          />
          <CommonBtn
            text="Save Program"
            size="lg"
            variant="default"
            className="w-1/2 bg-lime-400 text-black hover:bg-lime-500"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
