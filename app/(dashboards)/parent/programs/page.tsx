"use client"

import ProgramCard from "@/components/common/program-card"
import ProgramHead from "../../../../components/common/program-head" 
import { useEffect, useState } from "react" 
import { getSportOptions } from "../../action"
import { TSportOption } from "@/types"
import moment from "moment" 
import { TProgramUpcomming } from "@/types/upcomming.type"
import { getAvailablePlayerParentProgram } from "../../player/programs/action"
import { details } from "motion/react-client"

export default function ProgramPage() { 
 

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
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, index) => (
          <ProgramCard
            key={index}
            id={program.id}
            title={program.program_name}
            type={`Age U${program?.age_limit == program?.from_age || program?.from_age == null ? program?.age_limit : `${program?.from_age} - U${program?.age_limit}`}`}
            schedule={program?.location}
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
            // onClick={() => router.push() }
            editLink={`/parent/programs/${program.id}`}
            viewOnly={true}
          /> 
        ))}
      </div>

      {/* empty programs message */}
      {programs.length === 0 && (
        <div className="text-center py-10">
          <h2 className="text-secondary text-xl font-semibold">No available programs found.</h2>
          <p className="text-secondary!  ">May be you have no child or the selected sport has no available programs.</p>
        </div>
      )}

    </section>
  )
}
