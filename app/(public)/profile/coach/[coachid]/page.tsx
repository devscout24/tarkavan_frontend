"use client"
import Footer from "@/components/common/footer"
import Nav from "@/components/common/nav"
import CoachProfileCard from "./component/coach-profile-card"
import CoachingTitles from "./component/coaching-titles"
import CoachingBio from "./component/bio"
import CoachingExperienceEducation from "./component/coaching-experience-education"
import { getCoachProfile } from "@/app/(public)/action"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { TCoachPublicProfile } from "@/types"
import CommonBtn from "@/components/common/common-btn"
import { Star } from "lucide-react"
import CredentialsCard from "@/components/custom/coach-profile/credentials-card"
import ProgramCard from "@/app/(dashboards)/components/program-card"
import moment from "moment"
import isValidToken from "@/lib/isValid-token"
import { handleLogout } from "@/lib/helpers"

export default function Page() {
  const params = useParams()
  const coachid = params.coachid
  const [data, setData] = useState<TCoachPublicProfile | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!coachid) return

    const fetchData = async () => {
      try {
        const res = await getCoachProfile(String(coachid))
        if (res?.status === false) {
          setLoading(false)
          toast.error(res?.message || "Failed to fetch coach profile")
          setTimeout(() => {
            router.back()
          }, 1000)
          return
        }
        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          setLoading(false)
          setData(res.data.data)
        }
      } catch (err) {
        console.error("Error fetching coach profile:", err)
        setLoading(false)
      }
    }

    fetchData()
  }, [coachid])

  if (loading) {
    return <div>Loading...</div>
  } else if (!loading && data) {

    console.log("Coach Profile Data:", data)
  

    return (
      <section>
        <Nav />

        <CommonBtn
          variant="outline"
          size="sm"
          text="Go Back"
          onClick={() => router.back()}
          className="mt-30 ml-10 w-fit cursor-pointer bg-brand px-5 hover:bg-brand"
        />

        <div className="my-5 grid grid-cols-1 gap-5 px-10 sm:grid-cols-2 items-start">
          {/* left side */}
          <div className="sticky top-24">
            <CoachProfileCard
              basic_info={{
                image: encodeURI(data?.profile?.profile_image) || "/images/bannerbg.png" ,
                name: data?.profile?.name,
                age: data?.profile?.age,
                city: data?.profile?.city,
                country: data?.profile?.country,
                province: data?.profile?.province,
                gender: data?.profile?.gender,
                id: 1,
                full_name: data?.profile?.name,
                last_name: "",
                dob: data?.profile?.dob,
                nationality: data?.profile?.nationality,
                email: data?.profile?.email,
                biography: "",
                privacy_settings: "",
                sports: "",
                sport_option_id: 10,
                sport_option: { id: 10, name: "" },
                facebook_link: "",
                twitter_link: "",
                whatsapp_link: "",
                overall_avg_rating: data?.profile?.overall_avg_rating,
                years_of_experience: data?.profile?.years_of_experience,
                total_reviews: data?.profile?.total_reviews,
                updated_at:  "",
              }}
              position_info={{
                jersey_number: 10,
                primary_position: {
                  id: 1,
                  name: data?.profile?.current_role?.name,
                  type: "",
                },
                secondary_position: {
                  id: 2,
                  name: "",
                  type: "",
                },
                sports_selection: "",
                club_team: data?.profile?.highest_education,
                dominant_foot: "",
              }} 
              jersey_shown={false}
            />

            <div className="w-full rounded-2xl border border-brand bg-[#0d0f16] p-6 shadow-xl my-3  ">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold! text-sm uppercase text-white!  ">
                    Average Rating
                  </p>
                  <h3 className="mt-1 text-3xl font-bold text-white">{data?.profile?.overall_avg_rating?.toFixed(1) || "0.0"}</h3>
                </div>

                <div className="rounded-xl bg-brand/10 p-3">
                  <Star className="h-6 w-6 fill-brand text-brand" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1">
                {[...Array(Math.floor(data?.profile?.overall_avg_rating || 0))].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-brand text-brand"
                  />
                ))}
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-zinc-400">Based on reviews</span>
                  <span className="font-medium text-white">{data?.profile?.total_reviews}</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-brand to-brand transition-all duration-500"
                    style={{ width: `${((data?.profile?.overall_avg_rating || 0) / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <CoachingTitles titles={data?.coaching_titles} />
          </div>

          {/* right side */}
          <div className="space-y-4 bg-primary! relative z-10   ">
            {/* bio */}
            <CoachingBio bio={data?.profile?.bio} />
            <CoachingExperienceEducation data={data?.experience_education} />

            <CredentialsCard
              coach_media={data?.coach_media || []}
            />

            {/* programs */}
            {data && data?.program && data?.program.length > 0 &&
              <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-2 ">
                {
                  data.program.map((item, index) => (
                    <ProgramCard
                      key={index}
                      image={item?.photo || "/images/bannerbg.png"}
                      name={item?.program_name}
                      price={`CAD ${item?.price}`}
                      user={`Age U${item?.age_limit == item?.from_age || item?.from_age == null ? item?.age_limit : `${item?.from_age} - U${item?.age_limit}`}`} 
                      duration={`${moment(item?.start_date || item?.times[0].slot_date   ).format("MMM Do YY")} - ${moment(item?.end_date || item?.times[item.times.length - 1].slot_date ).format("MMM Do YY")}`}
                      calender={item?.location}
                      btnText="View Program"
                      onClick={() => { 
                        router.push(`/details/program/${item?.id}`)
                      }}
                    />
                  ))
                }
              </div>

            }


          </div>
        </div>

        <Footer />
      </section>
    )
  }
}
