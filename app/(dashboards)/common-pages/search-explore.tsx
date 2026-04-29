"use client"
import ExploreFilter from "@/components/common/explore-filter" 
import { useEffect, useState } from "react"
import { getSearchList } from "../action"  
import ProgramCard from "../components/program-card"
import ClubCard from "../components/club-card" 
import CommonPagination from "@/components/common/common-pagination"
import { TExploreItem } from "@/types"
import moment from "moment"
import PlayerCard from "../components/player-card"
import CoachCard from "../components/coach-card"



type ExploreFilterState = {
  button_type: string
  location: string
  sports: string
  ageGroup: string
  priceRange: string
  country_id: string
  city_id: string
  max_price: string
  min_price: string
  per_page: string
}

const initialState: ExploreFilterState = {
  button_type: "",
  location: "",
  sports: "",
  ageGroup: "",
  priceRange: "",
  country_id: "",
  city_id: "",
  max_price: "",
  min_price: "",
  per_page: "9",
}

export default function SearchExplore() { 

  const [filters, setFilters] = useState<ExploreFilterState>(initialState)
  const [searchResults, setSearchResults] = useState<TExploreItem[]>([])
  const [totalPage, setTotalPage] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)
   
  const getFilteredData = async () => {
    try {
      const formData = new FormData() 

      Object.entries(filters).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      const res = await getSearchList({
        data: formData,
        currentPage: String(currentPage),
      })

      if (res && 'success' in res && res.success && res.data && 'data' in res.data && res.data.data) { 
        setSearchResults(res?.data?.data?.data) 
         setTotalPage(res.data.data.pagination.last_page)
      }

    } catch (error) {
      console.error("Error fetching filtered data:", error)
    }
  }

  useEffect(() => { 
      const fetchData = async () => {
    await getFilteredData();
  };

  fetchData();
  }, [filters, currentPage])


  return (
    <section>
      <ExploreFilter filters={filters} setFilters={setFilters} initialState={initialState} />

      {/* programs cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* coach type card  */}
        {searchResults.length > 0 ? 
          searchResults.map((item, index) => {

            if(item.type === "club_program"){
              return (
              <ProgramCard
              key={index}
              image={item?.program_photo || "/images/player1.png"}
              name={item?.club_name   }   
              price={`CAD ${item?.program_price}`}  
              user={`Coach: ${item?.coach_name}`}
              duration={moment(item?.program_end).diff(moment(item?.program_start), 'days') + " days program"}
              calender={moment(item?.program_start).format("MMM Do YY")}
              />
              )
            }

            if(item.type === "club"){
              return (
              <ClubCard
              key={index}
              image={item?.profile_image || item?.club_logo || "/images/player1.png"}
              name={item?.club_name} 
              organizationType={item?.organization_type }
              location={item?.location as string}
              head="Head Coach"
              description={item?.club_description as string}
              />
              )
            }
            if(item.type === "player"){
              return ( "")
            }



          })
        : 
        ""
      }

 
{/* 
        <CoachCard
        image="/images/player1.png"
        name="Martinez" 
        type={"Coach"}
        age={"45"}
        experience={"10+"}
        location="Torento, Canada"
        head="Head Coach"
        award="Champion"
        />

        <PlayerCard
        image="/images/player1.png"
        name="Martinez" 
        age={"25"}
        position={"Forward"}
        jerseyNumber={"10"}  
        location="Torento, Canada"
        head="Head Coach"
        asists="21" 
        games="10"
        goals="15"
        /> */}



      </div>
      
      {totalPage > 1 && 
      <div className="mt-5 sticky bottom-0 backdrop-blur-xl py-2 rounded-tl-lg rounded-tr-lg   "> 
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={(page) => setCurrentPage(page)}
          />
      </div>
        }



    </section>
  )
}
