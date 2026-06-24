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
import { useRouter } from "next/navigation"
import Advertisement from "@/components/custom/advertisement"
import { TUpcomingEvent } from "@/types/upcomming.type"

type ExploreFilterState = {
  button_type: string
  sports: string
  age_group: string
  priceRange: string
  province: string
  city: string
  country: string
  max_price: string
  min_price: string
  per_page: string
}

const initialState: ExploreFilterState = {
  button_type: "",
  sports: "",
  age_group: "",
  priceRange: "",
  province: "",
  city: "",
  country: "",
  max_price: "",
  min_price: "",
  per_page: "9",
}

export default function SearchExplore() {
  const [filters, setFilters] = useState<ExploreFilterState>(initialState)
  const [searchResults, setSearchResults] = useState<TExploreItem[]>([])
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [upcommingEvents, setUpcommingEvents] = useState<TUpcomingEvent[]>([])

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

      if (
        res &&
        "success" in res &&
        res.success &&
        res.data &&
        "data" in res.data &&
        res.data.data
      ) {
        setSearchResults(res?.data?.data?.data)
        setLoading(false)
        setTotalPage(res.data.data.pagination.last_page)
        setUpcommingEvents(res.data.data.upcoming_events)
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getFilteredData()
    }

    fetchData()
  }, [filters, currentPage])

  const router = useRouter()
  const [user, setUser] = useState<{ id: string; role: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("go_elite_user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <section>
      <ExploreFilter
        filters={filters}
        setFilters={setFilters}
        initialState={initialState}
      />

      {/* programs cards */}

      {/* coach type card  */}
      {searchResults.length > 0 || upcommingEvents?.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcommingEvents?.length > 0 &&
            upcommingEvents.map((item, index) => {
              return (
                <Advertisement
                  imageUrl={item.club_logo}
                  positions={item.position}
                  teamName={item.club_name}
                  ageGroup={
                    item?.from_age && item.upto_age
                      ? `U${item.from_age} - U${item.upto_age}`
                      : `U${item?.from_age || ""}`
                  }
                  tryoutDate={moment(item.tryout_date).format("MMM Do YY")}
                  description={item.description}
                  recruitId={String(item.recruitment_id)}
                  is_applied={item.application_status === "applied"}
                />
              )
            })}
          {searchResults.length > 0 &&
            searchResults.map((item, index) => {
              if (item.type === "program") {
                return (
                  <ProgramCard
                    key={index}
                    image={item?.photo || "/images/bannerbg.png"}
                    name={item?.program_name}
                    price={`CAD ${item?.price}`}
                    user={`Coach: ${item?.coach_name}`}
                    duration={
                      moment(item?.end_date).diff(
                        moment(item?.start_date),
                        "days"
                      ) + " days program"
                    }
                    calender={moment(item?.start_date).format("MMM Do YY")}
                    btnText="View Program"
                    onClick={() =>
                      router.push(`/${user?.role}/programs/${item?.program_id}`)
                    }
                  />
                )
              }

              if (item.type === "club") {
                return (
                  <ClubCard
                    key={index}
                    image={
                      item?.profile_image ||
                      item?.club_logo ||
                      "/images/bannerbg.png"
                    }
                    name={item?.club_name}
                    organizationType={item?.organization_type}
                    location={item?.location as string}
                    head={item?.organization_type as string}
                    description={item?.club_description as string}
                    onClick={() =>
                      router.push(`/profile/club/${item?.club_profile_id}`)
                    }
                  />
                )
              }
              if (item.type === "player") {
                return (
                  <PlayerCard
                    key={index}
                    image={
                      (item?.profile_image as string) || "/images/bannerbg.png"
                    }
                    name={item?.name}
                    age={String(item?.age)}
                    position={item?.position as string}
                    jerseyNumber={String(item?.jersey_number)}
                    location={item?.location as string}
                    parental_control={item?.parental_control}
                    assists={String(item?.assists)}
                    games={String(item?.games)}
                    goals={String(item?.goals)}
                    onClick={() =>
                      router.push(`/profile/player/${item?.athlete_profile_id}`)
                    }
                  />
                )
              }

              if (item.type === "coach") {
                return (
                  <CoachCard
                    key={index}
                    image={
                      (item?.profile_image as string) || "/images/bannerbg.png"
                    }
                    name={item?.name}
                    type={item?.type}
                    age={String(item?.age)}
                    experience={item?.years_of_experience}
                    location={item?.location as string}
                    head={item?.coaching_title}
                    award={item?.coaching_philosophy}
                    onClick={() =>
                      router.push(`/profile/coach/${item?.coach_id}`)
                    }
                  />
                )
              }
            })}
        </div>
      ) : loading ? (
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <SearchExploreSkeleton key={index} />
            ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg bg-white">
          <h2 className="mb-4 pt-10 text-center text-2xl font-bold text-gray-800">
            No results found
          </h2>

          <div className="mx-auto max-w-md">
            <Lottie animationData={animationData} loop />
          </div>
        </div>
      )}

      {totalPage > 1 && (
        <div className="sticky bottom-0 mt-5 rounded-tl-lg rounded-tr-lg py-2 backdrop-blur-xl">
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </section>
  )
}
