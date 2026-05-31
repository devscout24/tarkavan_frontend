"use client"
import Footer from "@/components/common/footer"
import Nav from "@/components/common/nav"
import CoachProfileCard from "./component/coach-profile-card"
import CoachingTitles from "./component/coaching-titles"
import CoachingBio from "./component/bio"
import CoachingExperienceEducation from "./component/coaching-experience-education"
import CertificateCredential from "./component/cirtificate-credentioal"
import { getCoachProfile } from "@/app/(public)/action"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { TCoachPublicProfile } from "@/types"

export default function Page() {
  const params = useParams()
  const coachid = params.coachid
  const [data, setData] = useState<TCoachPublicProfile | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  console.log(data)

  useEffect(() => {
    if (!coachid) return

    const fetchData = async () => {
      try {
        const res = await getCoachProfile(String(coachid))
        if (res?.status === false) {
          setLoading(false)
          toast.error(res?.message || "Failed to fetch coach profile")
          router.back()
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
  } else if(!loading && !data) {
    router.back() 
    toast.error("Failed to fetch coach profile")
  }
  else if(!loading && data) {

    return (
      <section>
        <Nav />
  
        <div className="my-30 grid grid-cols-1 gap-5 px-5 sm:grid-cols-2">
          {/* left side */}
          <div className="">
            <CoachProfileCard
              basic_info={{
                image: data?.profile?.profile_image,
                name: data?.profile?.name, 
                age: data?.profile?.age,
                city: data?.profile?.city ,
                country: data?.profile?.country ,
                gender: data?.profile?.gender ,
                id: 1,
                full_name: data?.profile?.name,
                last_name: "",
                dob: data?.profile?.dob,
                nationality: data?.profile?.nationality,
                email:  data?.profile?.email ,
                biography: "",
                privacy_settings: "",
                sports: "",
                sport_option_id: 10,
                sport_option: { id: 10, name: "" },
              }}
              position_info={{
                jersey_number: 10,
                primary_position: {
                  id: 1,
                  name: "Forward",
                  type: "attacker",
                },
                secondary_position: {
                  id: 2,
                  name: "Winger",
                  type: "attacker",
                },
                sports_selection: "football",
                club_team: "FC Example",
                dominant_foot: "right",
              }}
              provincialVotes={5}
              academyVotes={3}
            />
  
            <CoachingTitles
              titles={data?.coaching_titles}
            />
          </div>
  
          {/* right side */}
          <div className="space-y-4">
            {/* bio */}
            <CoachingBio bio={data?.profile?.bio} />
            <CoachingExperienceEducation
              data={data?.experience_education}
            />
  
            {/* <CertificateCredential
              certificates={[
                {
                  id: "12389udjs",
                  title: "UEFA Pro License",
                  image: "https://picsum.photos/seed/picsum/200/300",
                },
                {
                  id: "2dawr23eads",
                  title: "FIFA Coaching Certificate",
                  image: "https://picsum.photos/seed/picsum/200/300",
                },
              ]}
            /> */}
          </div>
        </div>
  
        <Footer />
      </section>
    )
  }
}
