"use client"

import ProgramCard from "@/components/common/program-card"
import ProgramHead from "../../../../components/common/program-head"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getAvailablePlayerParentOrPlayer } from "../upcoming-events/action"
import { getSportOptions } from "../../action"
import { TSportOption } from "@/types"

export default function ProgramPage() {
  // const programs = [
  //   {
  //     id: "1",
  //     title: "Elite Hoops Leadership Academy",
  //     coachName: "Elena Rodriguez",
  //     schedule: "Tuesdays, 6:00 PM",
  //     duration: "8 Weeks Program",
  //     currentPrice: "$249",
  //     imageSrc: "/images/player1.png",
  //     imageAlt: "Program image",
  //     buttonLabel: "View Details",
  //   },
  //   {
  //     id: "2",
  //     title: "Premier Soccer Striker Clinic",
  //     coachName: "David Chen",
  //     schedule: "Weekends, 10:00 AM",
  //     duration: "4 Weeks Program",
  //     currentPrice: "$199",
  //     imageSrc: "/images/player2.png",
  //     imageAlt: "Program image",
  //     buttonLabel: "View Details",
  //   },
  //   {
  //     id: "3",
  //     title: "Mindset & Performance Coaching",
  //     coachName: "Sarah Jenkins",
  //     schedule: "Thursdays, 5:00 PM",
  //     duration: "12 Weeks Program",
  //     currentPrice: "$269",
  //     previousPrice: "$299",
  //     discountLabel: "10% Off",
  //     imageSrc: "/images/player3.png",
  //     imageAlt: "Program image",
  //     buttonLabel: "View Details",
  //   },
  // ]

  const router = useRouter()

    const  [programs, setPrograms] = useState<TProgramUpcomming[]>([])
    const [sports, setSports] = useState<TSportOption[]>([])
    const [selectedFilter, setSelectedFilter] = useState<string>("") 
    console.log("Selected Filter:", selectedFilter)
    useEffect(() => {
  
      const getPrograms = async () => {
        try{ 
          const res = await getAvailablePlayerParentOrPlayer(selectedFilter)  
          console.log("API Response:", res)
          if(res && "success" in res && res.success && res.data && "data" in res.data && res.data.data ) {
              setPrograms(res.data.data.programs)
            } 
        }catch(err) {
          console.error("Error fetching programs:", err)
        }
      } 
      getPrograms() 
    } , [selectedFilter])


    useEffect(()=> { 
      const getSportData = async () => {
        try{

          const res = await getSportOptions() 
          if( res && "success" in res && res.success && res.data && "data" in res.data && res.data.data){ 
            setSports(res.data.data)
          }
          
          
        }catch(err){
            console.error("Error fetching sport data:", err)
        }
      }
      getSportData()

    }, [])

  return (
    <section>
      <ProgramHead
        title="Available Programs"
        options={sports}
        placeholder="All Sports"
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
      />

      {/* programs cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, index) => (
          <ProgramCard
            key={index}
            id={program.id}
            title={program.program_name}
            coachName={program.coach_name}
            schedule={program.time}
            // duration={program.program_duration}
            // currentPrice={program.program_price}
            imageSrc={program.program_photo}
            imageAlt={program.program_name}
            buttonLabel="View Details"
            onClick={() =>  {} }
            viewOnly={true}
          /> 
        ))}
      </div>
    </section>
  )
}
