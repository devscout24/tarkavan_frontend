import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
 
export default function ScoutingStatus({percentage = 0}: {percentage?: number}) {
  return (
    <Card className="mt-4 border-none bg-secondary text-white">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-medium">Profile Completeness</span>
          <span className="text-sm font-semibold text-brand">{percentage}%</span>
        </div>

        <Progress value={percentage} className="h-2 bg-white/30 [&>div]:bg-white" />

        <p className="text-extralight mt-2 text-[14px]">
          {percentage < 100 && 
          "Upload 2 videos to reach 100%"
          }
        </p>
      </CardContent>
    </Card>
  )
}
