"use client"
import ExploreFilter from "@/components/common/explore-filter" 
import ExploreCard from "@/components/common/explore-card"
import { useEffect, useState } from "react"
import { getSearchList } from "../action"


type ExploreFilterState = {
  button_type: string
  location: string
  sports: string
  ageGroup: string
  priceRange: string
  selectedCountry_id: string
  selectedCity_id: string
  max_price: string
  min_price: string
}

const initialState: ExploreFilterState = {
  button_type: "",
  location: "",
  sports: "",
  ageGroup: "",
  priceRange: "",
  selectedCountry_id: "",
  selectedCity_id: "",
  max_price: "",
  min_price: "",
}

export default function SearchExplore() { 

  const [filters, setFilters] = useState<ExploreFilterState>(initialState)

  useEffect(() => { 

    const getFilterdData = async () => {

      try{

        const formData = new FormData()

        // convert filters to formdata
        Object.entries(filters).forEach(([key, value]) => {
          formData.append(key, value)
        })

        const res = await getSearchList(formData)
        console.log(res)

      }catch(error){
        console.log(error)
        console.error("Error fetching filtered data:", error)
      }
      
    }

    getFilterdData()

  }, [filters])



  return (
    <section>
      <ExploreFilter filters={filters} setFilters={setFilters} initialState={initialState} />

      {/* programs cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ExploreCard
          image={"/images/player1.png"}
          name="Martinez"
          summary="Age: 45 | Coach | Experience: 10+"
          details={[
            "North Toronto",
            "Head Coach – U17 FC Club",
            "USA Basketball Gold Coach",
          ]}
        />

        <ExploreCard
          image={"/images/player2.png"}
          name="Premier Soccer Striker Clinic"
          price="$199"
          details={[
            "Coach: David Chen",
            "Weekends, 10:00 AM",
            "4 Weeks Program",
          ]}
        />

        <ExploreCard
          image={"/images/player3.png"}
          name="Daniel Martinez" 
          summary="Age: 15 | Midfielder | Jersey: 9"
          details={[
            "North Toronto",
            "Parental Control Active",  
          ]}
          stats={["Goals: 12", "Assists: 8", "Matches: 20"]}
        />

        <ExploreCard
          image={"/images/player3.png"}
          name="Canada Strikers FC" 
          summary="Youth Club | Academy"
          details={[
            "North Toronto",
            "High Performance Program", 
          ]}
          desc="Premier youth soccer development club focused on building champions "
        />


      </div>
    </section>
  )
}
