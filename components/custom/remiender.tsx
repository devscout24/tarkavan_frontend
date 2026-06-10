import { MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CommonBtn from "../common/common-btn"
import moment from "moment"
import { TProgramBookingRemiender } from "@/types"

export default function TrainingReminderCard(
  {
    reminder
  }: { 
    reminder? : TProgramBookingRemiender
  }
) {
    


  return (
    <Card className="w-full overflow-hidden border-secondary bg-secondary/25 mt-6  text-white relative h-fit pb-0! z-1 ">
      <CardHeader className="">
        <CardTitle className="text-base font-semibold tracking-tight">
          Training Reminder
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6  ">
        {/* Date + Event Info */}
        <div className="flex gap-4">
          {/* Date Badge */}
          <div className="flex p-2 flex-shrink-0 flex-col items-center justify-center rounded-md bg-secondary max-w-15 text-white shadow-lg">
            <span className="text-xl leading-none font-extrabold text-center  ">
              {moment(reminder?.start_date).format("MMM Do")}
            </span>
          </div>

          {/* Event Details */}
          <div className="flex-1 pt-1">
            <h3 className="text-base font-semibold text-white">
              {reminder?.title || ""}
            </h3>
            <p className="mt-1 text-sm text-white/60">
              {reminder?.start_date_display || ""}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3 text-zinc-400">
          <MapPin className="mt-0.5 h-5 w-5 text-zinc-500" />
          <div>
            <p className="text-sm leading-relaxed">
              {reminder?.location || ""}
            </p>
          </div>
        </div>

        {/* Button */}
        <CommonBtn variant="default" size="lg" text="View Location" className="h-12 w-full bg-white text-base font-medium text-zinc-950 transition-all hover:bg-white/90" />

        {/* football */}
        <img
          src="/images/football.png"
          alt="Football"
          className="absolute bottom-0 right-0 h-20 w-20 opacity-30 -z-1"
        />

      </CardContent>
    </Card>
  )
}
