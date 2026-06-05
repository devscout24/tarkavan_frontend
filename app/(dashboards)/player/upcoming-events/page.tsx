import PlayerActivePrograms from "@/components/common/player-active-programs"
import { getUpcomingEvents } from "./action"
import { TUpcomingEvent } from "@/types"
import moment from "moment"
import ProgramCard from "@/components/common/program-card"

export default async function UpcomingEventPage() {
  let TopUpcommingEvent: TUpcomingEvent | null = null
  let UpcomingEvents: TUpcomingEvent[] = []

  try {
    const res = await getUpcomingEvents() 
    if (
      res &&
      "success" in res &&
      res.success &&
      res.data &&
      "data" in res.data &&
      res.data.data
    ) {
      TopUpcommingEvent = res.data.data.top_upcoming || null
      UpcomingEvents = res.data.data.upcoming_events
    }
  } catch (err) {
    console.error("Error fetching upcoming events:", err)
  }
 

  return (
    <section>
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <h2 className="text-xl font-bold text-white sm:text-2xl">{"Active Programs"}</h2>
      </div>

      <PlayerActivePrograms
        title={TopUpcommingEvent?.title || ""}
        programName={TopUpcommingEvent?.title || ""}
        coachName={TopUpcommingEvent?.provider_name || ""}
        schedule={
          moment(TopUpcommingEvent?.start_date).format("MMM Do YY") || ""
        }
        nextSession={TopUpcommingEvent?.start_date || ""}
        focusLabel={"Current Focus"}
        focusValue={"Speed & Agility"}
        status={TopUpcommingEvent?.status || ""}
        btnText={"View Details"}
        programImage={TopUpcommingEvent?.program_photo || "/images/player1.png"}
      />

      {/* upcoming events content */}
      <h2 className="mt-6 text-xl font-bold text-white sm:text-2xl">
        Upcoming Events
      </h2>
      {/* programs cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {UpcomingEvents.map((event, index) => (
          <ProgramCard
            key={index} 
            {...event} 
            viewOnly={true}
            imageSrc={event.program_photo || "/images/player1.png"}
            imageAlt={event.title || "Upcoming Event"}
            buttonLabel={`Start On ${moment(event.start_date).format("MMM Do YY")}`}
            schedule={event.start_date_display || ""}
            duration={`${moment.duration(moment(event.end_date).diff(moment(event.start_date))).asDays()} days`}
            editLink=""
          />
        ))}
      </div>
    </section>
  )
}
