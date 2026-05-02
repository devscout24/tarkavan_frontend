"use client"

import ChangePassword from "@/components/common/change-password"
import NotificationSetting from "@/components/common/notification-setting"
import PrivacySetting from "@/components/common/privacy-setting"
import ProfileTop from "@/components/common/profile-top"
import {
  TChangePasswordData,
  TClubProfile,
  TNotificationItem,
  TPrivacyOption,
} from "@/types"
import { useEffect, useState } from "react"
import { getClubProfile, updateClubSetting } from "../action"
import { toast } from "sonner"

export default function ProfileSettingPage() {
  const [clubProfile, setClubProfile] = useState<TClubProfile>()
  const [currentPrivacy, setCurrentPrivacy] = useState<string>("public") 
  
  useEffect(() => {
    const getClubProfileInfo = async () => {
      try {
        const res = await getClubProfile()

        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          setClubProfile(res.data.data)
          setCurrentPrivacy(res.data.data.privacy_settings || "public")
        }
      } catch (error) {
        console.error(error) 
      }
    }

    getClubProfileInfo()

    const handleProfileUpdate = () => {
      getClubProfileInfo()
    }

    window.addEventListener("profile_update", handleProfileUpdate)

    return () => {
      window.removeEventListener("profile_update", handleProfileUpdate)
    }

  }, [])

  const [profileImage, setProfileImage] = useState<string | File>("")
  useEffect(() => {

    if(!profileImage) return

    const handleProfileImageChange = async () => {
      try {
        const formData = new FormData()
        if (profileImage && profileImage instanceof File) {
          formData.append("club_logo", profileImage)
        }
        const res = await updateClubSetting(formData)
        console.log(res)
        if(res && "success" in res && res.success && res.data && "data" in res.data) {
          setClubProfile(res.data.data)
          toast.success("Profile image updated successfully")
          window.dispatchEvent(new Event("profile_update"))
        } 
        setProfileImage("")
      } catch (error) {
        console.log(error) 
        setProfileImage("")
      }
    }
    
    handleProfileImageChange() 

  }, [profileImage])

  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false)
  const handleEditProfileModdal = async (name: string) => {

    try{

      const formData = new FormData()
      formData.append("name", name)

      const res  = await updateClubSetting(formData) 
      if(res && "success" in res && res.success) {
        toast.success("Profile updated successfully")
        window.dispatchEvent(new Event("profile_update"))
        // close modal
        setEditProfileModalOpen(false)
      }
      
    } catch (error) {
      console.error(error)
    }
    
  }




  const PRIVACY_OPTIONS: TPrivacyOption[] = [
    {
      value: "public",
      title: "Public Profile",
      description: "Visible to all users on the platform",
    },
    {
      value: "private",
      title: "Private Profile",
      description: "Only you can view your profile",
    },
    {
      value: "players",
      title: "Athletes Only",
      description: "Visible to verified athletes only",
    },
    {
      value: "coach_and_players",
      title: "Coaches & Athletes",
      description: "Visible to verified coaches and athletes",
    },
    // {
    //   value: "players_and_teams",
    //   title: "Coaches & Teams",
    //   description: "Visible to coaches and team members only",
    // },
    // {
    //   value: "coach_and_team",
    //   title: "Coaches & Team Staff",
    //   description: "Restricted to coaches and team staff only",
    // },
    // {
    //   value: "only_player",
    //   title: "Athlete Only",
    //   description: "Fully private professional view for the athlete only",
    // },
  ]



  const handleClubPrivacyChange = async (value: string) => {
    try {
  
      const formData = new FormData()
      formData.append("privacy_settings", value)

      const res = await updateClubSetting(formData) 

      if (res && "success" in res && res.success) {
        setCurrentPrivacy(value) 
        toast.success("Privacy setting updated successfully")
      } else {
        console.error(res)
        toast.error("Failed to update privacy setting")
      }
    } catch (error) {
      console.error("Error updating privacy setting:", error)
      toast.error("Failed to update privacy setting")
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
  const handlePasswordChangeSave = async () => {
    try{
      setChangePasswordLoading(true)

      const formData = new FormData()
      formData.append("current_password", passwordFormData.current_password)
      formData.append("new_password", passwordFormData.new_password)
      formData.append("new_password_confirmation", passwordFormData.new_password_confirmation)
      
      const res = await updateClubSetting(formData)
      
      if (res && "success" in res && res.success) {
        console.log(res)
        setChangePasswordLoading(false)
        toast.success("Password updated successfully")
        setPasswordFormData({
          current_password: "",
          new_password: "",
          new_password_confirmation: "",
        })
        window.dispatchEvent(new Event("profile_update"))
      } else {
        console.error(res)
        toast.error(res?.message || "Mey be password not match or field is required")
        setChangePasswordLoading(false)
      }
    }
    catch(error){
      console.error("Error updating password:", error)
      setChangePasswordLoading(false)

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









  return (
    <section className="text-white">
      <ProfileTop
        profileTopInfo={{
          name: clubProfile?.club_name || "",
          image: clubProfile?.club_logo_url || "",
          email: clubProfile?.email || "",
        }}
        setProfileImage={setProfileImage}
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

      <PrivacySetting
        privacyOptions={PRIVACY_OPTIONS}
        initialValue={currentPrivacy}
        onChange={(value) => handleClubPrivacyChange(value)}
      />
      <NotificationSetting
        notifications={notificationItems}
        setNotifications={setNotificationItems}
      />
    </section>
  )
}
