"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import RecruitmentSection from "./component/recruitment-section"
import { type RecruitmentCardData } from "./component/recruitment-card"
import Link from "next/link"
import { Plus } from "lucide-react"
import { getRecruitmentList } from "./action"
import Image from "next/image"

export default function RecruitmentClient() {
  const [coachRecruitments, setCoachRecruitments] = useState<RecruitmentCardData[]>([])
  const [playerRecruitments, setPlayerRecruitments] = useState<RecruitmentCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const divRef = useRef<HTMLDivElement>(null)

  const fetchRecruitments = useCallback(async () => {
    try {
      const res = await getRecruitmentList()

      if (res && "success" in res && res.success && res.data && "data" in res.data && res.data.data) {
        const recruitments = res.data.data
        const newCoachRecruitments: RecruitmentCardData[] = []
        const newPlayerRecruitments: RecruitmentCardData[] = []

        recruitments.forEach((recruitment: {
          id: number
          recruitment_type: string
          player_position?: { id: number; name: string }
          coach_position?: { id: number; name: string }
          club_team?: { id: number; name: string }
          experience: string
          end_date: string
          description: string
          upto_age: number
        }) => {
          const cardData: RecruitmentCardData = {
            id: recruitment.id.toString(),
            clubName: "Your Club",
            title: recruitment.recruitment_type === "player" ? "Looking For Players" : "Looking For Coaches",
            role: recruitment.recruitment_type === "player"
              ? recruitment.player_position?.name || "Position"
              : recruitment.coach_position?.name || "Coach Position",
            meta: `${recruitment.club_team?.name || "Team"} | ${
              recruitment.recruitment_type === "player"
                ? `Age: U${recruitment.upto_age}`
                : `Experience: ${recruitment.experience}+ years`
            }`,
            tryoutsText: `Tryouts: ${new Date(recruitment.end_date).toLocaleDateString()}`,
            description: recruitment.description,
          }

          if (recruitment.recruitment_type === "coach") {
            newCoachRecruitments.push(cardData)
          } else {
            newPlayerRecruitments.push(cardData)
          }
        })

        setCoachRecruitments(newCoachRecruitments)
        setPlayerRecruitments(newPlayerRecruitments)
      }
    } catch (error) {
      console.error("Error fetching recruitments:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRecruitments()
    window.addEventListener("recruitmentEvent", fetchRecruitments)
    return () => {
      window.removeEventListener("recruitmentEvent", fetchRecruitments)
    }
  }, [fetchRecruitments])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = divRef.current?.getBoundingClientRect()
    if (bounds) {
      setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top })
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="text-white">Loading recruitments...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mr-1 mt-1 flex justify-end">
        <Link
          href="?add-new=recruitment"
          className="flex w-fit items-center gap-2 rounded-[5px] bg-brand px-5 py-2 text-primary hover:bg-brand hover:text-primary"
        >
          <Plus /> Add New Recruit
        </Link>
      </div>

      {coachRecruitments.length > 0 && (
        <RecruitmentSection addLabel="Coach Recruitments" items={coachRecruitments} />
      )}

      {playerRecruitments.length > 0 && (
        <RecruitmentSection addLabel="Player Recruitments" items={playerRecruitments} />
      )}

      {coachRecruitments.length === 0 && playerRecruitments.length === 0 && (
        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="relative mx-auto h-96 w-80 cursor-pointer overflow-hidden rounded-xl bg-gray-900 p-px shadow-lg backdrop-blur-md"
        >
          <div
            className={`pointer-events-none absolute z-0 size-60 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-300 blur-3xl transition-opacity duration-500 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ top: position.y - 120, left: position.x - 120 }}
          />
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-[11px] bg-gray-900/75 p-6 text-center">
            <Image
              src="/images/main-logo.jpg"
              alt="Profile Avatar"
              className="my-4 h-24 w-24 rounded-full shadow-md"
              width={96}
              height={96}
            />
            <h2 className="mb-1 text-2xl font-bold text-white">Not Found</h2>
            <p className="mb-4 text-sm font-medium text-brand">Recruitments</p>
            <p className="mb-4 px-4 text-sm text-slate-400">
              You haven't created any recruitment posts yet. Start by adding one.
            </p>
            <Link
              href="/club/recruitment?add-new=recruitment"
              className="mt-5 rounded-lg bg-brand px-5 py-3 text-base text-primary hover:bg-brand/90"
            >
              Add Recruitment
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}