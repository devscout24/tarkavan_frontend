"use client"

import { useEffect, useRef, useState } from "react"
import CommonUploadPhoto from "@/components/common/upload-photo"
import Image from "next/image"
import { Icon } from "@/components/custom/Icon"

export default function UploadPhoto() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [fileName, setFileName] = useState<string>("")
  const fileReaderRef = useRef<FileReader | null>(null)

  // Load image from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem("coachProfileImage")
    const savedFileName = localStorage.getItem("coachProfileImageName")
    if (savedImage) {
      setPreviewUrl(savedImage)
      setFileName(savedFileName || "")
    }
  }, [])

  // Save image to localStorage when previewUrl changes (and is not empty)
  useEffect(() => {
    if (previewUrl) {
      localStorage.setItem("coachProfileImage", previewUrl)
      localStorage.setItem("coachProfileImageName", fileName)
    } else {
      localStorage.removeItem("coachProfileImage")
      localStorage.removeItem("coachProfileImageName")
    }
  }, [previewUrl, fileName])

  // Handle file selection and convert to base64
  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setFileName(file.name)
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
          <div
            className="relative flex items-center justify-center rounded-2xl border-2 border-dashed border-white/40 bg-white/5 p-4"
            style={{ width: 96, height: 96 }}
          >
            <Image
              src={previewUrl}
              alt="Selected coach profile"
              width={80}
              height={80}
              className="rounded-full object-cover"
              style={{ width: 80, height: 80 }}
            />
            <button
              type="button"
              aria-label="Remove image"
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow hover:bg-red-700"
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
