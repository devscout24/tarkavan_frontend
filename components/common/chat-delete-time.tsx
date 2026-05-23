"use client"
import { deleteChat } from "@/app/(dashboards)/common-pages/chat/action"
import { TChatMessage } from "@/types"
import moment from "moment"
import React from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { CiTrash } from "react-icons/ci"
import { toast } from "sonner"

export default function ChatDeleteTime({ message }: { message: TChatMessage }) {
  const [loading, setLoading] = React.useState(false)
  const handleDeleteMessage = async (messageId: string) => {
    try {
      setLoading(true)
      const res = await deleteChat(messageId) 
      if(res && "success" in res && res.success && res.data?.status){
        toast.success(res.data.message || "Message deleted successfully") 
        setLoading(false)
        return
      } 
    } catch (err) {
      setLoading(false)
      console.error("Error deleting message:", err)
    }
  }

  return (
    <div className="mt-1 flex items-center justify-between gap-4">
      <p className="text-[12px]! text-secondary!">
        {moment.utc(message.created_at).local().fromNow()}
      </p>

      <div className="cursor-pointer">
        {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <CiTrash onClick={() => handleDeleteMessage(message.id)} />}
      </div>
    </div>
  )
}
