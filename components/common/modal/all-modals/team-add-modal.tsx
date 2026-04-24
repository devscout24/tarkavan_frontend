import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CommonBtn from "@/components/common/common-btn"
import UploadPhoto from "@/components/common/upload-photo"
import { createTeam } from "@/app/(dashboards)/club/action"
import { getCompetitionLabel } from "@/app/(dashboards)/action"
import { toast } from "sonner"
import useModal from "../useModal"
import { useRouter } from "next/navigation"

export default function TeamAddModal() {
  const { close } = useModal()
  const [isSubmitting, setIsSubmitting] = useState(false)
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
  const [competitionLevels, setCompetitionLevels] = useState<
    Array<{ id: number; name: string }>
  >([])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelect = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

 
  
  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getCompetitionLabel()
        if (res && "success" in res && res.success && "data" in res) {
          setCompetitionLevels(res.data?.data || [])
        }
      } catch (err) {
        console.error("Error fetching competition levels:", err)
      }
    }
    getData()
  }, [])

  const handleCreateTeam = async () => {
    if (isSubmitting) return
    
    try {
      setIsSubmitting(true)
      
      const formData = new FormData()
      formData.append("name", form.location) // Using form.location as team name based on the input field
      formData.append("age_group", form.ageGroup)
      formData.append("competition_level_id", form.sport) // Using form.sport as competition level ID
      
      if (form.photo) {
        formData.append("image", form.photo)
      }
      
      const res = await createTeam(formData)
      
      if (typeof res === "object" && res !== null && "success" in res && res.success) {
        toast.success("Team created successfully")
        window.dispatchEvent(new Event("refetch:teams"))
        close("add-new", ["team"])
        router.refresh()  
        return
      }
      
      const fallbackMessage = "Failed to create team. Please check your inputs."
      const message = 
        typeof res === "object" && 
        res !== null && 
        "message" in res && 
        typeof res.message === "string"
          ? res.message
          : fallbackMessage
      toast.error(message)
    } catch (err) {
      console.error("Error creating team:", err)
      toast.error("Failed to create team. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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

        <div className="border-b border-dashed">
          <h2 className="pb-1">Core Identity</h2>
        </div>

        <div className="">
          <span>Team Name</span>
          <Input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e. g. Elite U16"
            className="border-neutral-700 bg-neutral-800 py-5"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
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
          <div>
            <span className="text-sm">Competition Level </span>
            <Select
              value={form.sport}
              onValueChange={(v) => handleSelect("sport", v)}
            >
              <SelectTrigger className="mt-1 w-full border-neutral-700 bg-neutral-800 py-5">
                <SelectValue placeholder="Select Competition Level" />
              </SelectTrigger>
              <SelectContent position="popper">
                {competitionLevels.map((level) => (
                  <SelectItem
                    key={level.id}
                    value={level.id.toString()}
                    className="hover:bg-brand!"
                  >
                    {level.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 mr-2 flex justify-end gap-4">
          <CommonBtn
            text="Cancel"
            size="lg"
            variant="outline"
            className="w-fit px-10 hover:border-brand hover:text-white"
            onClick={() => close("add-new", ["team"])}
          />
          <CommonBtn
            text={isSubmitting ? "Creating..." : "Create Team"}
            size="lg"
            variant="default"
            className="w-fit bg-brand px-10 text-black hover:bg-brand"
            onClick={handleCreateTeam}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  )
}
