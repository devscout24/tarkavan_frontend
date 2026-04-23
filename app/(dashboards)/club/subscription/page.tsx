"use client"
import SubscriptionPlanCard from "@/components/common/subscription-plan-card"

import { Skeleton } from "@/components/ui/skeleton"
import {
  SubscriptionPlanCardProps,
  type TSubscriptionPlan,
  type TSubscriptionPlanListResponse,
} from "@/types"
import { useEffect, useState } from "react"
import { getSubscribeClubPlan } from "../action"

type TSubscribePlansSuccessResponse = {
  success: true
  data: TSubscriptionPlanListResponse
}

const isSubscribePlansSuccessResponse = (
  value: unknown
): value is TSubscribePlansSuccessResponse => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  if (!("success" in value) || !("data" in value)) {
    return false
  }

  return value.success === true
}

export default function Page() {
  const [plans, setPlans] = useState<TSubscriptionPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSubscribeClubPlan()
        if (!isSubscribePlansSuccessResponse(res)) {
          setPlans([])
          return
        }

        const payload = res.data

        if (payload.status && Array.isArray(payload.data)) {
          setPlans(payload.data)
          return
        }

        setPlans([])
      } catch (err) {
        console.error("Error fetching subscription data:", err)
        setPlans([])
      } finally {
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  const cardPlans: SubscriptionPlanCardProps[] = plans.map((plan) => {
    const discountAmount = Number(plan.discount_price || "0")
    const isYearly = plan.slug.toLowerCase() === "yearly"

    return {
      id: plan.id,
      title: plan.name,
      price: `$${plan.price}`,
      period: isYearly ? "/team/year" : "/team/month",
      features: plan.features,
      ctaLabel: isYearly ? "Upgrade Plan" : "Subscribe",
      highlighted: isYearly,
      savingsLabel:
        discountAmount > 0 ? `SAVE $${plan.discount_price}` : undefined,
    }
  })

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

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={`plan-skeleton-${index}`}
                  className="h-125 w-full max-w-92.5 rounded-[24px] border border-transparent bg-[#24242d] p-8"
                >
                  <Skeleton className="h-9 w-36 bg-white/10" />
                  <div className="mt-4 flex items-end gap-2">
                    <Skeleton className="h-8 w-28 bg-white/10" />
                    <Skeleton className="h-5 w-20 bg-white/10" />
                  </div>
                  <div className="mt-8 space-y-4">
                    {Array.from({ length: 5 }).map((__, featureIndex) => (
                      <div
                        key={`plan-feature-skeleton-${featureIndex}`}
                        className="flex items-center gap-3"
                      >
                        <Skeleton className="size-4 rounded-full bg-white/10" />
                        <Skeleton className="h-4 w-full bg-white/10" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-10">
                    <Skeleton className="h-14 w-full rounded-[14px] bg-white/10" />
                  </div>
                </div>
              ))
            : cardPlans.map((plan) => (
                <SubscriptionPlanCard key={plan.id} {...plan} />
              ))}
        </div>
      </div>
    </section>
  )
}
