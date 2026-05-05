import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TPlayerAchievement } from "@/types/player.type"
import { Trophy, Award, Star } from "lucide-react"
import moment from "moment"

interface Achievement {
  id: string 
  title: string
}

interface AchievementsProps {
  achievements?: TPlayerAchievement[]
}

 
const iconMap = {
  trophy: Trophy,
  award: Award,
  star: Star,
}

export default function Achievements({
  achievements ,
}: AchievementsProps) {
  return (
    <Card className="mt-6  border border-secondary/20 bg-primary ">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-semibold tracking-wider text-brand uppercase">
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {achievements?.map((achievement) => { 
          return (
            <div key={achievement.id} className="flex items-center gap-3">
              <Award className="size-5 text-brand" />
              <span className="text-sm font-medium text-white">
                {achievement.title} - { moment(achievement?.date_earned).format("MMM Do YY") }
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
