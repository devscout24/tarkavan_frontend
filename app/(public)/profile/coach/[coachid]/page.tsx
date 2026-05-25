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

export default function Page() {
  const params = useParams()
  const coachid = params.coachid
  const [data, setData] = useState(null)
  const router = useRouter()

  console.log(data)

  useEffect(() => {
    if (!coachid) return

    const fetchData = async () => {
      try {
        const res = await getCoachProfile(String(coachid))
        if (res?.status === false) {
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
          setData(res.data.data)
        }
      } catch (err) {
        console.error("Error fetching coach profile:", err)
      }
    }

    fetchData()
  }, [coachid])

  return (
    <section>
      <Nav />

      <div className="my-30 grid grid-cols-1 gap-5 px-5 sm:grid-cols-2">
        {/* left side */}
        <div className="">
          <CoachProfileCard
            basic_info={{
              image: "https://picsum.photos/seed/picsum/200/300",
              name: "Shahin",
              last_name: "Tarkavan",
              age: 35,
              city: "Tehran",
              country: "Iran",
              gender: "Male",
              id: 1,
              full_name: "Shahin Tarkavan",
              dob: "1988-05-15",
              nationality: "Iranian",
              email: "john@example.com",
              biography: "Professional football player",
              privacy_settings: "Public",
              sports: "football",
              sport_option_id: 10,
              sport_option: { id: 10, name: "Football" },
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
            titles={[
              "Certified Football Coach",
              "Advanced Training Specialist",
              "Game Strategy",
            ]}
          />
        </div>

        {/* right side */}
        <div className="space-y-4">
          {/* bio */}
          <CoachingBio bio="Shahin Tarkavan is a highly experienced football coach with over 15 years of coaching at various levels. He has a proven track record of developing young talent and leading teams to success in competitive leagues. Shahin holds multiple coaching certifications and is known for his strategic approach to the game, focusing on both technical skills and mental toughness." />
          <CoachingExperienceEducation
            yearfrom="2018"
            yearEnd="Present"
            desc="Leading professional development programs for NBA and G-League prospects."
          />

          <CertificateCredential
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
          />
        </div>
      </div>

      <Footer />
    </section>
  )
}
