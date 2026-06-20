"use client"

import Lottie from "lottie-react"
import Error from "../../../public/Error.json"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { TClubUser } from "../payment-success/page" 

export default function PaymentCancel() {
  const router = useRouter()
  const [user, setUser] = useState<TClubUser | null>(null)
  

  useEffect(() => {
    const storedUser = localStorage.getItem("go_elite_user")
    if (!storedUser) return

    try {
      const parsedUser: TClubUser = JSON.parse(storedUser)
      const updatedUser: TClubUser = {
        ...parsedUser,
        is_subscription_active: true,
      }

      setUser(updatedUser) 
  
      const timer = setTimeout(() => {
        router.replace(`/${parsedUser.role}`)
      }, 3000)

      return () => clearTimeout(timer)
    } catch {
      setUser(null)
    }
  }, [])

  return (
    <div className="grid h-screen place-items-center bg-white">
      <div className="">
        <div className="mx-auto w-50 pt-5">
          <Lottie animationData={Error} loop />
        </div>
        <div className="text-center">
          <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
            Payment Failed!
          </h3>
          <p className="my-2 text-gray-600">
            There was an error processing your payment.
          </p>
          <p> Please try again later. </p>
          <div className="py-10 text-center">
            <Link
              href={`/${user?.role}`}
              className="rounded-lg bg-brand px-12 py-3 font-semibold text-primary hover:bg-brand/50"
            >
              GO BACK TO DASHBOARD
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
