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
import Lottie from "lottie-react"
import animationData from "@/public/searching.json"
import SearchExploreSkeleton from "../components/skeleton-search-program"







type ExploreFilterState = {
  button_type: string
  location: string
  sports: string
  age_group: string
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
  age_group: "",
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
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading , setLoading] = useState(false)
   
  const getFilteredData = async () => {
    try {
      setLoading(true)
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
        setLoading(false)
        setTotalPage(res.data.data.pagination.last_page)
      }

    } catch (error) {
      console.error("Error fetching filtered data:", error)
      setLoading(false)
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
        
        {/* coach type card  */}
        {searchResults.length > 0 ? 
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((item, index) => {

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
              return ( 
                <PlayerCard
                key={index}
                image={item?.profile_image as string || "/images/player1.png"}
                name={item?.name}
                age={String(item?.age)}
                position={item?.position as string}
                jerseyNumber={String(item?.jersey_number)}  
                location={item?.location as string}
                parental_control={item?.parental_control}
                assists={String(item?.assists)} 
                games={String(item?.games)}
                goals={String(item?.goals)}
                /> 
              )
            }

            if(item.type === "coach"){
              return ( 
                <CoachCard 
                key={index}
                image={item?.profile_image as string || "/images/player1.png"}
                name={item?.name}
                type={item?.type}
                age={String(item?.age)}
                experience={item?.years_of_experience}
                location={item?.location as string}
                head={item?.coaching_title}
                award={item?.coaching_philosophy}
                /> 
              )
            }



          })}
      </div>
        : 

        loading ? 
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5    ">
        {Array(3).fill(0).map((_, index) => (
            <SearchExploreSkeleton key={index} />
        ))}
        </div>
        : 

          <div className="bg-white rounded-lg mt-5    ">

          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4 pt-10  ">No results found</h2>

          <div className="max-w-md mx-auto   "> 
            <Lottie animationData={animationData} loop />
          </div>  
        </div>
      }
 
      
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
