"use client"

import { useEffect } from "react"
import { useRef, useState } from "react"

type CredentialFile = {
  id: string
  name: string
  sizeMb: string
}

function UploadCloudIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.875 20C4.97917 20 3.35938 19.3438 2.01562 18.0312C0.671875 16.7188 0 15.1146 0 13.2188C0 11.5938 0.489583 10.1458 1.46875 8.875C2.44792 7.60417 3.72917 6.79167 5.3125 6.4375C5.83333 4.52083 6.875 2.96875 8.4375 1.78125C10 0.59375 11.7708 0 13.75 0C16.1875 0 18.2552 0.848958 19.9531 2.54688C21.651 4.24479 22.5 6.3125 22.5 8.75C23.9375 8.91667 25.1302 9.53646 26.0781 10.6094C27.026 11.6823 27.5 12.9375 27.5 14.375C27.5 15.9375 26.9531 17.2656 25.8594 18.3594C24.7656 19.4531 23.4375 20 21.875 20H15C14.3125 20 13.724 19.7552 13.2344 19.2656C12.7448 18.776 12.5 18.1875 12.5 17.5V11.0625L10.5 13L8.75 11.25L13.75 6.25L18.75 11.25L17 13L15 11.0625V17.5H21.875C22.75 17.5 23.4896 17.1979 24.0938 16.5938C24.6979 15.9896 25 15.25 25 14.375C25 13.5 24.6979 12.7604 24.0938 12.1562C23.4896 11.5521 22.75 11.25 21.875 11.25H20V8.75C20 7.02083 19.3906 5.54688 18.1719 4.32812C16.9531 3.10938 15.4792 2.5 13.75 2.5C12.0208 2.5 10.5469 3.10938 9.32812 4.32812C8.10938 5.54688 7.5 7.02083 7.5 8.75H6.875C5.66667 8.75 4.63542 9.17708 3.78125 10.0312C2.92708 10.8854 2.5 11.9167 2.5 13.125C2.5 14.3333 2.92708 15.3646 3.78125 16.2188C4.63542 17.0729 5.66667 17.5 6.875 17.5H10V20H6.875Z"
        fill="white"
      />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 16H12V14H4V16ZM4 12H12V10H4V12ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H10L16 6V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2ZM9 7V2H2V18H14V7H9ZM2 2V7V2V7V18V2Z"
        fill="white"
      />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14ZM3 3V16V3Z"
        fill="white"
      />
    </svg>
  )
}

export default function CertificationsAndCredentials() {
  const [files, setFiles] = useState<CredentialFile[]>([])
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const storageKey = "coach-profile-certifications"

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const parsed = JSON.parse(raw) as CredentialFile[]
        if (Array.isArray(parsed)) {
          setFiles(parsed)
        }
      }
    } catch {
      setFiles([])
    } finally {
      setHasLoadedStorage(true)
    }
  }, [])

  useEffect(() => {
    if (!hasLoadedStorage) return
    localStorage.setItem(storageKey, JSON.stringify(files))
  }, [files, hasLoadedStorage])

  const handleSelect = (selected: FileList | null) => {
    if (!selected) return

    const next = Array.from(selected).map((file, index) => ({
      id: `${file.name}-${file.size}-${index}-${Date.now()}`,
      name: file.name,
      sizeMb: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    }))

    setFiles((prev) => [...prev, ...next])
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  return (
    <section className="rounded-2xl border border-white/8 bg-secondary/20 p-5 text-white md:p-6">
      <div className="pb-4">
        <h3 className="text-lg font-semibold text-white">
          Credentials &amp; Certifications
        </h3>
        <div className="mt-3 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,transparent_12px,transparent_22px)]" />
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-1 flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-secondary/10 px-6 py-8 text-center transition-colors hover:bg-secondary/20"
      >
        <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-white/15">
          <UploadCloudIcon />
        </span>
        <p className="text-[27px] leading-[120%] font-medium text-white">
          Upload Certification Files
        </p>
        <p className="mt-1 text-[20px] leading-[120%] text-white/55">
          PDF, JPG, or PNG up to 10MB
        </p>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,image/png,image/jpeg"
        multiple
        className="hidden"
        onChange={(event) => handleSelect(event.target.files)}
      />

      <div className="mt-4 space-y-2">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-3 rounded-md border border-white/8 bg-secondary/10 px-3 py-2"
          >
            <DocumentIcon />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[21px] leading-[120%] text-white">
                {file.name}
              </p>
              <p className="text-[18px] leading-[120%] text-white/55">
                {file.sizeMb}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeFile(file.id)}
              className="shrink-0 rounded p-1 text-white/75 transition-colors hover:text-white"
              aria-label="Remove file"
            >
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
