"use client"
import PlayerActivePrograms from "@/components/common/player-active-programs"
import { getUpcomingEvents } from "./action"
import { TUpcomingEvent } from "@/types"
import moment from "moment"
import ProgramCard from "./component/program-card"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
// import ProgramCard from "@/components/common/program-card"

export default function UpcomingEventPage() {
  const [topUpcommingEvent, settopUpcommingEvent] =
    useState<TUpcomingEvent | null>(null)
  const [upcomingEvents, setUpcomingEvents] = useState<TUpcomingEvent[]>([])
  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
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
          settopUpcommingEvent(res.data.data.top_upcoming || null)
          setUpcomingEvents(res.data.data.upcoming_events || [])
        }
      } catch (err) {
        console.error("Error fetching upcoming events:", err)
      }
    }
    getData()
  }, [])
 

 
 

  return (
    <section>
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          {"Active Programs"}
        </h2>
      </div>

      {topUpcommingEvent ? (
        <PlayerActivePrograms
          title={topUpcommingEvent?.title || ""}
          programName={topUpcommingEvent?.title || ""}
          coachName={topUpcommingEvent?.provider_name || ""}
          schedule={
            moment(topUpcommingEvent?.start_date).format("MMM Do YY") || ""
          }
          nextSession={topUpcommingEvent?.start_date || ""}
          focusLabel={"Current Focus"}
          focusValue={topUpcommingEvent?.program_goal[0]?.goal || ""}
          status={topUpcommingEvent?.status || ""}
          btnText={"View Details"}
          programImage={topUpcommingEvent?.program_photo}
          onViewDetails={() => {
            if(!topUpcommingEvent.program_id){
              toast.error("Program ID is missing. Cannot navigate to program details.")
              return
            }

            router.push(`/details/program/${topUpcommingEvent.program_id}`) 
          }}
        />
      ) : (
        <div>
          <p className="mt-6 rounded-xl border border-white/5 bg-amber-100/5 py-10 text-center text-white">
            No active programs available.
          </p>
        </div>
      )}

      {/* upcoming events content */}

      <h2 className="mt-6 text-xl font-bold text-white sm:text-2xl">
        Upcoming Events
      </h2>
      {/* programs cards */}
      {topUpcommingEvent ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {upcomingEvents.map((event, index) => (
            <ProgramCard
              key={index}
              {...event}
              imageSrc={event.program_photo || "/images/player1.png"}
              imageAlt={event.title || "Upcoming Event"}
              buttonLabel={`Start On ${moment(event.start_date).format("MMM Do YY")}`}
              schedule={event.session_time || ""}
              duration={`${moment.duration(moment(event.end_date).diff(moment(event.start_date))).asDays()} days`}
              editLink=""
              type={event.booking_type || ""}
            />
          ))}
        </div>
      ) : (
        <div>
          <p className="mt-6 rounded-xl border border-white/5 bg-amber-100/5 py-10 text-center text-white">
            No upcoming events available.
          </p>
        </div>
      )}
    </section>
  )
}
