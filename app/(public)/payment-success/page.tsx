"use client"

import Lottie from "lottie-react"
import success from "../../../public/success.json"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { setIssubscription_active } from "@/lib/features/userSlice"

export interface TClubUser {
  id: number
  name: string
  last_name: string | null
  email: string
  role: string
  country_id: number | null
  city_id: number | null
  status: string
  is_verified: boolean
  is_subscription_active: boolean
  created_at: string
  updated_at: string
}

export default function PaymentSuccess() {
  const router = useRouter()
  const [user, setUser] = useState<TClubUser | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const storedUser = localStorage.getItem("go_elite_user")
    if (!storedUser) return

    try {
      const parsedUser: TClubUser = JSON.parse(storedUser)
      const updatedUser: TClubUser = { ...parsedUser, is_subscription_active: true }

      setUser(updatedUser)

      if (parsedUser.role === "club") {
        localStorage.setItem("go_elite_user", JSON.stringify(updatedUser))
      }

      if (parsedUser.role === "coach") {
        dispatch(setIssubscription_active(true))
      }

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
          <Lottie animationData={success} loop />
        </div>
        <div className="text-center">
          <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
            Payment Done!
          </h3>
          <p className="my-2 text-gray-600">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <Link
              href={`/${user?.role}`}
              className="rounded-lg bg-brand px-12 py-3 font-semibold text-primary hover:bg-brand/50"
            >
              Go back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}