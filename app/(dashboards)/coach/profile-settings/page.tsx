"use client"

import ChangePassword from "@/components/common/change-password"
import NotificationSetting from "@/components/common/notification-setting"
import PrivacySetting from "@/components/common/privacy-setting"
import ProfileTop from "@/components/common/profile-top"
import StripeAccount from "@/components/custom/stripe-account"

export default function Page() {
  return (
    <section className="text-white">
      <ProfileTop />
      <ChangePassword />
      <StripeAccount
        title="Stripe Account"
        description="Connect and manage your Stripe account for payments and earnings."
        onClick={() => console.log('Navigate to Stripe account settings')}
      />
      <PrivacySetting />
      <NotificationSetting />
    </section>
  )
}
