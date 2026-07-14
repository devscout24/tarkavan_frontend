"use client"

import {
  formatBytes,
  useFileUpload,
  type FileWithPreview,
} from "@/hooks/use-file-upload"
import { Alert, AlertDescription, AlertTitle } from "@/components/reui/alert"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CircleAlertIcon, UserIcon, XIcon } from "lucide-react"
import { TPlayerProfilePayload } from "../type"
import { useEffect, useMemo } from "react"

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
    onFilesChange: (files) => {
      onFileChange?.(files[0] || null)
    },
  })

  const currentFile = files[0]
  const previewUrl = useMemo(() => {
    if (payload.profilePhoto instanceof File) {
      return URL.createObjectURL(payload.profilePhoto)
    }

    if (typeof payload.profilePhoto === "string") {
      return payload.profilePhoto
    }

    return ""
  }, [payload.profilePhoto])

  const handleRemove = () => {
    if (currentFile) {
      removeFile(currentFile.id)
      setPayload((prevPayload) => {
        if (prevPayload) {
          return { ...prevPayload, profilePhoto: null }
        }
        return prevPayload
      })
    }
  }

  useEffect(() => {
    if (!currentFile) return

    if (!(currentFile.file instanceof File)) return

    const preview = URL.createObjectURL(currentFile.file)

    setPayload((prev) => ({
      ...prev,
      profilePhoto: currentFile.file,
      profilePhotoPreview: preview,
    }))

    return () => URL.revokeObjectURL(preview)
  }, [currentFile])

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-3xl bg-[#161B22] py-2",
        className
      )}
    >
      {/* Avatar Preview */}
      <div className="relative">
        <div
          className={cn(
            "group/avatar relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/20",
            previewUrl && "border-solid"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input {...getInputProps()} className="sr-only" />

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <UserIcon className="size-6 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Remove Button - only show when file is uploaded */}
        {currentFile && (
          <Button
            size="icon"
            variant="outline"
            onClick={handleRemove}
            className="absolute inset-e-0.5 top-0.5 z-10 size-6 rounded-full bg-white dark:bg-zinc-800 hover:dark:bg-zinc-700"
            aria-label="Remove avatar"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
      </div>

      {/* Upload Instructions */}
      <div className="space-y-0.5 text-center">
        <p className="text-sm font-medium">
          {currentFile ? "Profile uploaded" : "Upload profile image"}
        </p>
        <p className="text-xs text-muted-foreground">
          PNG, JPG up to {formatBytes(maxSize)}
        </p>
        <p className="text-secondary!">Image can not save on progress</p>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-5">
          <CircleAlertIcon />
          <AlertTitle>File upload error(s)</AlertTitle>
          <AlertDescription>
            {errors.map((error, index) => (
              <p key={index} className="last:mb-0">
                {error}
              </p>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
