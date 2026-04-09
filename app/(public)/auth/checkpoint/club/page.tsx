"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

import UiInput from "@/components/common/ui-input"
import UploadPhoto from "@/components/common/upload-photo"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

const organizationTypes = [
  "Youth Club",
  "Academy",
  "Competitive Club",
  "High Performance Program",
  "College / University Team",
  "Semi-Professional Team",
  "Professional Club",
]

const maxDescriptionLength = 300

export default function Page() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "Academy",
    "High Performance Program",
  ])
  const [description, setDescription] = useState(
    "Premier youth soccer development club focused on building champions on and off the field."
  )
  const [sport, setSport] = useState("soccer")

  const toggleOrganizationType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    )
  }

  const router = useRouter()

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#0B1142_0%,#060914_45%,#02040B_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <section className="rounded-2xl border border-white/10 bg-primary/95 p-5 shadow-2xl shadow-black/30 sm:p-7">
          <h1 className="text-xl font-bold">Club Profile Setup</h1>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-1/3 rounded-full bg-brand" />
          </div>
          <p className="mt-3 text-sm text-white/70">
            Complete your profile to join the elite coaching network.
          </p>

          <div className="mt-6">
            <UploadPhoto className="h-36 rounded-xl border-white/20 bg-white/3" />
          </div>

          <div className="mt-7">
            <h2 className="border-b border-dashed border-white/10 pb-3 text-lg font-semibold">
              Basic Information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <UiInput
                label="Club Name"
                placeholder="e.g. Canada Strikers FC"
              />
              <UiInput
                label="Email Address"
                type="email"
                placeholder="club@strikers.ca"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Sport Selection
                </label>
                <Select value={sport} onValueChange={setSport}>
                  <SelectTrigger className="py-6 w-full border-white/10 bg-[#2B2E36] px-3 text-white">
                    <SelectValue placeholder="Select Sport" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#21242D] text-white">
                    <SelectItem value="soccer">Soccer</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="volleyball">Volleyball</SelectItem>
                    <SelectItem value="hockey">Hockey</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <UiInput label="City" placeholder="Toronto" />
              <UiInput label="Province / State" placeholder="Ontario" />
              <UiInput label="Country" placeholder="Canada" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-primary/95 p-5 shadow-2xl shadow-black/30 sm:p-7">
          <h2 className="border-b border-dashed border-white/10 pb-3 text-lg font-semibold">
            Organization Type
          </h2>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {organizationTypes.map((type) => {
              const isActive = selectedTypes.includes(type)
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleOrganizationType(type)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-brand bg-brand text-black"
                      : "border-white/12 bg-white/5 text-white/75 hover:bg-white/10"
                  }`}
                >
                  {type}
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-primary/95 p-5 shadow-2xl shadow-black/30 sm:p-7">
          <h2 className="border-b border-dashed border-white/10 pb-3 text-lg font-semibold">
            Club Overview
          </h2>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-white">
              Club Description
            </label>
            <Textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value.slice(0, maxDescriptionLength))
              }
              placeholder="Tell parents and players what makes your club special..."
              className="min-h-32 resize-none border-white/10 bg-[#2B2E36] text-white placeholder:text-white/40"
            />
            <p className="mt-2 text-right text-xs text-white/60">
              {description.length}/{maxDescriptionLength} characters
            </p>
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={()=> router.back()}
              className="rounded-lg border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand/10"
            >
              Back
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              Finish & Create Profile
              <ArrowRight className="size-4" />
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
