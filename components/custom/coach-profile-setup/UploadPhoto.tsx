"use client"

import { useEffect, useMemo, useState } from "react"
import CommonUploadPhoto from "@/components/common/upload-photo"
import Image from "next/image"

export default function UploadPhoto() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const previewUrl = useMemo(() => {
    if (!selectedFile) return ""
    return URL.createObjectURL(selectedFile)
  }, [selectedFile])

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

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
          onFileSelect={(file) => setSelectedFile(file)}
        />
      </div>

      {previewUrl ? (
        <div className="mt-5 flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <Image
              src={previewUrl}
              alt="Selected coach profile"
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Photo Selected</p>
            <p className="text-xs text-white/60">
              {selectedFile?.name ?? "No file selected"}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
