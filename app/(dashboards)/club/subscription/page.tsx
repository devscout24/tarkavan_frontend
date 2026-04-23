"use client"
import SubscriptionPlanCard from "@/components/common/subscription-plan-card" 

const plans = [
  {
    title: "Monthly",
    price: "$24.99",
    period: "/team/month",
    features: [
      "Full profile access",
      "Recruitment tools",
      "Messaging",
      "Booking features",
    ],
    ctaLabel: "Subscribe",
    highlighted: false,
  },
  {
    title: "Yearly",
    price: "$249.99",
    period: "/team/year",
    features: [
      "Full profile access",
      "Recruitment tools",
      "Messaging",
      "Booking features",
      "Priority support",
    ],
    ctaLabel: "Upgrade Plan",
    highlighted: true,
    savingsLabel: "SAVE $49.89",
  },
]

export default function Page() {
  return (
    <section className="min-h-full bg-[#09070f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="text-center">
          <h1 className="text-[18px] font-semibold text-white">
            Choose Your Plan
          </h1>
          <p className="mt-1 text-[15px] text-white/80">
            Select the best plan for your club&apos;s needs
          </p>
        </header>

        <div className="mt-10  flex flex-wrap items-center justify-center gap-8">
          {plans.map((plan) => (
            <SubscriptionPlanCard key={plan.title} {...plan} />
          ))}
        </div> 
      </div>
    </section>
  )
}
