"use client"

import { getStripeData } from "@/app/(dashboards)/coach/action"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

type TStripeConnection = {
  success: boolean
  data: {
    status: boolean
    message: string
    data: {
      connected: boolean
    }
  }
}

export default function StripeAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isValidPath = pathname.startsWith("/club") || pathname.startsWith("/coach")
    
    if (!isValidPath) return  

    const getStripeAuth = async () => {
      try {
        const res = await getStripeData()
        const response = res as TStripeConnection

        if (res && response?.data?.data?.connected === false) {
          router.push("?setup=stripe")
        }
      } catch (err) {}
    }

    getStripeAuth()
  }, [pathname])

  return <div>{children}</div>
}