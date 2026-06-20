import { useState } from "react"
import { Input } from "../ui/input"
import CommonBtn from "./common-btn" 
import { FaCcStripe } from "react-icons/fa"
import { GrSecure } from "react-icons/gr"
import { submitStripeData } from "@/app/(dashboards)/coach/action"
import { toast } from "sonner"
import CountryCodeSelector from "./country-code-selector"

export type TStripeAccountResponse = {
  success: boolean
  data: {
    status: boolean
    message: string
    data: {
      connected: boolean
      account_id: string
      account_holder_name: string
      account_email: string
      country: string
      account_status: string
      onboarding_url: string
      details_submitted: boolean
      charges_enabled: boolean
      payouts_enabled: boolean
    }
  }
}

type TStripeErrorResponse = {
  status: boolean;
  message: string;
  data: {
    connected: boolean;
  };
};

export default function ConnectStripe({}: {}) {
  const sectionCls =
    "rounded-2xl border border-white/8 bg-secondary/20 p-5 text-white md:p-6"

  const [stripeData, setStripeData] = useState({
    accountHolderName: "",
    accountEmail: "",
    country: "",
  })

  const [loading, setLoading] = useState(false)

  const handleConnectStripe = async () => {
    if (!stripeData.accountHolderName.trim()) {
      toast.error("Account holder name is required")
      return
    }
    if (!stripeData.accountEmail.trim()) {
      toast.error("Account email is required")
      return
    }
    if (!stripeData.country.trim()) {
      toast.error("Country is required")
      return
    }
 

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("account_holder_name", stripeData.accountHolderName)
      formData.append("account_email", stripeData.accountEmail)
      formData.append("country", stripeData.country)
      
      const res = await submitStripeData(formData) 

      const response = res as TStripeAccountResponse

      if (response.data.status) {
        setLoading(false)

        // Redirect to onboarding URL
        // window.location.href = response.data.data.onboarding_url
        window.open(response.data.data.onboarding_url, "_blank")

      }  

      const errorResponse = res as TStripeErrorResponse
      if( !errorResponse.data.connected) {
        setLoading(false)
        toast.error(errorResponse.message || "Failed to connect stripe account")
      }
 
    } catch (err) {
      setLoading(false)
      console.error("Error connecting stripe account", err)
    }
  }

  return (
    <section className={`${sectionCls} space-y-5 p-5`}>
      {/* Header */}
      <div className="flex items-center gap-3 pb-4">
        <FaCcStripe className="size-10" />

        <div>
          <h3 className="flex flex-wrap items-center gap-2 text-lg font-semibold text-white">
            Connect Stripe Account
            <span className="inline-flex items-center gap-1 rounded-full border border-[#635BFF]/30 bg-[#635BFF]/12 px-2.5 py-0.5 text-[11px] text-[#8b85ff]">
              <GrSecure className="size-4" />
              Secure
            </span>
          </h3>

          <p className="text-xs text-white/40">
            Your payout details are encrypted and managed by Stripe.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10" />

      {/* Fields */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white/50">
            Account holder name
          </label>
          <Input
            placeholder="Enter account holder name"
            className="border border-secondary"
            value={stripeData.accountHolderName}
            onChange={(e) =>
              setStripeData({
                ...stripeData,
                accountHolderName: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white/50">
            Account email
          </label>
          <Input
            type="email"
            placeholder="Enter account email"
            className="border border-secondary"
            value={stripeData.accountEmail}
            onChange={(e) =>
              setStripeData({ ...stripeData, accountEmail: e.target.value })
            }
          />
        </div>
      </div>

      {/* Country */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/50">Country</label>

        <CountryCodeSelector
          onSelect={(data) => {
            setStripeData({ ...stripeData, country: data.country_code })
          }}
          initialCountry={stripeData.country} 
        />

        <p className="text-[11px] text-white/30">
          Must match the country registered in your Stripe dashboard.
        </p>
      </div>

      {/* Notice */}
      <div className="flex items-start gap-2.5 rounded-[10px] border border-[#635BFF]/20 bg-[#635BFF]/10 px-3.5 py-2.5">
        <svg
          className="mt-0.5 h-4 w-4 shrink-0 text-[#635BFF]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>

        <p className="text-xs leading-relaxed text-white/55">
          By connecting, you authorise GoElite to send payouts to your Stripe
          account.
        </p>
      </div>

      <CommonBtn
        className="ml-auto w-full bg-brand py-5! text-primary hover:bg-brand"
        text="Connect Stripe"
        size={"lg"}
        variant={"default"}
        isLoading={loading}
        onClick={handleConnectStripe}
      />
    </section>
  )
}
