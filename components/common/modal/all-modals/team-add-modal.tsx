import React, { useEffect, useState } from "react"
import Image from "next/image"
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
import { handleLogout } from "@/lib/helpers"

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
    gender: "",
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
      formData.append("gender", form.gender)

      if (form.photo) {
        formData.append("image", form.photo)
      }

      const res = await createTeam(formData)

      if (
        typeof res === "object" &&
        res !== null &&
        "success" in res &&
        res.success
      ) {
        toast.success("Team created successfully")
        window.dispatchEvent(new Event("refetch:teams"))
        close("add-new", ["team"])
        router.push("/club/teams")
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

      // Check for authentication errors
      const isUnauthorized =
        (typeof res === "object" &&
          res !== null &&
          "status" in res &&
          (res.status === 401 || res.status === 403)) ||
        message.toLowerCase().includes("unauthorized") ||
        message.toLowerCase().includes("unauthenticated")

      if (isUnauthorized) {
        toast.error("Session expired. Please log in again.")
        handleLogout(router)
        return
      }

      toast.error(message)
    } catch (err) {
      console.error("Error creating team:", err)
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to create team. Please try again."

      // Check if error message indicates authentication issue
      if (
        errorMessage.toLowerCase().includes("unauthorized") ||
        errorMessage.toLowerCase().includes("unauthenticated") ||
        errorMessage.toLowerCase().includes("token")
      ) {
        toast.error("Session expired. Please log in again.")
        handleLogout(router)
        return
      }

      toast.error(errorMessage)
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
            <div className="mt-4 space-y-2">
              <span className="block text-xs text-white/70">
                Selected: {form.photo.name}
              </span>
              <div className="relative h-32 w-32 rounded-lg border border-white/20 bg-white/5 p-2">
                <Image
                  src={URL.createObjectURL(form.photo)}
                  alt="Team preview"
                  fill
                  className="rounded object-cover"
                />
              </div>
            </div>
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
            className="border-neutral-700 bg-neutral-800 py-5 placeholder:font-medium placeholder:text-white/60 focus:placeholder:text-white/40"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <span className="text-sm">Age Group</span>
            <Select
              value={form.ageGroup}
              onValueChange={(v) => handleSelect("ageGroup", v)}
            >
              <SelectTrigger className="mt-1 w-full border-neutral-700 bg-neutral-800 py-5 text-white/60 [&>span]:font-medium [&>span]:text-white/60">
                <SelectValue placeholder="Select Age Group" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="8" className="hover:bg-brand!">
                  U03 - U08
                </SelectItem>
                <SelectItem value="12" className="hover:bg-brand!">
                  U09 - U12
                </SelectItem>
                <SelectItem value="17" className="hover:bg-brand!">
                  U13 - U17
                </SelectItem>
                <SelectItem value="21" className="hover:bg-brand!">
                  U18 - U21
                </SelectItem>
                <SelectItem value="30" className="hover:bg-brand!">
                  U21 - U30
                </SelectItem>
                <SelectItem value="200" className="hover:bg-brand!">
                  30+
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
              <SelectTrigger className="mt-1 w-full border-neutral-700 bg-neutral-800 py-5 text-white/60 [&>span]:font-medium [&>span]:text-white/60">
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
        <div>
          <span className="text-sm">Gender </span>
          <Select
            value={form.gender}
            onValueChange={(v) => handleSelect("gender", v)}
          >
            <SelectTrigger className="mt-1 w-full border-neutral-700 bg-neutral-800 py-5 text-white/60 [&>span]:font-medium [&>span]:text-white/60">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="male" className="hover:bg-brand!">
                Male
              </SelectItem>
              <SelectItem value="female" className="hover:bg-brand!">
                Female
              </SelectItem>
            </SelectContent>
          </Select>
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
