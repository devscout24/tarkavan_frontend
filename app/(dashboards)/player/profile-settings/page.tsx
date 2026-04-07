import ChangePassword from "../components/change-password";
import NotificationSetting from "../components/notification-setting";
import PrivacySetting from "../components/privacy-setting";
import ProfileTop from "../components/profile-top";

export default function Page() {
  return (
    <section className="text-white">
      <ProfileTop/>
      <ChangePassword/>
      <PrivacySetting/>
      <NotificationSetting/>
    </section>
  )
}