"use client"

import { useEffect, useRef, useState } from "react"
import CommonUploadPhoto from "@/components/common/upload-photo"
import Image from "next/image"
import { Icon } from "@/components/custom/Icon"

interface UploadPhotoProps {
  updatePhotoUploaded?: (uploaded: boolean) => void
  onFileSelect?: (file: File | null) => void
  initialPreviewUrl?: string
}

export default function UploadPhoto({
  updatePhotoUploaded,
  onFileSelect,
  initialPreviewUrl,
}: UploadPhotoProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [fileName, setFileName] = useState<string>("")
  const fileReaderRef = useRef<FileReader | null>(null)

  // Notify parent when photo selection changes
  useEffect(() => {
    if (updatePhotoUploaded) {
      updatePhotoUploaded(!!previewUrl)
    }
  }, [previewUrl, updatePhotoUploaded])

  // initialize preview from prop (backend image)
  useEffect(() => {
    if (initialPreviewUrl) {
      setPreviewUrl(initialPreviewUrl)
      setFileName(initialPreviewUrl.split("/").pop() || "")
    }
  }, [initialPreviewUrl])

  // Handle file selection and convert to base64
  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setFileName(file.name)
    onFileSelect?.(file)
    const reader = new FileReader()
    fileReaderRef.current = reader
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Remove image handler
  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreviewUrl("")
    setFileName("")
    onFileSelect?.(null)
  }

  return (
    <div className="rounded-2xl text-white">
      <h3 className="text-lg font-semibold text-white">Upload Photo</h3>
      <p className="mt-1 text-sm text-white/70">
        Add a clear profile photo to help players and parents identify you.
      </p>

      <div className="mt-4 pb-5">
        <CommonUploadPhoto
          title="Choose Profile Image"
          subtitle="Upload JPG, PNG or WEBP up to 5MB"
          onFileSelect={handleFileSelect}
        />
      </div>

      {previewUrl ? (
        <div className="mt-5 flex items-center justify-center">
          <div className="group relative">
            <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-white/40 bg-white/5 p-1 transition-all duration-200 hover:border-white/60 hover:bg-white/10">
              <div
                className="relative overflow-hidden rounded-xl"
                style={{ width: 120, height: 120 }}
              >
                <Image
                  src={previewUrl}
                  alt="Selected coach profile"
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                  sizes="120px"
                  priority
                />
              </div>
            </div>
            <button
              type="button"
              aria-label="Remove image"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:bg-red-700"
            >
              <Icon
                width="14"
                height="14"
                viewBox="0 0 16 16"
                className="pointer-events-none"
              >
                <line
                  x1="4"
                  y1="4"
                  x2="12"
                  y2="12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="12"
                  y1="4"
                  x2="4"
                  y2="12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Icon>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
