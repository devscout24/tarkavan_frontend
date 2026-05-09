"use client"

import { useState, useEffect } from "react"
import CommonBtn from "@/components/common/common-btn"
import ProgramCoachCard from "@/components/common/program-coach-card"
import { Card } from "@/components/ui/card"
import {
  FacebookIcon,
  FullStarIcon,
  InstagramIcon,
  PartialStarIcon,
  ProfileShareIcon,
  TiktokIcon,
  WhatsappIcon,
  XIcon,
} from "./icons"

interface CoachProfileData {
  id: number
  name: string
  last_name: string
  dob: string
  gender: string
  status: string
  nationality: string
  email: string
  sports: string
  coach_profile_pic: string | null
  current_role: {
    id: number
    name: string
  } | null
  years_of_experience: string
  highest_education: string
  coaching_education: string
  coaching_philosophy: string
  player_centric_approach: boolean
  data_driving_training: boolean
  facebook_link: string | null
  twitter_link: string | null
  instagram_link: string | null
  tiktok_link: string | null
  whatsapp_link: string | null
  privacy_settings: string
  visible_reviews: boolean
  allow_parent_player_reviews: boolean
  city: string
  country: string
  city_id: number | null
  country_id: number | null
  coaching_titles: Array<{
    id: number
    coach_id: number
    title: string
  }>
  overall_avg_rating: number
  total_reviews: number
}

interface City {
  id: number
  country_id: number
  name: string
}

interface Country {
  id: number
  name: string
  iso_code: string
}

export default function CoachLeftColumn() {
  const [profileData, setProfileData] = useState<CoachProfileData | null>(null)
  const [cities, setCities] = useState<City[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("go_elite_token")
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://tarkavan.thenightowl.team/api"

        // Fetch coach profile data
        const profileResponse = await fetch(`${baseUrl}/coach/profile/data/edit`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (profileResponse.ok) {
          const profileResult = await profileResponse.json()
          if (profileResult.status) {
            console.log('🔍 Coach Profile API Response:', profileResult.data)
            setProfileData(profileResult.data)
          }
        }

        // Fetch cities data
        const citiesResponse = await fetch(`${baseUrl}/locations/cities`)
        if (citiesResponse.ok) {
          const citiesResult = await citiesResponse.json()
          if (citiesResult.status) {
            setCities(citiesResult.data)
          }
        }

        // Fetch countries data
        const countriesResponse = await fetch(`${baseUrl}/locations/countries`)
        if (countriesResponse.ok) {
          const countriesResult = await countriesResponse.json()
          if (countriesResult.status) {
            setCountries(countriesResult.data)
          }
        }
      } catch (error) {
        console.error('Error fetching coach profile data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getCityName = () => {
    if (!profileData?.city_id) return profileData?.city || ""
    const city = cities.find(c => c.id === profileData.city_id)
    return city?.name || profileData?.city || ""
  }

  const getCountryName = () => {
    if (!profileData?.country_id) return profileData?.country || ""
    const country = countries.find(c => c.id === profileData.country_id)
    return country?.name || profileData?.country || ""
  }

  const getLocation = () => {
    const cityName = getCityName()
    const countryName = getCountryName()
    return cityName && countryName ? `${cityName}, ${countryName}` : cityName || countryName || ""
  }

  if (loading) {
    return (
      <aside className="space-y-4 xl:space-y-5 2xl:space-y-6">
        <div className="animate-pulse">
          <div className="h-64 bg-secondary/20 rounded-[12px]"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-32 bg-secondary/20 rounded-[12px]"></div>
        </div>
      </aside>
    )
  }

  if (!profileData) {
    return (
      <aside className="space-y-4 xl:space-y-5 2xl:space-y-6">
        <div className="text-center text-white">
          <p>Unable to load profile data</p>
        </div>
      </aside>
    )
  }

  const tags = [
    profileData.gender?.toUpperCase(),
    ...profileData.coaching_titles.map(title => title.title.toUpperCase())
  ]

  return (
    <aside className="space-y-4 xl:space-y-5 2xl:space-y-6">
      <ProgramCoachCard
        className="rounded-[12px] border border-secondary/60 bg-primary xl:[&_h3]:text-[38px] 2xl:[&_h3]:text-[46px] xl:[&_p]:text-[17px] 2xl:[&_p]:text-[19px] xl:[&_span]:text-[11px] 2xl:[&_span]:text-[12px]"
        name={profileData.name}
        highlightedName={profileData.last_name}
        role={profileData.current_role?.name || ""}
        location={getLocation()}
        tags={tags}
        imageUrl={profileData.coach_profile_pic || "/images/coach.png"}
        showMessageButton={false}
      />

      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <p className="text-[32px] leading-[125%] font-bold text-white xl:text-[38px] 2xl:text-[44px]">
          {profileData.overall_avg_rating || 0}
        </p>
        <div className="mt-1 flex items-center gap-1 xl:mt-2 xl:gap-1.5 xl:[&_svg]:scale-110 2xl:[&_svg]:scale-125">
          <FullStarIcon />
          <FullStarIcon />
          <FullStarIcon />
          <FullStarIcon />
          <PartialStarIcon />
        </div>
        <p className="mt-2 text-base leading-[150%] font-semibold tracking-[-0.32px] text-white xl:text-lg 2xl:text-xl">
          Average Rating Based on {profileData.total_reviews || 0} reviews
        </p>
      </Card>

      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <h5 className="text-base leading-[150%] font-semibold text-white uppercase xl:text-lg 2xl:text-xl">
          Coaching Titles
        </h5>
        <div className="mt-3 flex flex-wrap gap-4 xl:mt-4 xl:gap-5">
          {profileData.coaching_titles.map((title) => (
            <span
              key={title.id}
              className="rounded-[6px] bg-white/10 p-2 text-[10px] leading-[120%] font-medium text-white xl:px-2.5 xl:py-2.5 xl:text-[11px] 2xl:text-xs"
            >
              {title.title}
            </span>
          ))}
        </div>
      </Card>

      <Card className="rounded-[12px] border border-secondary/60 bg-primary px-5 py-4 xl:px-6 xl:py-5 2xl:px-7 2xl:py-6">
        <div className="flex flex-wrap items-center gap-3 xl:flex-nowrap xl:justify-between">
          <div className="flex items-center gap-4 xl:gap-5 xl:[&_svg]:scale-110 2xl:[&_svg]:scale-125">
            {/* Debug: Show all social media icons temporarily */}
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <FacebookIcon />
            </div>
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <InstagramIcon />
            </div>
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <TiktokIcon />
            </div>
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <XIcon />
            </div>
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <WhatsappIcon />
            </div>
            
            {/* Original conditional rendering */}
            {/* {profileData.facebook_link && <FacebookIcon />}
            {profileData.instagram_link && <InstagramIcon />}
            {profileData.tiktok_link && <TiktokIcon />}
            {profileData.twitter_link && <XIcon />}
            {profileData.whatsapp_link && <WhatsappIcon />} */}
          </div>
          <CommonBtn
            variant="default"
            size="lg"
            text="Profile Share"
            icon={<ProfileShareIcon />}
            className="h-10 w-fit rounded-[10px] bg-brand px-4 text-sm font-semibold text-primary hover:bg-brand/90 xl:h-11 xl:px-5 xl:text-base 2xl:h-12 2xl:px-6 2xl:text-lg xl:[&_svg]:scale-110"
          />
        </div>
      </Card>
    </aside>
  )
}
