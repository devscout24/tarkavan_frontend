"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"
import CommonBtn from "@/components/common/common-btn"
import ShareModal from "@/components/common/modal/all-modals/share-modal"

type ProfileShareButtonProps = {
  url?: string
  title?: string
}

export default function ProfileShareButton({
  url = "",
  title = "",
}: ProfileShareButtonProps) {
  const [openShareModal, setOpenShareModal] = useState(false)

  return (
    <>
      <CommonBtn
        size={"lg"}
        variant={"default"}
        text="Profile Share"
        icon={<Share2 />}
        onClick={() => setOpenShareModal(true)}
        className="w-fit bg-brand px-5 text-primary hover:bg-brand hover:text-primary"
      />

      <ShareModal
        key={url || "club-profile-share"}
        open={openShareModal}
        onOpenChange={setOpenShareModal}
        url={url}
        title={title}
      />
    </>
  )
}
