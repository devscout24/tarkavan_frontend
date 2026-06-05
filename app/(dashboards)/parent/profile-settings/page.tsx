"use client"

import ChangePassword from "@/components/common/change-password";
import NotificationSetting from "@/components/common/notification-setting";
import PrivacySetting from "@/components/common/privacy-setting"
import ProfileTop from "@/components/common/profile-top"; 
import { TChangePasswordData, TNotificationItem, TPlayerProfileSetting, TPrivacyOption } from "@/types";
import { useEffect, useState } from "react";    
import { toast } from "sonner";
import { getPlayerProfileSetting } from "../../player/profile-settings/action";
import { playerSettingUpdate } from "../../player/profile/action";


 

export default  function ProfileSettingPage() {

 


  const [playerProfile, setPlayerProfile] = useState<TPlayerProfileSetting>()
  
  useEffect(() => {
    
    const getPlayerProfileInfo = async () => {
      try{
        const res = await getPlayerProfileSetting()
         
        
        if(res && 'success' in res && res.success && res.data && 'data' in res.data && res.data.data) {
          setPlayerProfile(res.data.data)
        } 

      }catch(error){
        console.error(error) 
      }
    }

  getPlayerProfileInfo();

  // const getData = () => {
  //   getPlayerProfileInfo();
  // };

  //   window.addEventListener("profile_update", getData);

  //   return () => {
  //     window.removeEventListener("profile_update", getData);
  //   };
  }, [])

 const [profileImage, setProfileImage] = useState<string | File>("")
 const [editProfileModalOpen , setEditProfileModalOpen] = useState<boolean>(false)
 useEffect(() => {

  if(!profileImage){
    return
  }
 
  const handleProfileImageChange = async () => {
    try{ 
      const formData = new FormData(); 
      if (profileImage instanceof File) {
        formData.append("profile_image", profileImage);
      } 
      const res = await playerSettingUpdate(formData)  
      
      if(res && "success" in res && res.success && res.data && "data" in res.data) {
          setPlayerProfile(res.data.data)
          toast.success("Profile image updated successfully") 
        } 
        setProfileImage("")
    }catch(error){
      console.error(error) 
    }
  } 
  handleProfileImageChange() 
 }, [profileImage])


 const handleEditProfileModdal = async (name:string) => {
    try{ 
      const formData = new FormData(); 
      formData.append("name", name);
 
      const res = await playerSettingUpdate(formData)  
      if(res && "success" in res && res.success && res.data && "data" in res.data) {
          setPlayerProfile(res.data.data)
          setEditProfileModalOpen(false)
          toast.success("Profile name updated successfully") 
        }  
    }catch(error){
      console.error(error) 
    }
 }
  


  const [passwordFormData, setPasswordFormData] = useState<TChangePasswordData>({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  })
const [changePasswordLoading , setChangePasswordLoading] = useState(false)

const handlePasswordChangeSave = async () => {
  try{
        setChangePasswordLoading(true)
  
        const formData = new FormData()
        formData.append("current_password", passwordFormData.current_password)
        formData.append("new_password", passwordFormData.new_password)
        formData.append("new_password_confirmation", passwordFormData.new_password_confirmation)
        
        const res = await playerSettingUpdate(formData)

        if ( res &&  "errors" in res) {
            toast.error(res?.message || res?.errors?.password[0] || res?.errors?.new_password[0] || "Mey be password not match or field is required")
        }
        
        if (res && "success" in res && res.success) { 
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
        toast.error("Invalid password or password not match")
      }
}




 
const [currentPrivacy, setCurrentPrivacy] = useState<string>("public") 
 const handlePlayerPrivacyChange = async (value: string) => {
      try {
    
        const formData = new FormData()
        formData.append("privacy_settings", value)
  
        const res = await playerSettingUpdate(formData) 
  
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


const notificationItems: TNotificationItem[] = [
  {
    id: "messages",
    label: "Messages notifications",
    enabled: true,
  },
  {
    id: "new_program",
    label: "New Program notifications",
    enabled: true,
  },
  {
    id: "upcoming_events",
    label: "Upcoming events notifications",
    enabled: true,
  },
  {
    id: "recruitment",
    label: "Recruitment notifications",
    enabled: true,
  },
  {
    id: "upcoming_matches",
    label: "Upcoming Matches notifications",
    enabled: false,
  },
];

const [notification, setNotification] = useState<TNotificationItem[]>(notificationItems)


 
  return (
    <section className="text-white">
      <ProfileTop 
        profileTopInfo={{
          name: playerProfile?.name || "",   
          email: playerProfile?.email || "", 
          image: playerProfile?.profile_image || ""  
        }} 
        setProfileImage={setProfileImage} 
        handleEditProfileModdal={(name)=> handleEditProfileModdal(name)}
        editProfileModalOpen={editProfileModalOpen}
        setEditProfileModalOpen={setEditProfileModalOpen}
      />

      <ChangePassword
        passwordFormData={passwordFormData}
        setPasswordFormData={setPasswordFormData}
        onSave={handlePasswordChangeSave}
        changePasswordLoading={changePasswordLoading}
      />

 

      <NotificationSetting
        notifications={notificationItems}
        setNotifications={setNotification}
      />
    </section>
  )
}





 