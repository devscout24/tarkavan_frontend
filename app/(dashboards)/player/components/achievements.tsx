import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Award, Star } from "lucide-react"

interface Achievement {
  id: string
  icon: "trophy" | "award" | "star"
  title: string
}

interface AchievementsProps {
  achievements?: Achievement[]
}

const defaultAchievements: Achievement[] = [
  { id: "1", icon: "trophy", title: "League Champion 2024" },
  { id: "2", icon: "award", title: "Team Captain" },
  { id: "3", icon: "star", title: "MLS Next Tournament MVP" },
]

const iconMap = {
  trophy: Trophy,
  award: Award,
  star: Star,
}

export default function Achievements({
  achievements = defaultAchievements,
}: AchievementsProps) {
  return (
    <Card className="mt-6  border border-secondary/20 bg-primary ">
      <CardHeader className="pb-0">
        <CardTitle className="text-xs font-semibold tracking-wider text-brand uppercase">
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {achievements.map((achievement) => {
          const IconComponent = iconMap[achievement.icon]
          return (
            <div key={achievement.id} className="flex items-center gap-3">
              <IconComponent className="size-5 text-brand" />
              <span className="text-sm font-medium text-white">
                {achievement.title}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
