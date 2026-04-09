import { Award, Star, Trophy } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type AchievementIcon = "trophy" | "award" | "star"

export type AchievementItem = {
  id: string
  icon: AchievementIcon
  title: string
}

type AchievementProps = {
  title?: string
  achievements?: AchievementItem[]
  className?: string
}

const defaultAchievements: AchievementItem[] = [
  { id: "1", icon: "trophy", title: "League Champion 2024" },
  { id: "2", icon: "award", title: "Team Captain" },
  { id: "3", icon: "star", title: "MLS Next Tournament MVP" },
]

const iconMap = {
  trophy: Trophy,
  award: Award,
  star: Star,
}

export default function Achievement({
  title = "ACHIEVEMENTS",
  achievements = defaultAchievements,
  className,
}: AchievementProps) {
  return (
    <Card
      className={cn(
        "rounded-[22px] border border-brand/80 bg-[#151515] p-0 shadow-[0_0_0_1px_rgba(178,246,111,0.16)] mt-6  ",
        className
      )}
    >
      <CardHeader className="px-8 pt-8 pb-0">
        <CardTitle className="text-[24px] font-bold tracking-[0.2em] text-brand uppercase">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 px-8 py-8">
        {achievements.map((achievement) => {
          const Icon = iconMap[achievement.icon]

          return (
            <div key={achievement.id} className="flex items-center gap-8">
              <Icon className="size-5 shrink-0 text-[#f0ba2a]" />
              <span className="text-[28px] leading-tight font-medium text-white">
                {achievement.title}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
