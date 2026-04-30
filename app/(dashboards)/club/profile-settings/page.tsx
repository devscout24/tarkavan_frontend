"use client"

import ChangePassword from "@/components/common/change-password";
import NotificationSetting from "@/components/common/notification-setting";
import PrivacySetting from "@/components/common/privacy-setting";
import ProfileTop from "@/components/common/profile-top"; 
import { TChangePasswordData, TClubProfile, TPrivacyOption } from "@/types";
import { useEffect, useState } from "react";
import { getClubProfile, updateClubSetting } from "../action";

 

export default  function ProfileSettingPage() {

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
    {
      value: "players_and_teams",
      title: "Coaches & Teams",
      description: "Visible to coaches and team members only",
    },
    {
      value: "coach_and_team",
      title: "Coaches & Team Staff",
      description: "Restricted to coaches and team staff only",
    },
    {
      value: "only_player",
      title: "Athlete Only",
      description: "Fully private professional view for the athlete only",
    },
];

  const [passwordFormData, setPasswordFormData] = useState<TChangePasswordData>({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  })

const handleClubPrivacyChange = (value: string) => {
  console.log(value)
}


const handlePasswordChangeSave = () => {
  console.log(passwordFormData)
}

  
 const [profileImage, setProfileImage] = useState<string | File>("")
 useEffect(() => {
  
  const handleProfileImageChange = async () => {
    try{

      const formData = new FormData();

      if (profileImage instanceof File) {
        formData.append("profileImage", profileImage);
      }

      const res = await updateClubSetting(formData)

      console.log(res)

    }catch(error){
      console.error(error)
      console.log("error", error)
    }
  }

  handleProfileImageChange()

 }, [profileImage])


 const handleEditProfileModdal = () => {
  console.log("Edit profile")
 }
  
 const [clubProfile, setClubProfile] = useState<TClubProfile>()
 console.log("clubProfile", clubProfile)
  useEffect(() => {
    
    const getClubProfileInfo = async () => {
      try{
        const res = await getClubProfile()
        
        if(res && 'success' in res && res.success && res.data && 'data' in res.data && res.data.data) {
          setClubProfile(res.data.data)
        } 

      }catch(error){
        console.error(error)
        console.log("error", error)
      }
    }

    getClubProfileInfo()

  }, [])

 
  return (
    <section className="text-white">
      <ProfileTop 
        profileTopInfo={{
          name: clubProfile?.club_name || "",   
        }} 
        setProfileImage={setProfileImage} 
        handleEditProfileModdal={handleEditProfileModdal} 
      />

      <ChangePassword 
        passwordFormData={passwordFormData} 
        setPasswordFormData={setPasswordFormData}  
        onSave={handlePasswordChangeSave} 
      />

      <PrivacySetting privacyOptions={PRIVACY_OPTIONS} onChange={(value) => handleClubPrivacyChange(value)}   />
      <NotificationSetting />
    </section>
  )
}






