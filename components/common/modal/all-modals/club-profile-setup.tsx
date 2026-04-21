"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation" 
import UploadPhoto from "@/components/custom/coach-profile-setup/UploadPhoto"
import { Textarea } from "@/components/ui/textarea"
import UiInput from "../../ui-input"

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

export default function ClubProfileSetup() {
  const [selectedOrganizationTypes, setSelectedOrganizationTypes] = useState<
    string[]
  >([])
  const [description, setDescription] = useState(
    "Premier youth soccer development club focused on building champions on and off the field."
  )

  const router = useRouter()

  const toggleOrganizationType = (type: string) => {
    setSelectedOrganizationTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    )
  }

  return (
    <section className="bg-primary">
      <div className="space-y-4 rounded-[16px] bg-secondary/20 p-4 sm:p-6">
        {/* club profile set header */}
        <div className="text-white">
          <div className="space-y-4 pb-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[28px] leading-[120%] font-semibold text-white">
                Club Profile Setup
              </h2>
            </div>

            <p className="text-[22px] leading-[140%] text-[#D9D9D9]">
              Complete your profile to join the elite coaching network.
            </p>
          </div>
        </div>
        <UploadPhoto updatePhotoUploaded={() => {}} />

        <h2 className="border-b border-b-secondary text-xl font-bold text-white">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UiInput
            label="Club Name"
            labelClass="text-sm text-[#D9D9D9]"
            placeholder="e.g. Canada Strikers FC"
          />
          <UiInput
            label="Email Address"
            labelClass="text-sm text-[#D9D9D9]"
            placeholder="e.g. info@canadastrikersfc.com"
          />
          <UiInput
            label="Sport Selection"
            labelClass="text-sm text-[#D9D9D9]"
            placeholder="e.g. Soccer"
          />
          <UiInput
            label="City"
            labelClass="text-sm text-[#D9D9D9]"
            placeholder="e.g. Toronto"
          />
          <UiInput
            label="Province / State"
            labelClass="text-sm text-[#D9D9D9]"
            placeholder="e.g. Ontario"
          />
          <UiInput
            label="Country"
            labelClass="text-sm text-[#D9D9D9]"
            placeholder="e.g. Canada"
          />
        </div>

        {/* organization type */}
        <div className="rounded-2xl border border-white/10 bg-[#131722]/10 p-4 sm:p-5">
          <h3 className="border-b border-dashed border-white/10 pb-3 text-xl leading-[120%] font-semibold text-white">
            Organization Type
          </h3>

          <div className="mt-4 flex flex-wrap gap-2.5">
            {organizationTypes.map((type) => {
              const isSelected = selectedOrganizationTypes.includes(type)

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleOrganizationType(type)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-[#B6F36A] text-[#111111]"
                      : "bg-[#2B2E36] text-[#D9D9D9]"
                  }`}
                >
                  {type}
                </button>
              )
            })}
          </div>
        </div>

        {/* Club Overview */}
        <div className="rounded-[24px] bg-[#1A1A1A]/40 px-5 py-6 text-white sm:px-8 sm:py-7">
          <h3 className="text-xl leading-[120%] font-semibold text-white">
            Club Overview
          </h3>

          <div className="mt-3 border-t border-dashed border-white/15" />

          <div className="mt-5 space-y-3">
            <label className="block text-[18px] leading-[140%] text-white">
              Club Description
            </label>

            <Textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value.slice(0, maxDescriptionLength)
                )
              }
              placeholder="Premier youth soccer development club focused on building champions on and off the field."
              className="min-h-23.5 rounded-md border-white/10 bg-transparent px-3 py-3 text-base text-white placeholder:text-white/25 focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <p className="text-right text-sm text-white/80">
              {description.length}/{maxDescriptionLength} characters
            </p>
          </div>

          <div className="mt-6 border-t border-white/10 pt-6">
            <div className="flex items-center justify-end gap-4"> 
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-[12px] bg-[#B6F36A] px-5 py-3 text-sm font-semibold text-[#111111] transition-opacity hover:opacity-90"
              >
                Finish & Create Profile
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
