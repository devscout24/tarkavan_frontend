"use client"

import { useEffect, useRef, useState } from "react"
import RecruitmentSection from "./component/recruitment-section"
import { type RecruitmentCardData } from "./component/recruitment-card" 
import Link from "next/link"
import { Plus } from "lucide-react"
import { getRecruitmentList } from "./action"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function RecruitmentClient() {
  const [coachRecruitments, setCoachRecruitments] = useState<RecruitmentCardData[]>([])
  const [playerRecruitments, setPlayerRecruitments] = useState<RecruitmentCardData[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRecruitments = async () => {
    try{
      const res = await getRecruitmentList()
      console.log(res)
      
      if (res && 'success' in res && res.success && res.data && 'data' in res.data && res.data.data) {
        const recruitments = res.data.data
        const newCoachRecruitments: RecruitmentCardData[] = []
        const newPlayerRecruitments: RecruitmentCardData[] = []
        
        // Separate recruitments by type
        recruitments.forEach((recruitment: {
          id: number;
          recruitment_type: string;
          player_position?: { id: number; name: string };
          coach_position?: { id: number; name: string };
          club_team?: { id: number; name: string };
          experience: string;
          end_date: string;
          description: string;
          upto_age: number;
        }) => {
          const cardData: RecruitmentCardData = {
            id: recruitment.id.toString(),
            clubName: "Your Club",
            title: recruitment.recruitment_type === "player" ? "Looking For Players" : "Looking For Coaches",
            role: recruitment.recruitment_type === "player" 
              ? recruitment.player_position?.name || "Position"
              : recruitment.coach_position?.name || "Coach Position",
            meta: `${recruitment.club_team?.name || "Team"} | ${recruitment.recruitment_type === "player" ? `Age: U${recruitment.upto_age}` : `Experience: ${recruitment.experience}+ years`}`,
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
  }

  useEffect(() => {
    fetchRecruitments()

    // Listen for recruitment deletion events
    const handleRecruitmentDeleted = () => {
      fetchRecruitments()
    }

    const handleRecruitmentCreated = () => {
      fetchRecruitments()
    }

    window.addEventListener('recruitmentDeleted', handleRecruitmentDeleted )
    window.addEventListener('recruitmentCreated', handleRecruitmentCreated)
    
    return () => {
      window.removeEventListener('recruitmentDeleted', handleRecruitmentDeleted)
      window.removeEventListener('recruitmentCreated', handleRecruitmentCreated)
    }
  }, [])

  const [visible, setVisible] = useState(false);
const [position, setPosition] = useState({ x: 0, y: 0 });
const divRef = useRef<HTMLDivElement>(null);

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = divRef?.current?.getBoundingClientRect();
    if (bounds) {
        setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-white">Loading recruitments...</div>
      </div>
    )
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-end mt-1 mr-1">
        <Link href="?add-new=recruitment" className="w-fit flex items-center gap-2 text-primary bg-brand hover:bg-brand hover:text-primary px-5 py-2 rounded-[5px]">
          <Plus/> Add New Recruit
        </Link>
      </div>
      
      {coachRecruitments.length > 0 &&
        <RecruitmentSection
          addLabel="Coach Recruitments"
          items={coachRecruitments}
        />
      }

      {playerRecruitments.length > 0 && 
        <RecruitmentSection
          addLabel="Player Recruitments"
          items={playerRecruitments}
        />
      }

      {coachRecruitments.length === 0 && playerRecruitments.length === 0 && (
<div  ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
            className="relative w-80 h-96 rounded-xl p-px bg-gray-900 backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer mx-auto    "
        >
                <div className={`pointer-events-none blur-3xl rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-300 size-60 absolute z-0 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ top: position.y - 120, left: position.x - 120, }}
                />

            <div className="relative z-10 bg-gray-900/75 p-6 h-full w-full rounded-[11px] flex flex-col items-center justify-center text-center">
                <Image src="/images/main-logo.jpg" alt="Profile Avatar" className="w-24 h-24 rounded-full shadow-md my-4" width={96} height={96} />
                <h2 className="text-2xl font-bold text-white mb-1">Not Found</h2>
                <p className="text-sm text-brand font-medium mb-4">Recruitments</p>
                <p className="text-sm text-slate-400 mb-4 px-4">
                    You haven’t created any recruitment posts yet. Start by adding one.
                </p>
                <div className="flex space-x-4 mb-4 text-xl text-slate-400">
                    
                    <Link href="/club/recruitment?add-new=recruitment" className="bg-brand text-primary hover:bg-brand/90 mt-5 py-3 px-5  text-base rounded-lg    " >Add Recruitment</Link>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}
