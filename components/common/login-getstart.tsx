import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function LoginGetStart() {
  return (
    <div aria-label="Login and get started actions" className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <Link
          href="/auth?auth-tab=login"
          className="flex items-center text-nowrap text-white border border-brand py-2.5 px-5 rounded-full hover:bg-brand/10 transition-colors duration-200 bg-[blur(10px)]  "
        >
          Log In
          <ChevronRight className="size-4" />
        </Link>

        <Link
          href="/auth?auth-tab=register"
          className="flex items-center text-nowrap  border border-brand py-3 px-5 rounded-full   transition-colors duration-200 bg-brand hover:bg-brand text-primary font-semibold text-sm     "
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}
