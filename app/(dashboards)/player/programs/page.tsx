"use client"

import ProgramCard from "@/components/common/program-card"
import ProgramHead from "../../../../components/common/program-head"
import { useEffect, useState } from "react" 
import { getSportOptions } from "../../action"
import { TSportOption } from "@/types"
import moment from "moment"
import { getAvailablePlayerParentProgram } from "./action"
import { TProgramUpcomming } from "@/types/upcomming.type"

export default function PLayerProgramPage({ child_id }: { child_id: string }) { 
  
   

    const  [programs, setPrograms] = useState<TProgramUpcomming[]>([])
    const [sports, setSports] = useState<TSportOption[]>([])
    const [selectedFilter, setSelectedFilter] = useState<string>("") 
 
    useEffect(() => {
  
      const getPrograms = async () => {
        try{ 
          const res = await getAvailablePlayerParentProgram(selectedFilter)    
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
      {programs.length > 0 && 
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              id={program.id}
              title={program.program_name}
              type={`Age U${program?.age_limit == program?.from_age || program?.from_age == null ? program?.age_limit : `${program?.from_age} - U${program?.age_limit}`}`}
              schedule={program?.program_location || program.location}
              // duration={moment(program.program_start).format("MMM Do YY")}
              duration={`${moment(program?.start_date).format("MMM Do YY")} - ${moment(program?.end_date).format("MMM Do YY")}`}
              currentPrice={String(program.price - program.discount_price)}
              previousPrice={String(program.price)}
              discountLabel={`${(
              ((program.discount_price) / program.price) *
                100
              ).toFixed(2)}% Off`}
              imageSrc={program.photo}
              imageAlt={program.program_name}
              sport={program.sport}
              buttonLabel="View Details" 
              viewOnly={true} 
              editLink={child_id ? `/child-dashboard/${child_id}/programs/${program.id}` : `/player/programs/${program.id}`}
            /> 
          ))}
        </div>
      }
      {programs.length === 0 && (
        <div className="mt-6 text-center text-gray-500">
          No programs available.
        </div>
      )}
    </section>
  )
}
