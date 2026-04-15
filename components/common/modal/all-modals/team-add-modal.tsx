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
    <div className=" ">
      <div className="flex flex-col gap-4 rounded-2xl bg-neutral-900 p-8 text-white">
        <h2 className="mb-2 text-2xl font-semibold">Add New Team</h2>
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

        <div className="border-b border-dashed  ">
          <h2 className="pb-1 ">Core Identity</h2>
        </div>

        <div className="">
          <span>Team Name</span>
          <Input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e. g. Elite U16"
            className="border-neutral-700 bg-neutral-800 py-5 "
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <span className="text-sm">Age Group</span>
            <Select
              value={form.ageGroup}
              onValueChange={(v) => handleSelect("ageGroup", v)}
            >
              <SelectTrigger className="mt-1 w-full border-neutral-700 bg-neutral-800 py-5 ">
                <SelectValue placeholder="Select Age Group" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="u10" className="hover:bg-brand!">U10</SelectItem>
                <SelectItem value="u12" className="hover:bg-brand!">U12</SelectItem>
                <SelectItem value="u14" className="hover:bg-brand!">U14</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <span className="text-sm">Competition Level </span>
            <Select
              value={form.sport}
              onValueChange={(v) => handleSelect("sport", v)}
            >
              <SelectTrigger className="mt-1 w-full border-neutral-700 bg-neutral-800 py-5 ">
                <SelectValue placeholder="Select Competition Level" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="football" className="hover:bg-brand!">Football</SelectItem>
                <SelectItem value="basketball" className="hover:bg-brand!">Basketball</SelectItem>
                <SelectItem value="tennis" className="hover:bg-brand!">Tennis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
 
        <div className="mt-6 flex justify-end mr-2  gap-4">
          <CommonBtn
            text="Cancel"
            size="lg"
            variant="outline"
            className="w-fit px-10 hover:border-brand hover:text-white "
            onClick={() => {}}
          />
          <CommonBtn
            text="Save Program"
            size="lg"
            variant="default"
            className="w-fit px-10 bg-brand text-black hover:bg-brand"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
