import ChangePassword from "@/components/common/change-password"
import NotificationSetting from "@/components/common/notification-setting"
import PrivacySetting from "@/components/common/privacy-setting"
import ProfileTop from "@/components/common/profile-top"

export default function ProfileSettingPage() {
  return (
    <section className="text-white">
      <ProfileTop />
      <ChangePassword />
      <PrivacySetting />
      <NotificationSetting />
    </section>
  )
}

// <StripeAccount
//   title="Stripe Account"
//   description="Connect and manage your Stripe account for payments and earnings."
//   onClick={() => console.log('Navigate to Stripe account settings')}
// />
