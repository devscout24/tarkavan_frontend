"use client"

import Lottie from "lottie-react"
import Error from "../../../public/Error.json"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PaymentError() {
  const router = useRouter()
  const user = typeof window !== "undefined" ? localStorage.getItem("go_elite_user") : null
  const parsedUser = user ? JSON.parse(user) : null
  const role = parsedUser?.role || "user"
  setTimeout(() => {
      router.replace(`/${role}`)
  }, 3000)

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
              href={`/${role}`}
              className="bg-brand px-12 py-3 font-semibold text-primary  hover:bg-brand/50 rounded-lg  "
            >
              GO BACK TO DASHBOARD
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
