"use client"

import CommonBtn from "@/components/common/common-btn"
import VisibilityEdit from "@/components/common/visibility-edit"
import { Card } from "@/components/ui/card"
import { captureAndSave } from "@/lib/captureAndSave"
import { selectProfileID } from "@/lib/features/userSlice"
import { useAppSelector } from "@/lib/hooks"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { BsDownload } from "react-icons/bs"
import { CgMenuGridO } from "react-icons/cg"
import { CiEdit } from "react-icons/ci"
import { IoCopyOutline } from "react-icons/io5"
import { toast } from "sonner"

export default function ProfileHeaderBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  const handleEditProfile = () => {
    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.set("edit-coach-profile", "true")
    router.replace(`${pathname}?${nextParams.toString()}`)
  }

  const user = localStorage.getItem("go_elite_user")
    ? JSON.parse(localStorage.getItem("go_elite_user")!)
    : null

  const [isOpen, setIsOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const profile_id = useAppSelector(selectProfileID)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <Card className="relative mb-5 flex-col items-start gap-3 overflow-visible rounded-[12px] border border-secondary/60 bg-secondary/40 px-5 py-3 sm:flex-row sm:items-center sm:justify-between xl:mb-6 xl:px-6 xl:py-4 2xl:mb-7 2xl:px-7 2xl:py-4.5">
      <VisibilityEdit />

      <div className="flex items-center gap-4">
        <div ref={boxRef} className="">
          <CommonBtn
            className={`cursor-pointer bg-brand text-primary hover:bg-brand`}
            icon={<CgMenuGridO className="size-6" />}
            variant={`default`}
            size={`sm`}
            onClick={() => setIsOpen((prev) => !prev)}
          />

          <div
            className={`absolute top-15 border border-brand/30 transition-all duration-300 ${isOpen ? "right-0" : "-right-50"} space-y-2 rounded-md bg-secondary/90 p-2`}
          >
            <CommonBtn
              text="Edit Profile"
              className="w-full cursor-pointer justify-start border border-secondary bg-transparent px-3 text-white hover:bg-brand/10"
              size="sm"
              variant="default"
              icon={<CiEdit />}
              onClick={handleEditProfile}
            />

            <CommonBtn
              size={"lg"}
              variant={"default"}
              onClick={() =>
                captureAndSave({
                  elementId: "coach_og_image",
                  fileName: "coach-profile-card.png",
                  userId: user?.profile_id,
                  setLoading: setLoading,
                })
              }
              isLoading={loading}
              disabled={loading}
              text="Get Profile Card"
              icon={<BsDownload />}
              className="w-full cursor-pointer border border-secondary bg-transparent px-3 text-white hover:bg-brand/10"
            />
            <CommonBtn
              size={"lg"}
              variant={"default"}
              onClick={async () => {
                if (!profile_id) {
                  toast.error("Profile ID not found. Please try again later.")
                  return
                }

                try {
                  await navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/profile/coach/${profile_id}`
                  )
                  toast.success("Profile link copied to clipboard!")
                } catch (error) {
                  console.error("Failed to copy:", error)
                  toast.error("Failed to copy the link. Please try again.")
                }
              }}
              text="Copy Link"
              icon={<IoCopyOutline />}
              className="w-full cursor-pointer justify-start border border-secondary bg-transparent px-3 text-white hover:bg-brand/10"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
