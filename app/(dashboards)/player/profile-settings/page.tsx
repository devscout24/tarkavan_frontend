"use client"

import ChangePassword from "@/components/common/change-password"
import NotificationSetting from "@/components/common/notification-setting"
import PrivacySetting from "@/components/common/privacy-setting"
import ProfileTop from "@/components/common/profile-top"
import {
  TChangePasswordData,
  TPlayerProfileSetting,
  TPrivacyOption,
} from "@/types"
import { useEffect, useState } from "react"
import { getPlayerProfileSetting } from "./action"
import { playerSettingUpdate } from "../profile/action"
import { toast } from "sonner"

export default function ProfileSettingPage() {
  const [playerProfile, setPlayerProfile] = useState<TPlayerProfileSetting>()

  useEffect(() => {
    const getPlayerProfileInfo = async () => {
      try {
        const res = await getPlayerProfileSetting() 
        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          setPlayerProfile(res.data.data)
        }
      } catch (error) {
        console.error(error)
        console.log("error", error)
      }
    }

    getPlayerProfileInfo()

    // const getData = () => {
    //   getPlayerProfileInfo();
    // };

    //   window.addEventListener("profile_update", getData);

    //   return () => {
    //     window.removeEventListener("profile_update", getData);
    //   };
  }, [])

  const [profileImage, setProfileImage] = useState<string | File>("")
  const [editProfileModalOpen, setEditProfileModalOpen] =
    useState<boolean>(false)
  useEffect(() => {
    if (!profileImage) {
      return
    }

    const handleProfileImageChange = async () => {
      try {
        const formData = new FormData()
        if (profileImage instanceof File) {
          formData.append("profile_image", profileImage)
        }
        const res = await playerSettingUpdate(formData)
         
        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data
        ) {
          setPlayerProfile(res.data.data)
          toast.success("Profile image updated successfully")
        }
        setProfileImage("")
      } catch (error) {
        console.error(error)
      }
    }
    handleProfileImageChange()
  }, [profileImage])

  const handleEditProfileModdal = async (name: string) => {
    try {
      const formData = new FormData()
      formData.append("name", name)

      const res = await playerSettingUpdate(formData)
      if (
        res &&
        "success" in res &&
        res.success &&
        res.data &&
        "data" in res.data
      ) {
        setPlayerProfile(res.data.data)
        setEditProfileModalOpen(false)
        toast.success("Profile name updated successfully")
      }
    } catch (error) {
      console.error(error)
      console.log("error", error)
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
    try {
      setChangePasswordLoading(true)

      const formData = new FormData()
      formData.append("current_password", passwordFormData.current_password)
      formData.append("new_password", passwordFormData.new_password)
      formData.append(
        "new_password_confirmation",
        passwordFormData.new_password_confirmation
      )

      const res = await playerSettingUpdate(formData)

      if (res && "errors" in res) {
        toast.error(
          res?.message ||
            res?.errors?.password[0] ||
            res?.errors?.new_password[0] ||
            "Mey be password not match or field is required"
        )
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
        toast.error(
          res?.message || "Mey be password not match or field is required"
        )
        setChangePasswordLoading(false)
      }
    } catch (error) {
      console.error("Error updating password:", error)
      setChangePasswordLoading(false)
      toast.error("Invalid password or password not match")
    }
  }

  const PRIVACY_OPTIONS: TPrivacyOption[] = [
    {
      value: "public",
      title: "Public Profile",
      description: "Visible to all users on the platform",
    },
    {
      value: "coach_and_team",
      title: "Coaches & Team Staff",
      description: "Restricted to coaches and team staff only",
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
    // {
    //   value: "coach_and_players",
    //   title: "Coaches & Athletes",
    //   description: "Visible to verified coaches and athletes",
    // },
    // {
    //   value: "players_and_teams",
    //   title: "Coaches & Teams",
    //   description: "Visible to coaches and team members only",
    // },

    // {
    //   value: "only_player",
    //   title: "Athlete Only",
    //   description: "Fully private professional view for the athlete only",
    // },
  ]
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

  return (
    <section className="text-white">
      <ProfileTop
        profileTopInfo={{
          name: playerProfile?.name || "",
          email: playerProfile?.email || "",
          image: playerProfile?.profile_image || "",
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
        onChange={(value) => handlePlayerPrivacyChange(value)}
      />

      {/* <NotificationSetting /> */}
    </section>
  )
}
