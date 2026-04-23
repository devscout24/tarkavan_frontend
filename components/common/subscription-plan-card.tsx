"use client"

import { purchaseSubscription } from "@/app/(dashboards)/club/action"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { SubscriptionPlanCardProps } from "@/types"
import { useState } from "react"
import { BsFillPatchCheckFill } from "react-icons/bs"

export default function SubscriptionPlanCard({
  title,
  price,
  period,
  features,
  ctaLabel,
  highlighted = false,
  savingsLabel,
  onCtaClick,
  className,
  id,
}: SubscriptionPlanCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePurchasePlan = async () => {
    if (!id || isSubmitting) {
      return
    }

    try {
      setIsSubmitting(true)
      const res = await purchaseSubscription(String(id))

      const checkoutUrl =
        typeof res === "object" &&
        res !== null &&
        "success" in res &&
        res.success === true &&
        "data" in res &&
        typeof res.data === "object" &&
        res.data !== null &&
        "status" in res.data &&
        res.data.status === true &&
        "data" in res.data &&
        typeof res.data.data === "object" &&
        res.data.data !== null &&
        "checkout_url" in res.data.data &&
        typeof res.data.data.checkout_url === "string"
          ? res.data.data.checkout_url
          : null

      if (checkoutUrl) {
        window.location.href = checkoutUrl
        return
      }

      console.error("Checkout URL not found in subscription response", res)
    } catch (err) {
      console.error("Error fetching subscription data:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card
      className={cn(
        "relative h-125 w-full max-w-92.5 overflow-hidden rounded-[24px] border p-0 shadow-none",
        highlighted
          ? "border-brand/80 bg-[#1b1b24] text-white shadow-[0_0_0_1px_rgba(177,248,103,0.18),0_18px_50px_rgba(0,0,0,0.26)]"
          : "border-transparent bg-[#24242d] text-white",
        className
      )}
    >
      {savingsLabel ? (
        <div className="absolute top-0 right-0 rounded-bl-2xl bg-[linear-gradient(90deg,#19a7a5_0%,#c9f58d_100%)] px-6 py-2 text-[11px] font-bold tracking-[0.22em] text-[#1d1d1d] uppercase">
          {savingsLabel}
        </div>
      ) : null}

      <CardContent className="flex h-full flex-col px-8 py-10">
        <div>
          <h2 className="text-[34px] leading-none font-medium tracking-[-0.04em] text-white">
            {title}
          </h2>

          <div className="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1">
            <span
              className={cn(
                "text-[30px] leading-none font-semibold tracking-[-0.03em]",
                highlighted ? "text-brand" : "text-white/92"
              )}
            >
              {price}
            </span>
            <span className="pb-0.5 text-[14px] font-medium text-white/55">
              {period}
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 text-[15px] text-white/88"
            >
              <BsFillPatchCheckFill className="size-4 shrink-0 text-[#6ef57a]" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-10">
          <Button
            type="button"
            onClick={onCtaClick ?? handlePurchasePlan}
            variant={highlighted ? "default" : "outline"}
            disabled={isSubmitting}
            className={cn(
              "h-14 w-full cursor-pointer rounded-[14px] text-[15px] font-medium tracking-[0.24em] uppercase",
              highlighted
                ? "border-0 bg-[linear-gradient(90deg,#12a3a3_0%,#c8f68e_100%)] text-[#111111] shadow-[0_10px_24px_rgba(33,176,155,0.24)] hover:bg-[linear-gradient(90deg,#12a3a3_0%,#c8f68e_100%)]"
                : "border border-white/50 bg-transparent text-white hover:bg-white/5 hover:text-white"
            )}
          >
            {isSubmitting ? "Processing..." : ctaLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
