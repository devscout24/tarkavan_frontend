import { ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Banner() {
  return (
    <section
      //   style={{
      //     backgroundImage: `url("/images/background.svg")`,
      //     backgroundRepeat: "no-repeat",
      //     backgroundPosition: "center",
      //   }}
      className="bg-[#060807] pt-20 md:pt-30 lg:pt-37.5 pb-17.5 text-center"
    >
      <Image
        src="/images/background.svg"
        alt="Illustration of athletes and coaches connecting on the platform"
        width={1000}
        height={1000}
        className="absolute top-0 left-1/2 z-1 mx-auto mb-10 w-full max-w-340 -translate-x-1/2 transform rounded-b-2xl object-contain   "
      />

      {/* Pill button */}
      <button className="relative z-2 mb-6 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-nowrap text-blue-100 transition-colors hover:bg-white/20">
        Grow on Your Own Terms
      </button>

      {/* Title */}
      <h1 className="relative z-2 text-xl leading-tight font-bold text-white italic md:text-2xl lg:text-4xl xl:text-[70px]">
        The Ultimate Platform for
        <br />
        Athletes, Coaches &amp; Teams
      </h1>

      {/* Description */}
      <p className="relative z-2 mx-auto mt-4 max-w-122.5 text-sm leading-relaxed text-white/70 md:text-xl px-2    ">
        Connect with elite coaches, showcase your talent, book professional
        training sessions, and grow your sports career — all in one powerful
        platform.
      </p>

      {/* CTA buttons */}
      <div className="relative z-2 mx-auto mt-10 w-full max-w-3xl">
        <div className="flex flex-col items-center gap-4 sm:hidden">
          <button
            type="button"
            className="inline-flex min-h-14 w-full max-w-70 items-center justify-center gap-2 rounded-full border border-[#D8FFB1]/60 bg-[linear-gradient(135deg,#09302D_0%,#065A4A_45%,#1DAE75_100%)] px-8 text-base font-medium text-white shadow-[0_0_30px_rgba(23,180,109,0.35)] transition-transform duration-300 hover:scale-[1.02]"
          >
            Join as Player
            <ChevronRight className="size-4" />
          </button>

          <button
            type="button"
            className="inline-flex min-h-14 w-full max-w-70 items-center justify-center gap-2 rounded-full border border-[#A5CEE3]/45 bg-[linear-gradient(135deg,#00101A_0%,#012739_55%,#016465_100%)] px-8 text-base font-medium text-white shadow-[0_0_28px_rgba(1,85,90,0.28)] transition-transform duration-300 hover:scale-[1.02]"
          >
            Join as Coach
            <ChevronRight className="size-4" />
          </button>

          <button
            type="button"
            className="inline-flex min-h-14 w-full max-w-70 items-center justify-center gap-2 rounded-full border border-[#D8FFB1]/60 bg-[linear-gradient(135deg,#09302D_0%,#086547_45%,#20B46B_100%)] px-8 text-base font-medium text-white shadow-[0_0_30px_rgba(23,180,109,0.35)] transition-transform duration-300 hover:scale-[1.02]"
          >
            Join as Club
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="relative hidden h-52 sm:block">
          <svg
            viewBox="0 0 700 260"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M168 126 C 230 24, 472 24, 534 126"
              stroke="#C8FF87"
              strokeWidth="3"
              strokeDasharray="10 10"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M168 126 C 230 228, 472 228, 534 126"
              stroke="#C8FF87"
              strokeWidth="3"
              strokeDasharray="10 10"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
          </svg>

          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <button
              type="button"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#D8FFB1]/60 bg-[linear-gradient(135deg,#09302D_0%,#065A4A_45%,#1DAE75_100%)] px-8 text-base font-medium text-white shadow-[0_0_30px_rgba(23,180,109,0.35)] transition-transform duration-300 hover:scale-[1.02] sm:px-10 sm:text-lg"
            >
              Join as Player
              <ChevronRight className="size-4 sm:size-5" />
            </button>
          </div>

          <div className="absolute bottom-15 left-14 sm:left-25">
            <button
              type="button"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#A5CEE3]/45 bg-[linear-gradient(135deg,#00101A_0%,#012739_55%,#016465_100%)] px-8 text-base font-medium text-white shadow-[0_0_28px_rgba(1,85,90,0.28)] transition-transform duration-300 hover:scale-[1.02] sm:px-10 sm:text-lg"
            >
              Join as Coach
              <ChevronRight className="size-4 sm:size-5" />
            </button>
          </div>

          <div className="absolute right-25 bottom-15 sm:right-25">
            <button
              type="button"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#D8FFB1]/60 bg-[linear-gradient(135deg,#09302D_0%,#086547_45%,#20B46B_100%)] px-8 text-base font-medium text-white shadow-[0_0_30px_rgba(23,180,109,0.35)] transition-transform duration-300 hover:scale-[1.02] sm:px-10 sm:text-lg"
            >
              Join as Club
              <ChevronRight className="size-4 sm:size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
