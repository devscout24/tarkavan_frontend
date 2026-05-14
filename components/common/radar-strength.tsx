"use client"
import { TPlayerStrength } from "@/types"
import CommonBtn from "./common-btn"
import { endorseProfile } from "@/app/(public)/profile/action"
import { useParams } from "next/navigation"
import { useState } from "react"
import { set } from "date-fns"
import { toast } from "sonner"

export default function RadarStrength({
  strengths,
  isPublic = false,
}: {
  strengths: TPlayerStrength[]
  isPublic?: boolean
}) {
  const params = useParams()
  const userID = params?.playerid
  const [loading, setLoading] = useState(false)

  const handleEndorse = async ({
    strengthId,
    strength_count,
  }: {
    strengthId: string
    strength_count: string
  }) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("player_strength_id", strengthId)
      formData.append("athlete_profile_id", String(userID))
      formData.append("strength_count", strength_count)
      const res = await endorseProfile(formData)

      console.log(res)
      if(res && "success" in res && "data" in res) {
        if(res.success && res.data?.status) { 
          toast.success(res.data?.data || "Strength endorsed successfully!")
          // window.dispatchEvent(new CustomEvent("publicProfileUpdated"))
        } else {
          toast.error(res.data?.message || "Something went wrong!")
        }
      } else if(res && "status" in res) {
        toast.error(res.message || "Something went wrong!")
      } else {
        toast.error("Something went wrong!")
      }
      setLoading(false)
    } catch (err) {
      console.error("Error endorsing strength:", err)
      setLoading(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-white/40">
      <h3 className="bg-secondary py-3.25 text-center text-base font-semibold text-white">
        Your Top 5 Strengths
      </h3>

      <ul className=" ">
        {strengths?.map((item) => (
          <li
            key={item.strength_name}
            className="flex items-center justify-between border-b border-secondary/70 bg-secondary/30 px-4 py-2 text-sm font-medium text-white"
          >
            <span className="text-[14px] text-white/70">
              {item.strength_name}
            </span>
            {isPublic ? (
              <div className="flex">
                <p className="rounded-md border border-brand px-2 py-1 text-center text-brand">
                  {item.endorse_count}
                </p>
                <CommonBtn
                  text="Endorse"
                  size={"sm"}
                  variant={"outline"}
                  disabled={loading} 
                  onClick={() =>
                    handleEndorse({
                      strengthId: String(item.id),
                      strength_count: String(item.endorse_count+1),
                    })
                  }
                  className="ml-2 w-fit cursor-pointer border-brand bg-brand px-2 font-semibold text-primary hover:bg-brand/80"
                />
              </div>
            ) : (
              <span className="font-[14px] text-brand">
                Endorse ({item.endorse_count})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
