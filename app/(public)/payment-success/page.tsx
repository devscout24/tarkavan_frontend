"use client"

import Lottie from "lottie-react"
import success from "../../../public/success.json"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PaymentSuccess() {
  const router = useRouter()
  const user =
    typeof window !== "undefined" ? localStorage.getItem("go_elite_user") : null
  const parsedUser = user ? JSON.parse(user) : null
  const role = parsedUser?.role || "user"
  setTimeout(() => {
      router.replace(`/${role}`)
  }, 3000)

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
              href={`/${role}`}
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
