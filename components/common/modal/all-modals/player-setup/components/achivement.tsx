"use client"

import { useRef } from "react"
import { Calendar, AlignLeft, ImageIcon, Upload, X, Trophy } from "lucide-react"
import { TPlayerProfilePayload } from "../type"

export default function AchievementDetailsForm({
  payload,
  setPayload,
}: {
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}) {
  const blobUrlRef = useRef<string>("")
  const achievements = payload?.achievements || {
    title: "",
    description: "",
    dateEarned: "",
    uploadedAssets: { id: "", name: "", type: "image", file: undefined, preview: "" },
  }

  const image = achievements.uploadedAssets?.file
  const preview = achievements.uploadedAssets?.preview || ""

  const updateAchievement = (fields: Partial<typeof achievements>) => {
    setPayload((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        ...fields,
      },
    }))
  }

  const handleImage = (list: FileList | null) => {
    const file = list?.[0]
    if (!file) return

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
    }

    const newPreview = URL.createObjectURL(file)
    blobUrlRef.current = newPreview

    updateAchievement({
      uploadedAssets: {
        id: crypto.randomUUID(),
        name: file.name,
        type: "image",
        file,
        preview: newPreview,
      },
    })
  }

  const removeImage = () => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
      blobUrlRef.current = ""
    }

    updateAchievement({
      uploadedAssets: {
        id: "",
        name: "",
        type: "image",
        file: undefined,
        preview: "",
      },
    })
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#181E2B] p-5 space-y-5 shadow-sm">
      <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300">
          <Trophy className="size-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Athletic Honors & Awards</h3>
          <p className="text-[11px] text-white/50">
            Document tournament medals, MVPs, team championships, or federation badges
          </p>
        </div>
      </div>

      {/* Title & Date */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-white/90">
            Achievement Title <span className="text-brand">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Ontario Cup MVP & Top Scorer 2024"
            value={achievements.title}
            onChange={(e) => updateAchievement({ title: e.target.value })}
            className="h-11 w-full rounded-xl border border-white/10 bg-[#222A3B] px-3.5 text-xs text-white placeholder:text-white/40 hover:border-white/20 focus:border-brand focus:ring-1 focus:ring-brand/30 focus:outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-white/90">
            Date Earned
          </label>
          <div className="relative">
            <Calendar
              size={14}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-brand/80"
            />
            <input
              type="date"
              value={achievements.dateEarned || ""}
              onChange={(e) => updateAchievement({ dateEarned: e.target.value })}
              className="h-11 w-full rounded-xl border border-white/10 bg-[#222A3B] pr-3 pl-9 text-xs text-white scheme-dark placeholder:text-white/40 hover:border-white/20 focus:border-brand focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Certificate / Image Proof */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-white/90">
          Award Certificate or Medal Photo <span className="text-white/40">(Optional)</span>
        </label>

        {!preview ? (
          <label className="flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/15 bg-[#141A26] transition-colors hover:border-brand/40">
            <div className="flex size-7 items-center justify-center rounded-full bg-brand/15 text-brand">
              <ImageIcon size={14} />
            </div>
            <span className="text-xs font-semibold text-white/80">
              Upload photo of badge, medal, or award certificate
            </span>
            <span className="text-[10px] text-white/50">PNG, JPG or WEBP</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => handleImage(e.target.files)}
            />
          </label>
        ) : (
          <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-[#222A3B] p-3">
            <img
              src={preview}
              alt="Achievement proof"
              className="size-14 shrink-0 rounded-lg object-cover ring-1 ring-white/10"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white">
                {achievements.uploadedAssets?.name || "Award Photo"}
              </p>
              <p className="text-[10px] text-white/50">
                {image ? `${(image.size / (1024 * 1024)).toFixed(1)} MB` : "Attached photo"}
              </p>
              <label className="mt-1 inline-flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-brand hover:underline">
                <Upload size={10} />
                <span>Replace file</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => handleImage(e.target.files)}
                />
              </label>
            </div>
            <button
              type="button"
              onClick={removeImage}
              className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-white/90">
            Description <span className="text-white/40">(Optional)</span>
          </label>
          <span className="text-[10px] text-white/50">
            {(achievements.description || "").length}/240
          </span>
        </div>
        <div className="relative">
          <AlignLeft
            size={14}
            className="pointer-events-none absolute top-3 left-3 text-white/40"
          />
          <textarea
            placeholder="Briefly describe the competition context, division, or coach feedback..."
            maxLength={240}
            rows={2}
            value={achievements.description || ""}
            onChange={(e) => updateAchievement({ description: e.target.value })}
            className="w-full resize-none rounded-xl border border-white/10 bg-[#222A3B] py-2.5 pr-3 pl-9 text-xs leading-relaxed text-white placeholder:text-white/40 hover:border-white/20 focus:border-brand focus:outline-none transition-all"
          />
        </div>
      </div>
    </div>
  )
}