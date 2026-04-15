"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Container from "../common/container"

const TESTIMONIALS = [
  {
    quote:
      '"GoElite helped me connect with a coach who completely transformed my game. I went from bench player to team captain in one season."',
    name: "Jordan",
    role: "College Soccer Player",
    initials: "JW",
  },
  {
    quote:
      '"The quality of coaching I found here changed how I train every week. It feels like the platform was built exactly for serious athletes."',
    name: "Maya",
    role: "Track Athlete",
    initials: "MW",
  },
  {
    quote:
      '"As a coach, I started getting bookings much faster. The profile tools and scheduling flow made the whole process simple for my clients."',
    name: "Carlos",
    role: "Strength Coach",
    initials: "CR",
  },
  {
    quote:
      '"I found mentors, better sessions, and a clearer path to improve. The difference in my confidence on the field is obvious now."',
    name: "Nina",
    role: "Youth Football Player",
    initials: "NS",
  },
  {
    quote:
      '"Our team used GoElite to connect with specialists we could not find locally. It saved time and raised the level of our preparation."',
    name: "Ethan",
    role: "Team Manager",
    initials: "ER",
  },
]

// Triple-duplicate for infinite loop
const DUPLICATED = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

const CARD_WIDTH = 430
const CARD_GAP = 24
const SLIDE_AMOUNT = CARD_WIDTH + CARD_GAP
const LOOP_WIDTH = TESTIMONIALS.length * SLIDE_AMOUNT

type Direction = "forward" | "backward"

function useCarousel(
  ref: React.RefObject<HTMLDivElement | null>,
  direction: Direction
) {
  useEffect(() => {
    const row = ref.current
    if (!row) return

    let isPointerDown = false
    let startX = 0
    let startScrollLeft = 0
    let autoSlideTimer: ReturnType<typeof setInterval> | null = null

    const getBalancedOffset = () => {
      const visibleWidth = row.clientWidth
      const twoFullCardsWidth = CARD_WIDTH * 2 + CARD_GAP
      const edgePeek = Math.max(0, (visibleWidth - twoFullCardsWidth) / 2)
      return Math.max(0, SLIDE_AMOUNT - edgePeek)
    }

    const normalizeLoopPosition = () => {
      if (row.scrollLeft >= LOOP_WIDTH * 2) row.scrollLeft -= LOOP_WIDTH
      else if (row.scrollLeft <= 0) row.scrollLeft += LOOP_WIDTH
    }

    const snapToNearestCard = () => {
      const nearestIndex = Math.round(row.scrollLeft / SLIDE_AMOUNT)
      row.scrollTo({ left: nearestIndex * SLIDE_AMOUNT, behavior: "smooth" })
    }

    const stopAutoSlide = () => {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer)
        autoSlideTimer = null
      }
    }

    const startAutoSlide = () => {
      stopAutoSlide()
      autoSlideTimer = setInterval(() => {
        if (isPointerDown) return
        normalizeLoopPosition()
        row.scrollBy({
          left: direction === "forward" ? SLIDE_AMOUNT : -SLIDE_AMOUNT,
          behavior: "smooth",
        })
      }, 3000)
    }

    const beginDrag = (clientX: number) => {
      isPointerDown = true
      startX = clientX
      startScrollLeft = row.scrollLeft
      row.classList.add("!cursor-grabbing")
      stopAutoSlide()
    }

    const moveDrag = (clientX: number) => {
      if (!isPointerDown) return
      row.scrollLeft = startScrollLeft - (clientX - startX)
    }

    const endDrag = () => {
      if (!isPointerDown) return
      isPointerDown = false
      row.classList.remove("!cursor-grabbing")
      normalizeLoopPosition()
      snapToNearestCard()
      startAutoSlide()
    }

    const onMouseDown = (e: MouseEvent) => beginDrag(e.clientX)
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX)
    const onTouchStart = (e: TouchEvent) => beginDrag(e.touches[0].clientX)
    const onTouchMove = (e: TouchEvent) => moveDrag(e.touches[0].clientX)
    const onScroll = () => {
      if (!isPointerDown) normalizeLoopPosition()
    }

    row.addEventListener("mousedown", onMouseDown)
    row.addEventListener("mousemove", onMouseMove)
    row.addEventListener("mouseleave", endDrag)
    row.addEventListener("mouseenter", stopAutoSlide)
    row.addEventListener("mouseleave", startAutoSlide)
    row.addEventListener("touchstart", onTouchStart, { passive: true })
    row.addEventListener("touchmove", onTouchMove, { passive: true })
    row.addEventListener("touchend", endDrag)
    row.addEventListener("scroll", onScroll)
    window.addEventListener("mouseup", endDrag)

    const balancedOffset = getBalancedOffset()
    row.scrollLeft =
      direction === "forward"
        ? LOOP_WIDTH + balancedOffset
        : LOOP_WIDTH - balancedOffset

    startAutoSlide()

    return () => {
      stopAutoSlide()
      row.removeEventListener("mousedown", onMouseDown)
      row.removeEventListener("mousemove", onMouseMove)
      row.removeEventListener("mouseleave", endDrag)
      row.removeEventListener("mouseenter", stopAutoSlide)
      row.removeEventListener("mouseleave", startAutoSlide)
      row.removeEventListener("touchstart", onTouchStart)
      row.removeEventListener("touchmove", onTouchMove)
      row.removeEventListener("touchend", endDrag)
      row.removeEventListener("scroll", onScroll)
      window.removeEventListener("mouseup", endDrag)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction])
}

function TestimonialCard({
  quote,
  name,
  role,
  initials,
}: (typeof TESTIMONIALS)[number]) {
  return (
    <article
      className="scroll-snap-align-start box-border flex w-[min(430px,calc(100vw-72px))] shrink-0 cursor-grab snap-start flex-col gap-4 rounded-3xl border border-white/5 p-[47px_24px] transition-all duration-280 ease-in-out hover:border-[rgba(198,245,122,0.2)] hover:shadow-[0_18px_42px_rgba(0,0,0,0.22)] lg:w-107.5"
      style={{ background: "rgba(32, 197, 101, 0.15)" }}
    >
      {/* Rating */}
      <div className="flex items-center gap-2 text-sm font-semibold text-[#f3f3f3]">
        <Image
          src="/assets/starIcon.svg"
          alt=""
          width={16}
          height={16}
          aria-hidden
          draggable={false}
          className="pointer-events-none"
        />
        <span>5.0</span>
      </div>

      {/* Quote */}
      <p className="m-0 text-sm leading-[1.6] font-normal text-[#f3f3f3] italic">
        {quote}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3.5">
        <div
          className="flex h-10.5 w-10.5  shrink-0 items-center justify-center rounded-full border border-[rgba(32,197,101,0.32)] text-sm font-bold text-[#20c565]"
          style={{ background: "rgba(0,0,0,0.12)" }}
        >
          {initials}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm leading-[1.2] font-bold text-[#f3f3f3]">
            {name}
          </span>
          <span className="text-xs leading-[1.3] font-normal text-[#f3f3f3]/72">
            {role}
          </span>
        </div>
      </div>
    </article>
  )
}

function CarouselRow({
  direction,
  rowRef,
}: {
  direction: Direction
  rowRef: React.RefObject<HTMLDivElement | null>
}) {
  useCarousel(rowRef, direction)

  return (
    <div
      ref={rowRef}
      className="flex cursor-grab [scroll-snap-type:x_mandatory] gap-6 overflow-x-auto select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {DUPLICATED.map((item, i) => (
        <TestimonialCard key={i} {...item} />
      ))}
    </div>
  )
}

export default function AthletesAndCoaches() {
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)

  return (
    <section
      className=" px-4 py-5 font-sans md:px-6"
      style={{
        background:
          "url('/images/trustedbg.png') center/cover no-repeat",
      }}
    >
      <Container>
        <div className="overflow-hidden px-5 py-14 md:rounded-[32px] md:px-12 md:py-24  lg:py-40">
          {/* Title */}
          <h2 className="m-0 mb-6 md:mb-12 text-center text-2xl leading-[1.08] font-normal text-[#f3f3f3] lg:mb-20 md:text-[52px] lg:text-[64px]">
            Trusted by Athletes &amp; Coaches
          </h2>

          {/* Two carousel rows */}
          <div className="flex flex-col gap-7.5 ">
            <CarouselRow direction="backward" rowRef={topRowRef} />
            <CarouselRow direction="forward" rowRef={bottomRowRef} />
          </div>
        </div>
      </Container>
    </section>
  )
}
