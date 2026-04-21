import ChangePassword from "@/components/common/change-password"
import NotificationSetting from "@/components/common/notification-setting"
import PrivacySetting from "@/components/common/privacy-setting"
import ProfileTop from "@/components/common/profile-top"

export default function Page() {



  return (
    <section className="text-white">
      <ProfileTop />
      <ChangePassword />
      <PrivacySetting />
      <NotificationSetting />
    </section>
  )
}
