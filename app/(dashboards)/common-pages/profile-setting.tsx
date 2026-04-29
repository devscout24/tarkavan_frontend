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
// />



{/*
   <Select
              value={form.ageGroup}
              onValueChange={(v) => handleSelect("ageGroup", v)}
            >
              <SelectTrigger className="mt-1 w-full border-neutral-700 bg-neutral-800 py-5 text-white/60 [&>span]:font-medium [&>span]:text-white/60">
                <SelectValue placeholder="Select Age Group" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="13" className="hover:bg-brand!">
                  U13
                </SelectItem>
                <SelectItem value="15" className="hover:bg-brand!">
                  U15
                </SelectItem>
                <SelectItem value="17" className="hover:bg-brand!">
                  U17
                </SelectItem>
                <SelectItem value="18" className="hover:bg-brand!">
                  18-plus
                </SelectItem>
              </SelectContent>
            </Select>
             */}