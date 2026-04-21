import { TUser } from "@/types"
import isValidToken from "./isValid-token" 
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

 
  const handleGetStarted = (router: AppRouterInstance) => {

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("go_elite_token")
        : null
    const user: TUser | null =
      typeof window !== "undefined"
        ? localStorage.getItem("go_elite_user")
          ? JSON.parse(localStorage.getItem("go_elite_user") || "")
          : null
        : null

    const isValidUser = isValidToken(token || "")

    if (isValidUser) {
      router.push(`${user?.role}`)
      return
    }

    if (!token || !user || user.email || !user.role) {
      router.push("/auth?auth-tab=register")
    }
  }


  const handleLogout = (router: AppRouterInstance) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("go_elite_token")
      localStorage.removeItem("go_elite_user")
    }
    router.push("/")
  }




export { handleGetStarted, handleLogout }