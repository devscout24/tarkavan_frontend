"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function CredentialsCard(
  { coach_media }: { coach_media: { id: number; image: string }[] }
) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const openModal = (index: number) => setActiveIndex(index)
  const closeModal = () => setActiveIndex(null)

  const nextImage = () => {
    setActiveIndex((prev) => {
      if (prev === null) return 0

      return prev === coach_media.length - 1 ? 0 : prev + 1
    })
  }

  const prevImage = () => {
    setActiveIndex((prev) => {
      if (prev === null) return coach_media.length - 1

      return prev === 0 ? coach_media.length - 1 : prev - 1
    })
  }

  // keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return

      if (e.key === "Escape") closeModal()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [activeIndex])

  return (
    <>
      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <h5 className="text-2xl leading-[125%] font-medium text-white xl:text-3xl 2xl:text-[34px]">
          Certified Credentials
        </h5>

        <div className="mt-4 flex items-start gap-3 rounded-[10px] border border-secondary/60 bg-white/5 p-3 xl:gap-4 xl:p-4 2xl:p-5 w-fit h-fit">
          {coach_media.length > 0 ? (
            coach_media.map((media, index) => (
              <div
                key={media.id}
                onClick={() => openModal(index)}
                className="cursor-pointer p-2 border border-secondary rounded-md "
              >
                <Image
                  src={encodeURI(media.image)}
                  alt="credential"
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-white/70">
              No certified credentials available
            </p>
          )}
        </div>
      </Card>

      {/* MODAL */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeModal}
        >
          {/* LEFT ARROW */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-5 text-primary text-3xl bg-brand px-3 rounded-md  "
          >
            ‹
          </button>

          {/* IMAGE */}
          {/* IMAGE */}
          <div
            className="flex items-center justify-center border border-secondary rounded-md mb-24"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={coach_media[activeIndex].image}
              alt="preview"
              width={700}
              height={700}
              className="max-h-[75vh] w-auto object-contain rounded-lg transition-all duration-300"
            />
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-5 text-primary text-3xl bg-brand px-3 rounded-md      "
          >
            ›
          </button>

          {/* THUMB STRIP */}
          <div className="absolute bottom-5 flex gap-2 overflow-x-auto max-w-[90vw] p-2 z-10 ">
            {coach_media.map((media, index) => (
              <Image
                key={media.id}
                src={media.image}
                alt="thumb"
                width={60}
                height={60}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex(index)
                }}
                className={`cursor-pointer rounded-md border ${index === activeIndex
                  ? "border-white"
                  : "border-transparent opacity-60"
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}