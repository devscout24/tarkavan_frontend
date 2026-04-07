"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Camera } from "lucide-react"

import UiInput from "@/components/common/ui-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectOption = {
  label: string
  value: string
}

type TeamAddModalProps = {
  title?: string
  submitLabel?: string
  cancelLabel?: string
  teamNamePlaceholder?: string
  ageGroupPlaceholder?: string
  competitionPlaceholder?: string
  ageGroups?: SelectOption[]
  competitionLevels?: SelectOption[]
  defaultTeamName?: string
  defaultAgeGroup?: string
  defaultCompetitionLevel?: string
  onCancel?: () => void
  onSubmit?: (payload: {
    teamName: string
    ageGroup: string
    competitionLevel: string
    photo?: File
  }) => void
}

export default function TeamAddModal({
  title = "Add New Team",
  submitLabel = "Add Team",
  cancelLabel = "Cancel",
  teamNamePlaceholder = "e.g., Elite U16",
  ageGroupPlaceholder = "Select Age Group",
  competitionPlaceholder = "Select Competition Level",
  ageGroups = [
    { label: "U10", value: "u10" },
    { label: "U12", value: "u12" },
    { label: "U14", value: "u14" },
    { label: "U16", value: "u16" },
    { label: "U18", value: "u18" },
  ],
  competitionLevels = [
    { label: "Development", value: "development" },
    { label: "Regional", value: "regional" },
    { label: "National", value: "national" },
    { label: "Elite", value: "elite" },
  ],
  defaultTeamName = "",
  defaultAgeGroup = "",
  defaultCompetitionLevel = "",
  onCancel,
  onSubmit,
}: TeamAddModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [teamName, setTeamName] = useState(defaultTeamName)
  const [ageGroup, setAgeGroup] = useState(defaultAgeGroup)
  const [competitionLevel, setCompetitionLevel] = useState(
    defaultCompetitionLevel
  )
  const [photo, setPhoto] = useState<File | undefined>(undefined)
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("")

  useEffect(() => {
    return () => {
      if (photoPreviewUrl) {
        URL.revokeObjectURL(photoPreviewUrl)
      }
    }
  }, [photoPreviewUrl])

  const handleSubmit = () => {
    onSubmit?.({
      teamName: teamName.trim(),
      ageGroup,
      competitionLevel,
      photo,
    })
  }

  return (
    <Card className="w-full rounded-2xl border border-white/10 bg-[#111217] py-0 text-white">
      <CardHeader className="space-y-4 px-5 pt-5 pb-0">
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
        <div className="h-px w-full bg-white/12" />
      </CardHeader>

      <CardContent className="space-y-6 px-5 pt-5 pb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(event) => {
            const selectedFile = event.target.files?.[0]
            if (!selectedFile) return

            setPhoto(selectedFile)
            const nextPreviewUrl = URL.createObjectURL(selectedFile)
            setPhotoPreviewUrl((previousUrl) => {
              if (previousUrl) {
                URL.revokeObjectURL(previousUrl)
              }
              return nextPreviewUrl
            })
          }}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative flex h-40 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/10 text-center hover:bg-white/12"
        >
          {photoPreviewUrl ? (
            <>
              <Image
                src={photoPreviewUrl}
                alt="Uploaded team preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-center bg-black/35 p-2">
                <span className="truncate text-xs text-white">
                  {photo?.name}
                </span>
              </div>
            </>
          ) : (
            <>
              <Camera className="mb-3 size-6 text-white/90" />
              <span className="text-xl font-medium text-white">
                UPLOAD PHOTO
              </span>
              <span className="mt-1 text-sm text-white/55">
                JPG or PNG, max 5MB. Headshots preferred.
              </span>
            </>
          )}
        </button>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Core Identity</h3>
            <div className="h-px w-full border-t border-dashed border-white/15" />
          </div>

          <UiInput
            label="Team Name"
            placeholder={teamNamePlaceholder}
            className="h-14 border-white/15 bg-transparent text-xl placeholder:text-white/35"
            onChange={(event) => setTeamName(event.target.value)}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className=" ">
              <label className="mb-2 text-base font-medium text-white">
                Age Group
              </label>
              <Select value={ageGroup} onValueChange={setAgeGroup}>
                <SelectTrigger className="h-14 w-full border-white/15 bg-transparent px-3 py-6 text-base text-white data-placeholder:text-white/35">
                  <SelectValue placeholder={ageGroupPlaceholder} />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1c23] text-white"  position="popper">
                  {ageGroups.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="hover:bg-brand!">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className=" ">
              <label className="mb-2 text-base font-medium text-white">
                Competition Level
              </label>
              <Select
                value={competitionLevel}
                onValueChange={setCompetitionLevel}
              >
                <SelectTrigger className="h-14 w-full border-white/15 bg-transparent px-3 py-6 text-base text-white data-placeholder:text-white/35">
                  <SelectValue placeholder={competitionPlaceholder} />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1c23] text-white" position="popper">
                  {competitionLevels.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="hover:bg-brand!">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-11 min-w-28 rounded-xl hover:text-brand border-brand/70 bg-transparent px-6 text-lg text-brand hover:bg-brand/10"
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            className="h-11 min-w-64 rounded-xl bg-brand px-10 text-base font-semibold text-primary hover:bg-brand"
          >
            {submitLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
