"use client"

import {
  formatBytes,
  useFileUpload,
  type FileWithPreview,
} from "@/hooks/use-file-upload"
import { Alert, AlertDescription, AlertTitle } from "@/components/reui/alert"
import { cn } from "@/lib/utils"
import { Camera, CircleAlertIcon, Trash2, User, UploadCloud } from "lucide-react"
import { TPlayerProfilePayload } from "../type"
import { useEffect } from "react"

interface AvatarUploadProps {
  maxSize?: number
  className?: string
  onFileChange?: (file: FileWithPreview | null) => void
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}

export function UploadAvatar({
  maxSize = 2 * 1024 * 1024, // 2MB
  className,
  onFileChange,
  payload,
  setPayload,
}: AvatarUploadProps) {
  const [
    { files, isDragging, errors },
    {
      removeFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept: "image/*",
    multiple: false,
    onFilesChange: (fileList) => {
      onFileChange?.(fileList[0] || null)
    },
  })

  const currentFile = files[0]
  const previewUrl =
    payload.profilePhotoPreview ||
    (typeof payload.profilePhoto === "string" ? payload.profilePhoto : "")

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentFile) {
      removeFile(currentFile.id)
    }
    setPayload((prev) => ({
      ...prev,
      profilePhoto: null,
      profilePhotoPreview: "",
    }))
  }

  useEffect(() => {
    if (!currentFile?.file) return
    if (!(currentFile.file instanceof File)) return

    const preview = URL.createObjectURL(currentFile.file)

    setPayload((prev) => {
      if (
        prev.profilePhoto === currentFile.file &&
        prev.profilePhotoPreview === preview
      ) {
        return prev
      }

      return {
        ...prev,
        profilePhoto: currentFile.file,
        profilePhotoPreview: preview,
      }
    })

    return () => URL.revokeObjectURL(preview)
  }, [currentFile, setPayload])

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-[#181E2B] p-5 shadow-sm",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Avatar Ring */}
        <div className="relative group cursor-pointer" onClick={openFileDialog}>
          <div
            className={cn(
              "relative size-24 rounded-full overflow-hidden border-2 transition-all duration-300 shadow-md",
              isDragging
                ? "border-brand scale-105 ring-4 ring-brand/20 bg-brand/10"
                : "border-white/20 group-hover:border-brand/70 bg-[#222A3B]",
              previewUrl && "border-brand/80 ring-2 ring-brand/20"
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input {...getInputProps()} className="sr-only" />

            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Player Avatar"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center text-white/50">
                <User className="size-8" />
              </div>
            )}

            {/* Hover Camera Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <Camera className="size-5 text-brand" />
              <span className="text-[10px] font-semibold text-white mt-1">Upload</span>
            </div>
          </div>

          {/* Remove Floating Button */}
          {(currentFile || previewUrl) && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-1 -right-1 z-10 flex size-6 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
              title="Remove profile image"
            >
              <Trash2 className="size-3" />
            </button>
          )}
        </div>

        {/* Info & Upload Button */}
        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-white">Official Player Photo</h4>
              <p className="text-xs text-white/60">
                Upload a clear headshot or match portrait (PNG, JPG, WEBP up to {formatBytes(maxSize)})
              </p>
            </div>

            <button
              type="button"
              onClick={openFileDialog}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#222A3B] px-4 py-2 text-xs font-semibold text-white transition-all hover:border-brand/40 hover:bg-[#2A344A] hover:text-brand"
            >
              <UploadCloud className="size-3.5 text-brand" />
              <span>{previewUrl ? "Change Photo" : "Upload Photo"}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] text-white/50">
            <span className="inline-flex items-center gap-1 rounded-md bg-[#222A3B] px-2 py-0.5 border border-white/5">
              1:1 Aspect Ratio
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-[#222A3B] px-2 py-0.5 border border-white/5">
              Status: {previewUrl ? "Photo Uploaded" : "No Photo"}
            </span>
          </div>
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-3">
          <CircleAlertIcon className="size-4" />
          <AlertTitle className="text-xs font-semibold">Upload Notice</AlertTitle>
          <AlertDescription className="text-xs">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
