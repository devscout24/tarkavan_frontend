"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Calendar, AlignLeft, ImageIcon, Upload, X } from "lucide-react"
import { TPlayerProfilePayload } from "../type"

export default function AchievementDetailsForm({
  payload,
  setPayload,
}: {
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}) {
  const [title, setTitle] = useState(payload?.achievements?.title || "")
  const [dateEarned, setDateEarned] = useState(
    payload?.achievements?.dateEarned || ""
  )
  const [description, setDescription] = useState(
    payload?.achievements?.description || ""
  )
  const [image, setImage] = useState<File | null>(
    payload?.achievements?.uploadedAssets?.file || null
  )
  const [preview, setPreview] = useState<string>(
    payload?.achievements?.uploadedAssets?.preview || ""
  )

  // keep a ref of the latest blob url so we only ever revoke a url we created
  const blobUrlRef = useRef<string>("")

  // sync text fields (no blob concerns here, safe to run on every change)
  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        title,
        description,
        dateEarned,
      },
    }))
  }, [title, description, dateEarned])

  const handleImage = (list: FileList | null) => {
    const file = list?.[0]
    if (!file) return

    // revoke the previous blob (if we created one) before making a new one
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
    }

    const newPreview = URL.createObjectURL(file)
    blobUrlRef.current = newPreview

    setImage(file)
    setPreview(newPreview)

    setPayload((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        uploadedAssets: {
          ...prev.achievements.uploadedAssets,
          name: file.name,
          type: "image",
          file,
          preview: newPreview,
        },
      },
    }))
  }

  const removeImage = () => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
      blobUrlRef.current = ""
    }

    setImage(null)
    setPreview("")

    setPayload((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        uploadedAssets: {
          id: "",
          name: "",
          type: "image",
          file: undefined,
          preview: "",
        },
      },
    }))
  }

 
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-linear-to-b from-[#12151C] to-[#0A0C10] p-7 text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
      <div className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-brand/8 blur-[100px]" />

      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand/20 to-brand/5 text-brand ring-1 ring-brand/20">
          <Award size={18} strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Achievement details
          </h3>
          <p className="text-[12.5px] text-white/40">
            Tell us what you accomplished
          </p>
        </div>
      </div>

      {/* Achievement image */}
      <div className="relative mt-6">
        <label className="text-[13px] font-medium text-white/70">
          Achievement image
        </label>

        {!preview ? (
          <label className="mt-2 flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 bg-white/2 transition-colors duration-150 hover:border-brand/30 hover:bg-white/[0.035]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/4 text-brand ring-1 ring-white/6">
              <ImageIcon size={16} strokeWidth={1.75} />
            </div>
            <span className="text-[12.5px] text-white/45">
              Click to upload a photo of your badge, medal or certificate
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => handleImage(e.target.files)}
            />
          </label>
        ) : (
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/6 bg-white/2 p-2.5">
            <img
              src={preview}
              alt="Achievement preview"
              className="h-16 w-16 shrink-0 rounded-lg object-cover ring-1 ring-white/8"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-white/85">
                {image?.name}
              </p>
              <p className="text-[11px] text-white/35">
                {image ? (image.size / (1024 * 1024)).toFixed(1) : 0} MB
              </p>
              <label className="mt-1 inline-flex cursor-pointer items-center gap-1 text-[11.5px] font-medium text-brand hover:underline">
                <Upload size={11} />
                Replace
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
              className="shrink-0 self-start rounded-lg p-1.5 text-white/30 transition hover:bg-white/8 hover:text-white"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      <div className="relative mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-[13px] font-medium text-white/70">
            Achievement title
          </label>
          <input
            type="text"
            placeholder="e.g. Employee of the Year"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-white/8 bg-white/2 px-3.5 text-[13.5px] text-white transition-colors duration-150 outline-none placeholder:text-white/25 focus:border-brand/40 focus:bg-white/[0.035]"
          />
        </div>

        <div>
          <label className="text-[13px] font-medium text-white/70">
            Date earned
          </label>
          <div className="relative mt-2">
            <Calendar
              size={15}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-white/30"
            />
            <input
              type="date"
              value={dateEarned}
              onChange={(e) => setDateEarned(e.target.value)}
              className="h-11 w-full rounded-xl border border-white/8 bg-white/2 pr-3.5 pl-10 text-[13.5px] text-white scheme-dark transition-colors duration-150 outline-none focus:border-brand/40 focus:bg-white/[0.035]"
            />
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-medium text-white/70">
            Description <span className="text-white/30">(optional)</span>
          </label>
          <span className="text-[11px] text-white/25">
            {description.length}/240
          </span>
        </div>
        <div className="relative mt-2">
          <AlignLeft
            size={15}
            className="pointer-events-none absolute top-3.5 left-3.5 text-white/30"
          />
          <textarea
            placeholder="Briefly describe the significance..."
            maxLength={240}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-23 w-full resize-none rounded-xl border border-white/8 bg-white/2 py-3 pr-3.5 pl-10 text-[13.5px] leading-relaxed text-white transition-colors duration-150 outline-none placeholder:text-white/25 focus:border-brand/40 focus:bg-white/[0.035]"
          />
        </div>
      </div>
    </div>
  )
}