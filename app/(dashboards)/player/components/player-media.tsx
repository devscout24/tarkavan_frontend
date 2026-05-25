"use client"

import { useRef, useState, useCallback } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import CommonBtn from "@/components/common/common-btn"
import { Upload, X, Play } from "lucide-react"
import {
  mediaLinkDelete,
  playerGalleryDelete,
  playerProfileUpdate,
} from "../profile/action"
import { toast } from "sonner"

export type PlayerMediaItem = {
  id: string
  src: string
  alt: string
  type?: "image" | "video" | "embed"
  poster?: string
}

type LocalMediaItem = {
  id: string
  url: string
  type: "image" | "video"
  name: string
  file?: File
}

type ServerPreviewMediaItem = {
  id: string
  url: string
  type: "image" | "video" | "embed"
  name: string
  source: "server"
}

type PreviewMediaItem =
  | (LocalMediaItem & { source: "local" })
  | ServerPreviewMediaItem

type PlayerMediaProps = {
  title?: string
  subtitle?: string
  items?: PlayerMediaItem[]
  uploadLabel?: string
  className?: string
  acceptType?: "image" | "video" | "both"
}

const MAX_MEDIA = 5

const ACCEPT_MAP: Record<"image" | "video" | "both", string> = {
  image: "image/*",
  video: "video/*",
  both: "image/*,video/*",
}

const HINT_MAP: Record<"image" | "video" | "both", string> = {
  image: "All image formats — max 5 files",
  video: "All video formats — max 5 files",
  both: "Images & Videos — max 5 files",
}

function isAllowed(file: File, acceptType: "image" | "video" | "both") {
  if (acceptType === "image") return file.type.startsWith("image/")
  if (acceptType === "video") return file.type.startsWith("video/")
  return file.type.startsWith("image/") || file.type.startsWith("video/")
}

export default function PlayerMedia({
  title = "My Images",
  subtitle = "Match highlights & training",
  uploadLabel = "Upload Media",
  className,
  items = [],
  acceptType = "both",
}: PlayerMediaProps) {
  const [mediaItems, setMediaItems] = useState<LocalMediaItem[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const remaining = MAX_MEDIA - mediaItems.length
      if (remaining <= 0) return

      const toAdd = Array.from(files)
        .filter((f) => isAllowed(f, acceptType))
        .slice(0, remaining)

      const newItems: LocalMediaItem[] = toAdd.map((file) => ({
        id: `${Date.now()}-${Math.random()}`,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video/") ? "video" : "image",
        name: file.name,
        file,
      }))

      setMediaItems((prev) => [...prev, ...newItems])
      if (fileInputRef.current) fileInputRef.current.value = ""
    },
    [mediaItems.length, acceptType]
  )

  const handleRemoveMedia = async (id: string) => {
    try {
      const res = await playerGalleryDelete(id)
      if (res && "success" in res && res.success) {
        toast.success(res?.data?.data || "Media removed successfully")
        window.dispatchEvent(new Event("player_profile_updated"))
        return
      }
    } catch (error) {
      console.error("Remove error:", (error as Error).message)
      toast.error("Failed to remove media")
    } finally {
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const isMaxed = mediaItems.length >= MAX_MEDIA
  const acceptAttr = ACCEPT_MAP[acceptType]
  const hintText = HINT_MAP[acceptType]
  const previewItems: PreviewMediaItem[] = [
    ...items.map((item) => {
      const itemType: ServerPreviewMediaItem["type"] =
        item.type === "video"
          ? "video"
          : item.type === "embed"
            ? "embed"
            : "image"

      return {
        id: item.id,
        url: item.src,
        type: itemType,
        name: item.alt,
        source: "server" as const,
      }
    }),
    ...mediaItems.map((item) => ({ ...item, source: "local" as const })),
  ]

  const handleUploadMedia = async () => {
    setLoading(true)
    try {
      if (!mediaItems.length) {
        toast.error("No media selected for upload")
        setLoading(false)
        return
      }
      if (mediaItems.length > 5) {
        toast.error("Maximum 5 files allowed")
        setLoading(false)
        return
      }

      const formData = new FormData()

      mediaItems.forEach((item) => {
        if (!item.file) return
        const key = item.type === "image" ? "profile_gallery[]" : "reels[]"
        formData.append(key, item.file)
      })

      const res = await playerProfileUpdate(formData)
      console.log(res)
      if (res && "success" in res && res.success) {
        toast.success(res.data?.message || "Media uploaded successfully")
        mediaItems.forEach((item) => {
          if (item.url.startsWith("blob:")) {
            URL.revokeObjectURL(item.url)
          }
        })
        setMediaItems([])
        if (fileInputRef.current) fileInputRef.current.value = ""
        window.dispatchEvent(new Event("player_profile_updated"))
      }

      setLoading(false)
    } catch (error) {
      console.error("Upload error:", (error as Error).message)
      setLoading(false)
    }
  }

  const handleMediaLinkDelete = async (id: string) => {
    try {
      const res = await mediaLinkDelete(id) 
      if (res && "success" in res && res.success) {
        toast.success(res?.data?.data || "Media link removed successfully")
        window.dispatchEvent(new Event("player_profile_updated"))
        return
      }
    } catch (error) {
      console.error("Link delete error:", (error as Error).message)
      toast.error("Failed to delete media link")
    }
  }

  return (
    <Card
      className={cn(
        "mt-6 border border-secondary/40 bg-primary py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <div>
          <CardTitle className="text-xl font-semibold text-white">
            {title}
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-muted-foreground">
            {subtitle}
          </CardDescription>
        </div>
        <CommonBtn
          size="lg"
          variant="default"
          text={uploadLabel}
          onClick={handleUploadMedia}
          className="w-fit cursor-pointer border-2 border-white/50 bg-secondary/70 px-4 text-base"
          icon={<Upload />}
          isLoading={loading}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Counter */}
        {mediaItems.length > 0 && (
          <p className="text-right text-xs text-muted-foreground">
            <span className="font-semibold text-blue-400">
              {mediaItems.length}
            </span>{" "}
            / {MAX_MEDIA} media selected
          </p>
        )}

        {/* Preview Grid */}
        {previewItems.length > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {previewItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black"
              >
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.url}
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                      <Play className="h-2.5 w-2.5" /> Video
                    </div>
                  </>
                ) : item.type === "embed" ? (
                  <>
                    <iframe
                      src={item.url}
                      title={item.name}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                      <Play className="h-2.5 w-2.5" /> YouTube
                    </div>
                  </>
                ) : (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                )}

                {/* Overlay on hover */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-200 group-hover:bg-black/40">
                  <button
                    onClick={() =>
                      item.type === "embed"
                        ? handleMediaLinkDelete(item.id)
                        : handleRemoveMedia(item.id)
                    }
                    className="pointer-events-auto flex h-8 w-8 scale-75 items-center justify-center rounded-full bg-brand text-primary opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 hover:bg-brand/80 disabled:cursor-not-allowed disabled:opacity-60"
                    title="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Max reached message */}
        {isMaxed && (
          <div className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-center text-xs text-red-400">
            Maximum 5 media selected. Remove one to add more.
          </div>
        )}

        {/* Dropzone */}
        <div
          onDragOver={!isMaxed ? handleDragOver : undefined}
          onDragLeave={!isMaxed ? handleDragLeave : undefined}
          onDrop={!isMaxed ? handleDrop : undefined}
          onClick={() => !isMaxed && fileInputRef.current?.click()}
          className={cn(
            "relative flex flex-col items-center gap-3 rounded-xl px-6 py-8 text-white ring-1 ring-secondary transition duration-100 ease-linear ring-inset",
            isDragging ? "bg-blue-400/10 ring-blue-400" : "bg-primary",
            isMaxed
              ? "cursor-not-allowed opacity-40"
              : "cursor-pointer hover:bg-white/5"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptAttr}
            className="sr-only"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
            disabled={isMaxed}
          />

          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white/60 shadow-xs ring-1 ring-primary ring-inset">
            <svg
              viewBox="0 0 24 24"
              width={22}
              height={22}
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m8 16 4-4m0 0 4 4m-4-4v9m8-4.257A5.5 5.5 0 0 0 16.5 7a.62.62 0 0 1-.534-.302 7.5 7.5 0 1 0-11.78 9.096" />
            </svg>
          </div>

          <div className="flex flex-col gap-1 text-center">
            <div className="text-sm text-white/80">
              <span className="font-semibold text-brand underline underline-offset-4">
                Click to upload
              </span>{" "}
              or drag and drop
            </div>
            <p className="text-xs text-white/40">{hintText}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
