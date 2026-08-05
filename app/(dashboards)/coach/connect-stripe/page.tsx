"use client"
import ConnectStripe from "@/components/common/connect-stripe"
import { useEffect, useState } from "react"
import { getStripeData, resetStripeData } from "../../coach/action" 
import Lottie from "lottie-react"
import success from "../../../../public/success.json" 
import Loader from "@/components/common/loader"
import { Button } from "@/components/ui/button"
import { VscDebugDisconnect } from "react-icons/vsc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner"



export default function StripePage({}: {}) {
  // const router = useRouter()
  const [isConnected, setIsConnected] = useState(true)
  const [loaded, setLoaded] = useState(true)
  const [disconnectLoading, setDisconnectLoading] = useState(false)
  
 
  useEffect(() => {
    const getStripeAuth = async () => {
      try {
        const res = await getStripeData() 

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

  const handleDisconnectStripe = async () =>  {
    setDisconnectLoading(true)
    try{
      const res = await resetStripeData()
      if(res?.status) { 
        setIsConnected(false)
        setDisconnectLoading(false)
        toast.success( res?.message  || "Stripe account disconnected successfully")
      }else{
        setDisconnectLoading(false)
        toast.error(res?.message || "Failed to disconnect stripe account")
      }
 
    }catch(err){

    }finally{
      setDisconnectLoading(false)
    }
  }



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
            <h3 className="text-center text-base font-semibold text-brand md:text-2xl">
              Account Connected
            </h3>
            <p className="my-2 text-white!">
              Thank you for your secure online payment connection.
            </p>
            <p className="text-white!"> Have a great day! </p>

           
           <Button 
             disabled={disconnectLoading}
             className=" mt-10 bg-brand text-primary py-5 w-full text-lg font-medium cursor-pointer     "
             onClick={handleDisconnectStripe}
           >  
            {disconnectLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 
              <VscDebugDisconnect   />
            }
              Disconnect Stripe
           </Button>

          </div>
        </div>
      )}
    </div>
  )
}
