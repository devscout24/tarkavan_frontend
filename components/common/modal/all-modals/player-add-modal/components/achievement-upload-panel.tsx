"use client"

import { useRef } from "react"
import AddAchievementButton from "./achievement-add-button"
import type { WizardState } from "../types"

const ACHIEVEMENT_ACCEPT =
  "image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

type UploadedAchievementAsset = {
  id: string
  name: string
  type: string
  file?: File
}

export default function AchievementUploadPanel({
  value,
  onChange,
}: {
  value: WizardState["forms"]["achievements"]["uploadedAssets"]
  onChange: (
    value: WizardState["forms"]["achievements"]["uploadedAssets"]
  ) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const onFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])

    if (files.length === 0) {
      return
    }

    onChange([
      ...value,
      ...files.map((file, index) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${index}`,
        name: file.name,
        type: file.type || "file",
        file,
      })),
    ])

    event.target.value = ""
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={ACHIEVEMENT_ACCEPT}
        multiple
        onChange={onFilesSelected}
        className="hidden"
      />

      <button
        type="button"
        onClick={openFileDialog}
        className="mt-4 w-full rounded-xl border border-dashed border-white/20 bg-secondary/40 px-4 py-6 text-left transition-colors hover:bg-secondary/50 focus-visible:ring-0 focus-visible:outline-none"
      >
        <div className="mx-auto flex w-full max-w-56.75 flex-col items-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="32"
            viewBox="0 0 24 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8.5125 17.55L9.825 13.275L6.375 10.5H10.65L12 6.3L13.35 10.5H17.625L14.1375 13.275L15.45 17.55L12 14.8875L8.5125 17.55ZM3 31.5V19.9125C2.05 18.8625 1.3125 17.6625 0.7875 16.3125C0.2625 14.9625 0 13.525 0 12C0 8.65 1.1625 5.8125 3.4875 3.4875C5.8125 1.1625 8.65 0 12 0C15.35 0 18.1875 1.1625 20.5125 3.4875C22.8375 5.8125 24 8.65 24 12C24 13.525 23.7375 14.9625 23.2125 16.3125C22.6875 17.6625 21.95 18.8625 21 19.9125V31.5L12 28.5L3 31.5ZM12 21C14.5 21 16.625 20.125 18.375 18.375C20.125 16.625 21 14.5 21 12C21 9.5 20.125 7.375 18.375 5.625C16.625 3.875 14.5 3 12 3C9.5 3 7.375 3.875 5.625 5.625C3.875 7.375 3 9.5 3 12C3 14.5 3.875 16.625 5.625 18.375C7.375 20.125 9.5 21 12 21ZM6 27.0375L12 25.5L18 27.0375V22.3875C17.125 22.8875 16.1812 23.2812 15.1687 23.5688C14.1562 23.8563 13.1 24 12 24C10.9 24 9.84375 23.8563 8.83125 23.5688C7.81875 23.2812 6.875 22.8875 6 22.3875V27.0375Z"
              fill="white"
            />
          </svg>

          <p className="mt-4 text-[14px] leading-[107.143%] font-medium text-white">
            ACHIEVEMENTS ADD?
          </p>

          <p className="mt-2 text-[12px] leading-[150%] font-normal text-white/70">
            Showcase your child's milestones to give them an edge.
          </p>

          {value.length > 0 && (
            <p className="mt-3 text-[12px] leading-[150%] font-medium text-[#C6F57A]">
              {value.length} file{value.length > 1 ? "s" : ""} selected
            </p>
          )}
        </div>
      </button>
    </>
  )
}
