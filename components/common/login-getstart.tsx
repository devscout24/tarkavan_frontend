"use client"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { handleGetStarted, handleLogout } from "@/lib/helpers"
import isValidToken from "@/lib/isValid-token"
import CommonBtn from "./common-btn"

export default function LoginGetStart({ className }: { className?: string }) {
  const router = useRouter()
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("go_elite_token")
      : null
  const isLogin = isValidToken(token || "")
let user = null;

if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("go_elite_user");
  user = storedUser ? JSON.parse(storedUser) : null;
}

  return (
    <div
      aria-label="Login and get started actions"
      className={`relative ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        {isLogin ? (
          <CommonBtn
            onClick={() => handleLogout(router)}
            className="flex w-fit items-center rounded-full border border-brand bg-[blur(10px)] px-5 py-5.5  text-nowrap text-white transition-colors duration-200 hover:bg-brand/10  "
            text="Log out"
            size="sm"
            variant={"default"}
          />
        ) : (
          <Link
            href="/auth?auth-tab=login"
            className="flex items-center rounded-full border border-brand bg-[blur(10px)] px-5 py-2.5 text-nowrap text-white transition-colors duration-200 hover:bg-brand/10"
          >
            Log In
            <ChevronRight className="size-4" />
          </Link>
        )}

        {isLogin ?

          <Button
            onClick={() =>  router.push(`/${user?.role}`) }
            className="flex items-center rounded-full border border-brand bg-brand px-5 py-5.5 text-sm font-semibold text-nowrap text-primary transition-colors duration-200 hover:bg-brand"
          >
            Go to Dashboard
          </Button>
          :
          <Button
            onClick={() => handleGetStarted(router)}
            className="flex items-center rounded-full border border-brand bg-brand px-5 py-5.5 text-sm font-semibold text-nowrap text-primary transition-colors duration-200 hover:bg-brand"
          >
            Get Started
          </Button>
        }
      </div>
    </div>
  )
}
