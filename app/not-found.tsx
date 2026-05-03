"use client"

import Link from "next/link"
import Lottie from "lottie-react"
import animationData from "@/public/lf20_kcsr6fcp.json"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <section className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 px-6">
      <div className="grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        {/* LEFT - TEXT */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
            Page Not Found
          </h2>

          <h1 className="mt-2 flex justify-center md:justify-start text-6xl font-extrabold  md:text-7xl text-brand  ">
            <span>4</span>
            <Image
              src="/images/footballImage.png"
              width={200}
              height={200}
              alt="404"
              className="w-15"
            />
            <span>4</span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-gray-600 md:ml-0">
            The page you are looking for might have been removed, renamed, or is
            temporarily unavailable.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-brand px-6 py-3 text-primary transition hover:bg-gray-800"
          >
            Go Home
          </Link>
          <div
            onClick={() => router.back()}
            className="mt-6 ml-2 inline-block rounded-xl border border-primary bg-transparent px-6 py-3 text-primary transition"
          >
            Go Back
          </div>
        </div>

        {/* RIGHT - LOTTIE */}
        <div className="order-1 mx-auto w-full max-w-md md:order-2">
          <Lottie animationData={animationData} loop />
        </div>
      </div>
    </section>
  )
}
