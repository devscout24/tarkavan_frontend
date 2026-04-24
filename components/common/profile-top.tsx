"use client"

import { useEffect, useState } from "react"
// import CommonBtn from "@/components/common/common-btn"
import Image from "next/image"
import { getProfile, type ParentProfile } from "@/components/parentAndCoachApi"

export default function ProfileTop() {
  const [profile, setProfile] = useState<ParentProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const response = await getProfile()
        
        console.log("Profile API Response:", response)
        
        if (response.success && response.data) {
          setProfile(response.data)
        } else {
          setError(response.message || 'Failed to load profile')
        }
      } catch (err) {
        setError('Error loading profile')
        console.error('Profile fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/12 bg-primary p-4 text-white md:p-6">
        <div className="animate-pulse">
          <h2 className="text-xl font-semibold tracking-tight">Profile</h2>
          <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-xl bg-white/10 p-4 sm:flex-row sm:items-center md:p-5">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-full bg-white/20 md:size-20" />
              <div className="space-y-2">
                <div className="h-5 w-32 rounded bg-white/20" />
                <div className="h-4 w-48 rounded bg-white/20" />
              </div>
            </div>
            <div className="h-10 w-24 rounded bg-white/20" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="rounded-2xl border border-white/12 bg-primary p-4 text-white md:p-6">
        <h2 className="text-xl font-semibold tracking-tight">Profile</h2>
        <div className="mt-4 rounded-xl bg-red-500/20 p-4">
          <p className="text-red-300">{error || 'Profile data not available'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/12 bg-primary p-4 text-white md:p-6">
      <h2 className="text-xl font-semibold tracking-tight">Profile</h2>

      <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-xl bg-white/10 p-4 sm:flex-row sm:items-center md:p-5">
        <div className="flex items-center gap-4">
          <Image
            src={profile.profile_image && profile.profile_image.trim() !== "" ? profile.profile_image : "/images/player1.png"}
            alt={profile.name}
            width={80}
            height={80}
            className="size-16 rounded-full object-cover md:size-20"
            priority
            onError={(e) => {
              // Fallback to default image on error
              const target = e.target as HTMLImageElement
              target.src = "/images/player1.png"
            }}
            unoptimized={profile.profile_image?.startsWith('http')}
          />

          <div>
            <p className="text-lg leading-tight font-semibold text-white">
              {profile.name}
            </p>
            <p className="mt-1 text-base leading-tight font-normal text-white/55">
              {profile.email}
            </p>
          </div>
        </div>
 
        {/* <CommonBtn 
          size="lg" 
          variant="default"  
          className="rounded-2xl bg-brand text-base font-semibold text-primary transition-colors hover:bg-brand/90 w-fit py-4! px-5" 
          text="Edit Profile" 
        /> */}
      </div>
    </div>
  )
}
