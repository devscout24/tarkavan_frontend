"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { Film, UploadCloud, X, PlayCircle } from "lucide-react"
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
  const [items, setItems] = useState<MediaItem[]>(
    () =>
      (payload.highlights.uploadedItems as MediaItem[])?.filter(
        (item) => item.file
      ) || []
  )

  useEffect(() => {
    const mediaItems: MediaItem[] = payload.highlights.uploadedItems.map(
      (item, index) => ({
        id: crypto.randomUUID(),
        title: `Video ${index + 1}`,
        type: "video",
        preview: String(item.video_url),
      })
    )

    setItems(mediaItems)
  }, [])

  // track every blob url we create so we only revoke ones we own
  const ownedBlobUrls = useRef<Set<string>>(new Set())

  // sync the current list to payload whenever it changes — replace, don't append,
  // so re-runs never duplicate entries
  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      highlights: {
        ...prev.highlights,
        uploadedItems: items,
      },
    }))
  }, [items])

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

    setItems((prev) => [...prev, ...newItems])
  }

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id)
      if (target && ownedBlobUrls.current.has(target.preview)) {
        URL.revokeObjectURL(target.preview)
        ownedBlobUrls.current.delete(target.preview)
      }
      return prev.filter((item) => item.id !== id)
    })
  }

  return (
    <div className="mt-10">
      <h2 className="pb-5 text-xl leading-[150%] font-bold text-white">
        Add Social Media Links
      </h2>
      <Field>
        <FieldLabel htmlFor="Facebook" className="text-white">
          Facebook
        </FieldLabel>
        <Input
          id="Facebook"
          type="text"
          value={payload.highlights.facebook_link}
          className="text-white"
          onChange={(e) =>
            setPayload((prev) => ({
              ...prev,
              highlights: {
                ...prev.highlights,
                facebook_link: e.target.value,
              },
            }))
          }
          placeholder="https://www.facebook.com/.."
        />
      </Field>
      <Field className="mt-4">
        <FieldLabel htmlFor="WhatsApp" className="text-white">
          WhatsApp
        </FieldLabel>
        <Input
          id="WhatsApp"
          type="text"
          value={payload.highlights.whatsapp_link}
          className="text-white"
          onChange={(e) =>
            setPayload((prev) => ({
              ...prev,
              highlights: {
                ...prev.highlights,
                whatsapp_link: e.target.value,
              },
            }))
          }
          placeholder="https://chat.whatsapp.com/.."
        />
      </Field>
      <Field className="mt-4">
        <FieldLabel htmlFor="Twitter" className="text-white">
          Twitter (X)
        </FieldLabel>
        <Input
          id="Twitter"
          type="text"
          value={payload.highlights.twitter_link}
          className="text-white"
          onChange={(e) =>
            setPayload((prev) => ({
              ...prev,
              highlights: {
                ...prev.highlights,
                twitter_link: e.target.value,
              },
            }))
          }
          placeholder="https://x.com/.."
        />
      </Field>

      <section className="relative my-5 overflow-hidden rounded-[28px] border border-white/8 bg-linear-to-b from-[#12151C] to-[#0A0C10] p-8 text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        {/* ambient accent */}
        <div className="pointer-events-none absolute -top-32 -right-20 h-72 w-72 rounded-full bg-brand/8 blur-[110px]" />

        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand/20 to-brand/5 text-brand ring-1 ring-brand/20">
            <Film size={20} strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-[1.35rem] font-semibold tracking-tight text-white">
              Upload highlight reels
            </h2>
            <p className="mt-0.5 text-[13px] text-white/45">
              Upload videos or paste links from YouTube, Instagram or TikTok.
            </p>
          </div>
        </div>

        {/* Upload area */}
        <div className="relative mt-8 rounded-2xl border border-white/8 bg-white/2 p-10 transition-colors duration-200 hover:border-brand/30 hover:bg-white/[0.035]">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/4 text-brand ring-1 ring-white/6">
              <UploadCloud size={24} strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 text-[15px] font-medium text-white/90">
              Upload your video
            </h3>

            <label className="mt-6 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-brand px-6 py-2.5 text-[13px] font-semibold text-black transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]">
              Browse files
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

        {/* Selected files — with preview */}
        {items.length > 0 && (
          <ul className="relative mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/2 p-2.5"
              >
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-black ring-1 ring-white/8">
                  <video
                    src={item.preview}
                    muted
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <PlayCircle size={18} className="text-white/85" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-white/85">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-white/35">
                    {item.file ? `${(item.file.size / (1024 * 1024)).toFixed(1)} MB` : "N/A"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="shrink-0 self-start rounded-lg p-1.5 text-white/30 transition hover:bg-white/8 hover:text-white"
                  aria-label={`Remove ${item.title}`}
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
