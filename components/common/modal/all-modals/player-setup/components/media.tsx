"use client"

import { useRef, useState } from "react"
import { Film, UploadCloud, X, PlayCircle, Globe, Video } from "lucide-react"
import { FaFacebookF, FaWhatsapp, FaXTwitter } from "react-icons/fa6"
import { TPlayerProfilePayload } from "../type"

type MediaItem = {
  id: string
  title: string
  type: "video"
  file?: File
  preview: string
}

export default function Media({
  payload,
  setPayload,
}: {
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}) {
  const [items, setItems] = useState<MediaItem[]>(() => {
    return (
      (payload.highlights.uploadedItems as any[])?.map((item, index) => ({
        id: item.id || crypto.randomUUID(),
        title: item.title || `Video ${index + 1}`,
        type: "video",
        file: item.file,
        preview: item.preview || item.video_url || "",
      })) || []
    )
  })

  const ownedBlobUrls = useRef<Set<string>>(new Set())

  const syncItemsToPayload = (updatedItems: MediaItem[]) => {
    setItems(updatedItems)
    setPayload((prev) => ({
      ...prev,
      highlights: {
        ...prev.highlights,
        uploadedItems: updatedItems.map((item) => ({
          id: item.id,
          title: item.title,
          type: "video" as const,
          file: item.file,
          video_url: typeof item.preview === "string" ? item.preview : "",
        })),
      },
    }))
  }

  const handleFiles = (list: FileList | null) => {
    if (!list) return

    const newItems: MediaItem[] = Array.from(list).map((file) => {
      const preview = URL.createObjectURL(file)
      ownedBlobUrls.current.add(preview)
      return {
        id: crypto.randomUUID(),
        title: file.name,
        type: "video" as const,
        file,
        preview,
      }
    })

    syncItemsToPayload([...items, ...newItems])
  }

  const removeItem = (id: string) => {
    const target = items.find((item) => item.id === id)
    if (target && ownedBlobUrls.current.has(target.preview)) {
      URL.revokeObjectURL(target.preview)
      ownedBlobUrls.current.delete(target.preview)
    }
    syncItemsToPayload(items.filter((item) => item.id !== id))
  }

  const updateSocialLink = (
    key: "facebook_link" | "whatsapp_link" | "twitter_link",
    value: string
  ) => {
    setPayload((prev) => ({
      ...prev,
      highlights: {
        ...prev.highlights,
        [key]: value,
      },
    }))
  }

  return (
    <div className="space-y-5">
      {/* 1. Social Presence Card */}
      <div className="rounded-2xl border border-white/10 bg-[#181E2B] p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Globe className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Social & Media Channels</h3>
            <p className="text-[11px] text-white/50">Connect player social profiles for recruitment visibility</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-[#202738] p-3 space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-white/90">
              <span className="flex size-5 items-center justify-center rounded-md bg-[#1877F2]/20 text-[#1877F2]">
                <FaFacebookF className="size-2.5" />
              </span>
              <span>Facebook</span>
            </label>
            <input
              type="text"
              value={payload.highlights.facebook_link || ""}
              onChange={(e) => updateSocialLink("facebook_link", e.target.value)}
              placeholder="facebook.com/player"
              className="h-9 w-full rounded-lg border border-white/10 bg-[#262F44] px-3 text-xs text-white placeholder:text-white/40 hover:border-white/20 focus:border-brand focus:outline-none"
            />
          </div>

          <div className="rounded-xl border border-white/5 bg-[#202738] p-3 space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-white/90">
              <span className="flex size-5 items-center justify-center rounded-md bg-[#25D366]/20 text-[#25D366]">
                <FaWhatsapp className="size-2.5" />
              </span>
              <span>WhatsApp</span>
            </label>
            <input
              type="text"
              value={payload.highlights.whatsapp_link || ""}
              onChange={(e) => updateSocialLink("whatsapp_link", e.target.value)}
              placeholder="wa.me/number"
              className="h-9 w-full rounded-lg border border-white/10 bg-[#262F44] px-3 text-xs text-white placeholder:text-white/40 hover:border-white/20 focus:border-brand focus:outline-none"
            />
          </div>

          <div className="rounded-xl border border-white/5 bg-[#202738] p-3 space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-white/90">
              <span className="flex size-5 items-center justify-center rounded-md bg-white/10 text-white">
                <FaXTwitter className="size-2.5" />
              </span>
              <span>Twitter (X)</span>
            </label>
            <input
              type="text"
              value={payload.highlights.twitter_link || ""}
              onChange={(e) => updateSocialLink("twitter_link", e.target.value)}
              placeholder="x.com/player"
              className="h-9 w-full rounded-lg border border-white/10 bg-[#262F44] px-3 text-xs text-white placeholder:text-white/40 hover:border-white/20 focus:border-brand focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Highlight Reels Upload */}
      <div className="rounded-2xl border border-white/10 bg-[#181E2B] p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
              <Film className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Video Highlight Reels</h3>
              <p className="text-[11px] text-white/50">Upload gameplay highlights or training drills (MP4, MOV)</p>
            </div>
          </div>
          {items.length > 0 && (
            <span className="rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-bold text-brand">
              {items.length} Reels
            </span>
          )}
        </div>

        {/* Upload dropzone */}
        <div className="relative rounded-xl border border-dashed border-white/15 bg-[#141A26] p-5 text-center transition-colors hover:border-brand/40">
          <div className="flex flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-brand/15 text-brand">
              <UploadCloud className="size-5" />
            </div>
            <p className="mt-2 text-xs font-semibold text-white">
              Drag and drop match reels here, or browse files
            </p>
            <p className="text-[10px] text-white/50 mt-0.5">High definition MP4 or MOV</p>

            <label className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-black transition-transform hover:scale-105 active:scale-95 shadow-md shadow-brand/20">
              <Video className="size-3.5" />
              <span>Select Videos</span>
              <input
                type="file"
                accept="video/mp4,video/quicktime"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>
          </div>
        </div>

        {/* Video Reel Items Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#202738] p-2.5"
              >
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-black ring-1 ring-white/10">
                  <video
                    src={item.preview}
                    muted
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <PlayCircle className="size-4 text-brand" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-white/50">
                    {item.file
                      ? `${(item.file.size / (1024 * 1024)).toFixed(1)} MB`
                      : "Video reel uploaded"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white"
                  aria-label="Remove video"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
