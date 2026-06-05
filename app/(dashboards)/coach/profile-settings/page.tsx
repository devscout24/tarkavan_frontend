"use client"

import ChangePassword from "@/components/common/change-password"
import Loader from "@/components/common/loader"

declare global {
  interface Window {
    testApi?: () => Promise<void>
  }
}
import NotificationSetting from "@/components/common/notification-setting"
import PrivacySetting from "@/components/common/privacy-setting"
import PrivacySettingsCoach from "@/components/common/privacy-settings-coach"
import ProfileTop from "@/components/common/profile-top"
import { TChangePasswordData, TNotificationItem, TPrivacyOption } from "@/types"
import { useEffect, useState } from "react"

export default function ProfileSettingPage() {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/parent/profile` 

        const token =
          localStorage.getItem("go_elite_token") ||
          sessionStorage.getItem("go_elite_token") 

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
 

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json() 

        if (result.status && result.data) {
          setProfileData(result.data) 
        } else {
          console.warn("Invalid response structure:", result)
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        console.error(
          "Error details:",
          error instanceof Error ? error.message : "Unknown error"
        )

        // Fallback to mock data for development 
        setProfileData({
          name: "Mehedi Noor Khan",
          email: "mehedinoork@gmail.com",
          profile_image: "https://tarkavan.thenightowl.team/",
          privacy_settings: null,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // Test function - run this in browser console to test API directly
  window.testApi = async () => {
    try {
      const token =
        localStorage.getItem("go_elite_token") ||
        sessionStorage.getItem("go_elite_token") 

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/parent/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ) 
      const data = await response.json() 
    } catch (error) {
      console.error("Test API Error:", error)
    }
  }

  const updateProfile = async (formData: FormData) => {
    try { 
      const token =
        localStorage.getItem("go_elite_token") ||
        sessionStorage.getItem("go_elite_token") 

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/parent/profile/update`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json() 

      if (result.status && result.data) {
        setProfileData(result.data) 
        return { success: true, message: result.message }
      } else {
        console.error("Profile update failed:", result.message)
        return { success: false, message: result.message || "Update failed" }
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      return { success: false, message: "Network error occurred" }
    }
  }

  const PRIVACY_OPTIONS: TPrivacyOption[] = [
    {
      value: "public",
      title: "Public Profile",
    },
    {
      value: "private",
      title: "Private Profile",
    },
    {
      value: "players",
      title: "Athletes Only",
    },
    {
      value: "coach_and_players",
      title: "Coaches & Athletes",
    },
  ]

  const handleClubPrivacyChange = async (privacyData: {
    privacy_settings: string
    allow_parent_player_reviews: number
    visible_reviews: number
  }) => {
    // Update local state immediately for better UX
    setProfileData((prev: any) => ({
      ...prev,
      privacy_settings: privacyData.privacy_settings,
      allow_parent_player_reviews: privacyData.allow_parent_player_reviews,
      visible_reviews: privacyData.visible_reviews,
    }))

    const formData = new FormData()
    formData.append("privacy_settings", privacyData.privacy_settings)
    formData.append(
      "allow_parent_player_reviews",
      privacyData.allow_parent_player_reviews.toString()
    )
    formData.append("visible_reviews", privacyData.visible_reviews.toString())

    const result = await updateProfile(formData)
    if (result.success) { 
    } else {
      console.error("Failed to update privacy settings:", result.message)
      // Revert to original values if API call fails
      // You might want to refetch the profile data here
    }
  }

  const [passwordFormData, setPasswordFormData] = useState<TChangePasswordData>(
    {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    }
  )
  const [changePasswordLoading, setChangePasswordLoading] = useState(false)
  const handlePasswordChangeSave = () => { 
    setChangePasswordLoading(false)
  }

  const handleProfileImageChange = async (image: string | File) => {
    if (image instanceof File) {
      const formData = new FormData()
      formData.append("profile_image", image)

      const result = await updateProfile(formData)
      if (result.success) { 
      } else {
        console.error("Failed to update profile image:", result.message)
      }
    }
  }

  const handleEditProfileModdal = async (name: string) => {
    const formData = new FormData()
    formData.append("name", name)

    const result = await updateProfile(formData)
    if (result.success) {
      setEditProfileModalOpen(false) 
    } else {
      console.error("Failed to update profile name:", result.message)
    }
  }

  // notification setting
  const DEFAULT_NOTIFICATIONS: TNotificationItem[] = [
    { id: "messages", label: "Messages notifications", enabled: true },
    { id: "programs", label: "New Program notifications", enabled: true },
    { id: "events", label: "Upcoming events notifications", enabled: true },
    { id: "recruitment", label: "Recruitment notifications", enabled: true },
    { id: "matches", label: "Upcoming Matches notifications", enabled: false },
  ]
  const [notificationItems, setNotificationItems] = useState<
    TNotificationItem[]
  >(DEFAULT_NOTIFICATIONS)

  if (loading) {
    return (
      <section className="text-white">
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
      </section>
    )
  }

  return (
    <section className="text-white">
      <ProfileTop
        profileTopInfo={{
          name: profileData?.name || "Loading...",
          image: profileData?.profile_image || "/images/default-avatar.png",
          email: profileData?.email || "",
        }}
        setProfileImage={handleProfileImageChange}
        handleEditProfileModdal={(name) => handleEditProfileModdal(name)}
        editProfileModalOpen={editProfileModalOpen}
        setEditProfileModalOpen={setEditProfileModalOpen}
      />

      <ChangePassword
        passwordFormData={passwordFormData}
        setPasswordFormData={setPasswordFormData}
        onSave={handlePasswordChangeSave}
        changePasswordLoading={changePasswordLoading}
      />

      <PrivacySettingsCoach
        privacyOptions={PRIVACY_OPTIONS}
        initialValue={profileData?.privacy_settings || "public"}
        initialAllowParentPlayerReviews={
          profileData?.allow_parent_player_reviews
        }
        initialVisibleReviews={profileData?.visible_reviews}
        onChange={(privacyData) => handleClubPrivacyChange(privacyData)}
      />
      <NotificationSetting
        notifications={notificationItems}
        setNotifications={setNotificationItems}
      />
    </section>
  )
}
