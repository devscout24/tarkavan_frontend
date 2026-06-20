"use client"

import CommonBtn from "@/components/common/common-btn"
import VisibilityEdit from "@/components/common/visibility-edit"
import { Card } from "@/components/ui/card"
import { captureAndSave } from "@/lib/captureAndSave"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { BsDownload } from "react-icons/bs"

export default function ProfileHeaderBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleEditProfile = () => {
    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.set("edit-coach-profile", "true")
    router.replace(`${pathname}?${nextParams.toString()}`)
  }

  const user = localStorage.getItem("go_elite_user")
    ? JSON.parse(localStorage.getItem("go_elite_user")!)
    : null

  return (
    <Card className="mb-5 flex-col items-start gap-3 rounded-[12px] border border-secondary/60 bg-secondary/40 px-5 py-3 sm:flex-row sm:items-center sm:justify-between xl:mb-6 xl:px-6 xl:py-4 2xl:mb-7 2xl:px-7 2xl:py-4.5">
      <VisibilityEdit />

      <div className="flex items-center gap-4">
        <CommonBtn
          size={"lg"}
          variant={"default"}
          onClick={() =>
            captureAndSave({
              elementId: "coach_og_image",
              fileName: "coach-profile-card.png",
              userId: user?.profile_id,
            })
          }
          text="Get Profile Card"
          icon={<BsDownload />}
          className="w-fit border border-secondary bg-transparent px-3 text-white hover:bg-transparent"
        />

        <CommonBtn
          text="Edit Profile"
          className="py-5  w-fit rounded-[8px] bg-brand px-4 font-medium text-primary hover:bg-brand   xl:px-5 xl:text-base   2xl:px-6 2xl:text-lg"
          size="sm"
          variant="default"
          onClick={handleEditProfile}
        />
      </div>
    </Card>
  )
}
