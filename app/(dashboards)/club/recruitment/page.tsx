import RecruitmentSection from "./component/recruitment-section"
import { type RecruitmentCardData } from "./component/recruitment-card" 
import Link from "next/link"
import { Plus } from "lucide-react"

const coachRecruitments: RecruitmentCardData[] = [
  {
    id: "coach-seek-1",
    clubName: "CANADA STRIKERS FC",
    title: "Looking For Players",
    role: "Defender, Winger",
    meta: "Elite U16 | Age: U16",
    tryoutsText: "Tryouts: March 15-18, 2026",
    description: "Looking for skilled defenders for upcoming season.",
  },
]

const playerRecruitments: RecruitmentCardData[] = [
  {
    id: "player-seek-1",
    clubName: "CANADA STRIKERS FC",
    title: "Looking For Coaches",
    role: "Assistant Coach",
    meta: "Elite U16 | Experience: 3+ years",
    tryoutsText: "Tryouts: March 15-18, 2026",
    description: "Looking for experienced assistant coach.",
  },
]

export default function Page() {
  return (
    <div className="space-y-6 ">

      <div className="flex justify-end mt-1 mr-1   ">
        <Link href="?add-new=recruitment" className="w-fit flex items-center gap-2 text-primary bg-brand hover:bg-brand hover:text-primary px-5 py-2 rounded-[5px]   "> <Plus/>  Add New Recruit</Link>
      </div>
      <RecruitmentSection
        addLabel="Coach Recruitments"
        items={coachRecruitments}
      />
      <RecruitmentSection
        addLabel="Player Recruitments"
        items={playerRecruitments}
      />
    </div>
  )
}
