"use client"
import ConnectStripe from "@/components/common/connect-stripe"
import { useEffect, useState } from "react"
import { getStripeData } from "../../coach/action"
import { useRouter } from "next/navigation"
import { Link } from "lucide-react"
import Lottie from "lottie-react"
import success from "../../../../public/success.json"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Loader from "@/components/common/loader"

export default function StripePage({}: {}) {
  // const router = useRouter()
  const [isConnected, setIsConnected] = useState(true)
  const [loaded, setLoaded] = useState(false)
  
  useEffect(()=> {
    
    console.log("isConnected", isConnected)
  } , [isConnected])

  useEffect(() => {
    const getStripeAuth = async () => {
      try {
        const res = await getStripeData()
        console.log("stripe data", res)

        if (res?.status) {
          setIsConnected(res?.data?.connected)
          setLoaded(true)
          return
        }

        if (res?.data?.payouts_enabled) {
          setIsConnected(true)
          setLoaded(true)
          return
        }
      } catch (err) {}
    }
    getStripeAuth()
  }, [])



  return (
    <div className="mx-auto h-dvh lg:max-w-1/2">
      {loaded === false ? (
        <Loader />
      ) : !isConnected ? (
        <ConnectStripe />
      ) : (
        <div className="rounded-2xl border border-white/8 bg-secondary/20 p-5 text-white md:p-6">
          <div className="mx-auto w-50 pt-5">
            <Lottie animationData={success} loop={false} />
          </div>
          <div className="text-center">
            <h3 className="text-center text-base font-semibold text-green-500 md:text-2xl">
              Account Connected
            </h3>
            <p className="my-2 text-white!">
              Thank you for your secure online payment connection.
            </p>
            <p className="text-white!"> Have a great day! </p>
          </div>
        </div>
      )}
    </div>
  )
}
