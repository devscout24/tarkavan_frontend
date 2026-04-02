import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
 
export default function ScoutingStatus() {
  return (
    <Card className="mt-4 border-none bg-secondary text-white">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-medium">Profile Completeness</span>
          <span className="text-sm font-semibold text-brand">{85}%</span>
        </div>

        <Progress value={85} className="h-2 bg-white/30 [&>div]:bg-white" />

        <p className="text-extralight mt-2 text-[14px]">
          Add 2 more videos to reach 100% and get featured.
        </p>
      </CardContent>
    </Card>
  )
}
