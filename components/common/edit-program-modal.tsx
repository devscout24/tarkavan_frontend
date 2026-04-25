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
import { updateCoachProgram, getCoachProgramDetails } from "@/app/(dashboards)/coach/action"
import { toast } from "sonner"
import { getSportOptions } from "@/app/(dashboards)/action"
import useModal from "./modal/useModal"
import { usePathname } from "next/navigation"
import { useProgramUpdate } from "./program-update-context"

interface EditProgramPageProps {
  onSave?: (data: unknown) => void
  onProgramUpdated?: () => void
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

const EditProgramPage: React.FC<EditProgramPageProps> = ({
  onSave,
  onProgramUpdated,
}) => {
  const { close } = useModal()
  const pathname = usePathname()
  const isCoach = pathname?.includes("/coach")
  const { onProgramUpdated: contextOnProgramUpdated } = useProgramUpdate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sportOptions, setSportOptions] = useState<TSportOption[]>([])
  
  const [programId, setProgramId] = useState<number | null>(null)

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
    photo: null as string | null,
    type: "one_one",
  })

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("edit-program-data")
      if (saved) {
        const editData = JSON.parse(saved)
        if (editData?.id) {
          setProgramId(editData.id)
          
          let photo = null
          const savedPhoto = sessionStorage.getItem("edit-program-photo")
          if (savedPhoto) {
            photo = savedPhoto
          }
          
          const timesList = Array.isArray(editData?.times) && editData.times.length > 0 
            ? editData.times.map((t: any) => {
                const timeStr = String(t.time || "")
                let firstPart = timeStr.split("-")[0].trim()
                const timeRegex = /^([0-9]{1,2}):([0-9]{2})$/
                const match = firstPart.match(timeRegex)
                if (match) {
                  let hours = match[1]
                  if (hours.length === 1) hours = "0" + hours
                  firstPart = `${hours}:${match[2]}`
                }
                return firstPart
              }) 
            : ["", "", ""]
          while (timesList.length < 3) timesList.push("")
      
          const goalsList = Array.isArray(editData?.goals) && editData.goals.length > 0
            ? editData.goals.map((g: any) => g.goal)
            : [""]

          // Find matching sport or use empty string
          const sportValue = editData?.sport || editData?.sport_option?.name || ""
          
          setForm({
            sport: sportValue,
            name: editData?.program_name || "",
            ageGroup: editData?.upto_age ? String(editData.upto_age) : "15",
            price: editData?.program_price ? String(editData.program_price) : "",
            discountPrice: editData?.discount_price ? String(editData.discount_price) : "",
            location: editData?.program_location || "",
            start: editData?.program_start ? editData.program_start.split("T")[0] : "",
            end: editData?.program_end ? editData.program_end.split("T")[0] : "",
            times: timesList,
            about: editData?.about_program || "",
            goals: goalsList,
            photo: photo || editData?.program_photo || null,
            type: editData?.program_type || "one_one",
          })

          // Fetch full details including about_program
          getCoachProgramDetails(editData.id).then((response) => {
            const res = response as any
            if (res && res.success && res.data?.data?.program) {
              const fullData = res.data.data.program
              
              const fullTimesList = Array.isArray(fullData?.times) && fullData.times.length > 0 
                ? fullData.times.map((t: any) => {
                    const timeStr = String(t.time || "")
                    let firstPart = timeStr.split("-")[0].trim()
                    const timeRegex = /^([0-9]{1,2}):([0-9]{2})$/
                    const match = firstPart.match(timeRegex)
                    if (match) {
                      let hours = match[1]
                      if (hours.length === 1) hours = "0" + hours
                      firstPart = `${hours}:${match[2]}`
                    }
                    return firstPart
                  }) 
                : ["", "", ""]
              while (fullTimesList.length < 3) fullTimesList.push("")
          
              const fullGoalsList = Array.isArray(fullData?.goals) && fullData.goals.length > 0
                ? fullData.goals.map((g: any) => g.goal)
                : [""]

              setForm(prev => ({
                ...prev,
                about: fullData?.about_program || prev.about,
                times: fullTimesList,
                goals: fullGoalsList,
                sport: fullData?.sport || fullData?.sport_option?.name || prev.sport,
                type: fullData?.program_type || prev.type,
                ageGroup: fullData?.upto_age ? String(fullData.upto_age) : prev.ageGroup,
              }))
            }
          }).catch(console.error)
        }
      }
    } catch {
      // Ignore
    }
  }, [])

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

  const addTime = () => {
    setForm((prev) => ({ ...prev, times: [...prev.times, ""] }))
  }

  const removeTime = (idx: number) => {
    setForm((prev) => {
      const times = prev.times.filter((_: string, i: number) => i !== idx)
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
      const goals = prev.goals.filter((_: string, i: number) => i !== idx)
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
          (sport) => {
            if (sport.status !== "active") return false
            if (isCoach && sport.audience !== "coach") return false
            return true
          }
        )
        setSportOptions(activeSportOptions)
      } catch (err) {
        console.error("Error fetching sport data:", err)
      }
    }
    getSportData()
  }, [isCoach])

  // Update sport value when sport options are loaded to ensure it matches available options
  useEffect(() => {
    if (sportOptions.length > 0 && form.sport) {
      const matchingSport = sportOptions.find(sport => sport.name === form.sport)
      if (!matchingSport) {
        // If current sport value doesn't match any option, clear it or find closest match
        console.log("Sport not found in options:", form.sport, "Available:", sportOptions.map(s => s.name))
        // You could optionally set it to the first available option
        // setForm(prev => ({ ...prev, sport: sportOptions[0]?.name || "" }))
      } else {
        console.log("Sport found and matches:", matchingSport.name)
      }
    }
  }, [sportOptions, form.sport])

  // Debug logging for form values
  useEffect(() => {
    console.log("Form values:", form)
    console.log("Sport options:", sportOptions)
  }, [form, sportOptions])

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
        .filter((time: string) => Boolean(time.trim()))
        .forEach((time: string, index: number) => {
          formData.append(`program_times[${index}]`, time)
        })

      form.goals
        .filter((goal: string) => Boolean(goal.trim()))
        .forEach((goal: string, index: number) => {
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

      if (!programId) {
        toast.error("Program ID is missing.")
        setIsSubmitting(false)
        return
      }

      let res: any;
      if (isCoach) {
        res = await updateCoachProgram(programId, formData)
      } else {
        toast.error("Editing club programs is not supported in this modal yet.")
        setIsSubmitting(false)
        return
      }

      // Check success correctly based on our generic action response pattern
      if (res && (res.success === true || res.status === true)) {
        toast.success("Program updated successfully!")
        
        // Clean up sessionStorage first
        try {
          sessionStorage.removeItem("edit-program-photo")
          sessionStorage.removeItem("edit-program-data")
        } catch {
          // Ignore storage removal errors
        }

        // Close modal
        close("edit-program", ["program"])

        // Notify parent component to refresh data after modal closes
        setTimeout(() => {
          if (onProgramUpdated) {
            onProgramUpdated()
          } else if (contextOnProgramUpdated) {
            contextOnProgramUpdated()
          }
        }, 100)

        return
      }

      const fallbackMessage =
        "Failed to update program. Please check your inputs."
      const message =
        typeof res === "object" &&
        res !== null &&
        "message" in res &&
        typeof res.message === "string"
          ? res.message
          : fallbackMessage
      toast.error(message)
    } catch {
      toast.error("Failed to update program. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full p-0">
      <div className="flex flex-col gap-4 rounded-2xl bg-neutral-900 p-8 text-white">
        <h2 className="mb-2 text-2xl font-semibold">Edit Program</h2>

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
                  sessionStorage.setItem("edit-program-photo", dataUrl)
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
                    sessionStorage.removeItem("edit-program-photo")
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
            key={form.type}
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
              key={`sport-${sportOptions.length}-${form.sport}`}
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
                    value={sport.name}
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
              key={form.ageGroup}
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
            <div className="mt-1 flex flex-col gap-2">
              {form.times.map((time, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    value={time}
                    onChange={(e) => handleTimeChange(idx, e.target.value)}
                    placeholder="HH:MM"
                    className="flex-1 border-neutral-700 bg-neutral-800 py-5"
                    type="time"
                  />
                  {form.times.length > 1 && (
                    <CommonBtn
                      text="✕"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeTime(idx)}
                      className="hover:border-brand hover:bg-brand hover:text-primary"
                    />
                  )}
                </div>
              ))}
              <CommonBtn
                text="+ Add Time"
                size="sm"
                variant="outline"
                className="mt-2 w-full py-5! hover:border-brand hover:bg-brand hover:text-primary"
                onClick={addTime}
              />
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
            text={isSubmitting ? "Updating..." : "Update Program"}
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

export default EditProgramPage
