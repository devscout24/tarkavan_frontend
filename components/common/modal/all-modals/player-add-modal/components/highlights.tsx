import { useEffect, useState } from "react"
import CommonBtn from "@/components/common/common-btn"
import { Icon } from "@/components/custom/Icon"
import UploadReel from "./upload-reel"
import { Badge } from "@/components/ui/badge"
import ModalStepHeader from "@/components/common/modal-header"
import type { WizardState } from "../types"

const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024

type UploadedItem = {
  id: string
  title: string
  type: "video" | "link"
  source?: "youtube" | "hudl" | "vimeo"
  file?: File
}

type ShowcaseOption = {
  id: "hudl" | "youtube" | "vimeo"
  label: string
}

const showcaseOptions: ShowcaseOption[] = [
  { id: "hudl", label: "Hudl Profile" },
  { id: "youtube", label: "YouTube Highlights" },
  { id: "vimeo", label: "Vimeo" },
]

type ShowcaseSource = {
  source: "youtube" | "hudl" | "vimeo"
}

const sourceBadgeLabel: Record<ShowcaseSource["source"], string> = {
  youtube: "YouTube",
  vimeo: "Vimeo",
  hudl: "Hudl",
}

export default function Highlights({
  currentStep,
  totalSteps,
  draft,
  onDraftChange,
}: {
  currentStep: number
  totalSteps: number
  draft: WizardState["forms"]["highlights"]
  onDraftChange: (value: WizardState["forms"]["highlights"]) => void
}) {
  const [showcaseValue, setShowcaseValue] = useState(draft.showcaseValue)
  const [uploadError, setUploadError] = useState("")
  const [showcaseError, setShowcaseError] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [selectedShowcaseSource, setSelectedShowcaseSource] = useState<
    ShowcaseSource["source"] | null
  >(draft.selectedShowcaseSource)
  const [uploadedItems, setUploadedItems] = useState<UploadedItem[]>(
    draft.uploadedItems
  )

  useEffect(() => {
    onDraftChange({
      showcaseValue,
      selectedShowcaseSource,
      uploadedItems,
    })
  }, [showcaseValue, selectedShowcaseSource, uploadedItems, onDraftChange])

  const handleFileUpload = (files: File[]) => {
    if (files.length === 0) {
      return
    }

    setUploadError("")
    setSubmitError("")
    const nextItems = files.map((file, index) => ({
      id: `uploaded-${Date.now()}-${index}`,
      title: file.name,
      type: "video" as const,
      file,
    }))

    setUploadedItems((prev) => [...nextItems, ...prev])
  }

  const handleAddShowcase = () => {
    const normalized = showcaseValue.trim()

    if (!selectedShowcaseSource) {
      setShowcaseError("Please choose a platform first.")
      return
    }

    if (!normalized) {
      setShowcaseError("Please add a valid external link.")
      return
    }

    setShowcaseError("")
    setSubmitError("")
    setUploadedItems((prev) => [
      {
        id: `showcase-${Date.now()}`,
        title: normalized,
        type: "link",
        source: selectedShowcaseSource,
      },
      ...prev,
    ])
    setShowcaseValue("")
  }

  const handleRemoveUploadedItem = (itemId: string) => {
    setUploadedItems((prev) => prev.filter((item) => item.id !== itemId))
    setSubmitError("")
  }

  return (
    <div className="w-full rounded-2xl bg-[#090B10] p-4 text-white sm:p-6 md:p-8">
      <ModalStepHeader
        title={"Add New Children"}
        subtitle={"Start by defining the athlete's core identity profile."}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      <div className="mt-5 pb-6">
        <h3 className="text-[20px] leading-[150%] font-bold text-white">
          Highlights
        </h3>
        <p className="text-[14px] leading-[150%] font-normal text-white/70">
          Upload videos, photos, or external links to showcase skills.
        </p>
        <div className="mt-4 mb-8 h-px w-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.2)_0_8px,transparent_8px_16px)]" />

        <UploadReel
          maxFileSizeBytes={MAX_FILE_SIZE_BYTES}
          onFilesSelect={handleFileUpload}
          onValidationError={setUploadError}
          subtitle="Drag and drop your MP4, MOV files here or
click to browse. Max size 500MB."
        />

        {uploadError && (
          <p className="mt-2 text-[12px] leading-[150%] font-normal text-red-400">
            {uploadError}
          </p>
        )}

        <div className="mt-5 rounded-xl border border-white/10 p-4 sm:p-5">
          <h4 className="text-[16px] leading-[150%] font-medium text-white">
            Add External Showcase
          </h4>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-11 flex-1 items-center gap-2 rounded-xl bg-secondary/40 px-4">
              <Icon
                width="20"
                height="10"
                viewBox="0 0 20 10"
                aria-hidden="true"
              >
                <path
                  d="M9 10H5C3.61667 10 2.4375 9.5125 1.4625 8.5375C0.4875 7.5625 0 6.38333 0 5C0 3.61667 0.4875 2.4375 1.4625 1.4625C2.4375 0.4875 3.61667 0 5 0H9V2H5C4.16667 2 3.45833 2.29167 2.875 2.875C2.29167 3.45833 2 4.16667 2 5C2 5.83333 2.29167 6.54167 2.875 7.125C3.45833 7.70833 4.16667 8 5 8H9V10ZM6 6V4H14V6H6ZM11 10V8H15C15.8333 8 16.5417 7.70833 17.125 7.125C17.7083 6.54167 18 5.83333 18 5C18 4.16667 17.7083 3.45833 17.125 2.875C16.5417 2.29167 15.8333 2 15 2H11V0H15C16.3833 0 17.5625 0.4875 18.5375 1.4625C19.5125 2.4375 20 3.61667 20 5C20 6.38333 19.5125 7.5625 18.5375 8.5375C17.5625 9.5125 16.3833 10 15 10H11Z"
                  fill="white"
                />
              </Icon>

              <input
                value={showcaseValue}
                onChange={(event) => setShowcaseValue(event.target.value)}
                placeholder="Paste YouTube, Hudl, or Vimeo link here"
                className="w-full border-0 bg-transparent text-[14px] leading-normal font-normal text-white placeholder:text-white/70 focus:outline-none"
              />
            </div>

            <CommonBtn
              variant="default"
              size="sm"
              text="Add Link"
              onClick={handleAddShowcase}
              className="h-11 w-32 cursor-pointer rounded-xl bg-brand px-5 text-[16px] font-semibold text-[#111308] transition-all hover:bg-brand/90"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {showcaseOptions.map((item) => {
              const isSelected = selectedShowcaseSource === item.id

              return (
                <Badge
                  key={item.id}
                  onClick={() => {
                    setSelectedShowcaseSource(item.id)
                    setShowcaseError("")
                  }}
                  className={`h-6 cursor-pointer rounded-full border px-2 py-1 text-[12px] leading-[133.333%] font-medium ${
                    isSelected
                      ? "border-[#C6F57A] bg-[#C6F57A] text-[#060807]"
                      : "border-white/20 bg-white/10 text-white"
                  }`}
                >
                  <Icon
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.375 8.45833L8.45833 5.83333L4.375 3.20833V8.45833ZM5.83333 11.6667C5.02639 11.6667 4.26806 11.5135 3.55833 11.2073C2.84861 10.901 2.23125 10.4854 1.70625 9.96042C1.18125 9.43542 0.765625 8.81806 0.459375 8.10833C0.153125 7.39861 0 6.64028 0 5.83333C0 5.02639 0.153125 4.26806 0.459375 3.55833C0.765625 2.84861 1.18125 2.23125 1.70625 1.70625C2.23125 1.18125 2.84861 0.765625 3.55833 0.459375C4.26806 0.153125 5.02639 0 5.83333 0C6.64028 0 7.39861 0.153125 8.10833 0.459375C8.81806 0.765625 9.43542 1.18125 9.96042 1.70625C10.4854 2.23125 10.901 2.84861 11.2073 3.55833C11.5135 4.26806 11.6667 5.02639 11.6667 5.83333C11.6667 6.64028 11.5135 7.39861 11.2073 8.10833C10.901 8.81806 10.4854 9.43542 9.96042 9.96042C9.43542 10.4854 8.81806 10.901 8.10833 11.2073C7.39861 11.5135 6.64028 11.6667 5.83333 11.6667ZM5.83333 10.5C7.13611 10.5 8.23958 10.0479 9.14375 9.14375C10.0479 8.23958 10.5 7.13611 10.5 5.83333C10.5 4.53056 10.0479 3.42708 9.14375 2.52292C8.23958 1.61875 7.13611 1.16667 5.83333 1.16667C4.53056 1.16667 3.42708 1.61875 2.52292 2.52292C1.61875 3.42708 1.16667 4.53056 1.16667 5.83333C1.16667 7.13611 1.61875 8.23958 2.52292 9.14375C3.42708 10.0479 4.53056 10.5 5.83333 10.5Z"
                      fill={isSelected ? "#060807" : "white"}
                    />
                  </Icon>
                  {item.label}
                </Badge>
              )
            })}
          </div>

          {showcaseError && (
            <p className="mt-2 text-[12px] leading-[150%] font-normal text-red-400">
              {showcaseError}
            </p>
          )}
        </div>

        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="text-[16px] leading-[150%] font-medium text-white">
              Uploaded Content ({uploadedItems.length})
            </h4>
            <button
              type="button"
              className="text-[16px] leading-[150%] font-medium text-white"
            >
              Manage All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {uploadedItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="relative h-28 max-w-73 overflow-hidden rounded-xl border border-white/20 bg-[#CBD5E1]"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveUploadedItem(item.id)}
                  aria-label="Remove uploaded content"
                  className="absolute top-2 left-2 z-10 inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-brand text-[11px] leading-none font-bold text-[#DB0000]"
                >
                  X
                </button>

                {item.source && (
                  <Badge className="absolute top-2 right-2 h-5 rounded bg-[#FF0000] px-2 text-[8px] font-semibold text-white uppercase">
                    {sourceBadgeLabel[item.source]}
                  </Badge>
                )}

                <div className="flex h-full w-full items-center justify-center">
                  <Icon
                    width="30"
                    height="24"
                    viewBox="0 0 30 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 0L6 6H10.5L7.5 0H10.5L13.5 6H18L15 0H18L21 6H25.5L22.5 0H27C27.825 0 28.5312 0.29375 29.1187 0.88125C29.7062 1.46875 30 2.175 30 3V21C30 21.825 29.7062 22.5312 29.1187 23.1187C28.5312 23.7062 27.825 24 27 24H3C2.175 24 1.46875 23.7062 0.88125 23.1187C0.29375 22.5312 0 21.825 0 21V3C0 2.175 0.29375 1.46875 0.88125 0.88125C1.46875 0.29375 2.175 0 3 0ZM3 9V21H27V9H3ZM3 9V21V9Z"
                      fill="#94A3B8"
                    />
                  </Icon>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-9 bg-linear-to-t from-black/80 to-black/0 px-2 py-1.5">
                  <p className="truncate text-[12px] leading-[133.333%] font-medium text-white">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {submitError && (
          <p className="mt-3 text-[12px] leading-[150%] font-normal text-red-400">
            {submitError}
          </p>
        )}
      </div>
    </div>
  )
}
