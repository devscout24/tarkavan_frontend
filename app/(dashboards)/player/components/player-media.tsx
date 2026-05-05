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
import { uploadMediaPLayer } from "@/lib/media-uploader"

export type PlayerMediaItem = {
  id: string
  src: string
  alt: string
  type?: "image" | "video"
  poster?: string
}

type LocalMediaItem = {
  id: string
  url: string
  type: "image" | "video"
  name: string
}

type PlayerMediaProps = {
  title?: string
  subtitle?: string
  items?: PlayerMediaItem[]
  onUpload?: () => void
  uploadLabel?: string
  className?: string
  /**
   * Controls which file types are accepted in the dropzone/file picker.
   * - "image" → accepts all image types (image/*)
   * - "video" → accepts all video types (video/*)
   * - "both"  → accepts images and videos (default)
   */
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
  onUpload,
  uploadLabel = "Upload Media",
  className,
  acceptType = "both",
}: PlayerMediaProps) {
  const [mediaItems, setMediaItems] = useState<LocalMediaItem[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      }))

      setMediaItems((prev) => [...prev, ...newItems])
      if (fileInputRef.current) fileInputRef.current.value = ""
    },
    [mediaItems.length, acceptType]
  )

  const removeItem = (id: string) => {
    setMediaItems((prev) => {
      const item = prev.find((m) => m.id === id)
      if (item) URL.revokeObjectURL(item.url)
      return prev.filter((m) => m.id !== id)
    })
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


  const handleUploadMedia = async () => {

    try{

      // const res = await uploadMediaPLayer()

    }catch(error) {
        console.error("Upload error:", (error as Error).message);
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
          onClick={() =>  {}}
          className="bg-secondary/70 border-2 border-white/50 w-fit px-4 cursor-pointer text-base"
          icon={<Upload />}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Counter */}
        {mediaItems.length > 0 && (
          <p className="text-xs text-muted-foreground text-right">
            <span className="text-blue-400 font-semibold">{mediaItems.length}</span>{" "}
            / {MAX_MEDIA} media selected
          </p>
        )}

        {/* Preview Grid */}
        {mediaItems.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-black border border-white/10"
              >
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                      <Play className="w-2.5 h-2.5" /> Video
                    </div>
                  </>
                ) : (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100 bg-brand hover:bg-brand/80 text-primary rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Max reached message */}
        {isMaxed && (
          <div className="text-xs text-red-400 border border-red-400/30 bg-red-400/10 rounded-lg px-3 py-2 text-center">
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
            "relative flex flex-col items-center gap-3 rounded-xl px-6 py-8 text-white ring-1 ring-secondary ring-inset transition duration-100 ease-linear",
            isDragging ? "ring-blue-400 bg-blue-400/10" : "bg-primary",
            isMaxed
              ? "opacity-40 cursor-not-allowed"
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

          <div className="flex shrink-0 items-center justify-center bg-primary shadow-xs ring-1 ring-primary ring-inset size-10 rounded-lg text-white/60">
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
              <span className="text-brand font-semibold underline underline-offset-4">
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