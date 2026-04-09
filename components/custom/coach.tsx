"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Container from "../common/container"

const BASE_COACHES = [
  {
    image: "/images/carouselImage.png",
    name: "Marcus Rivera",
    role: "Striker Development",
    rating: "4.9",
    reviews: "127 reviews",
    price: "$85",
  },
  {
    image: "/images/carouselImage.png",
    name: "Marcus Rivera",
    role: "Striker Development",
    rating: "4.9",
    reviews: "127 reviews",
    price: "$85",
  },
  {
    image: "/images/carouselImage.png",
    name: "Marcus Rivera",
    role: "Striker Development",
    rating: "4.9",
    reviews: "127 reviews",
    price: "$85",
  },
  {
    image: "/images/carouselImage.png",
    name: "Marcus Rivera",
    role: "Striker Development",
    rating: "4.9",
    reviews: "127 reviews",
    price: "$85",
  },
  {
    image: "/images/carouselImage.png",
    name: "Marcus Rivera",
    role: "Striker Development",
    rating: "4.9",
    reviews: "127 reviews",
    price: "$85",
  },
  {
    image: "/images/carouselImage.png",
    name: "Marcus Rivera",
    role: "Striker Development",
    rating: "4.9",
    reviews: "127 reviews",
    price: "$85",
  },
]

// Duplicate for infinite loop effect
const COACHES = [...BASE_COACHES, ...BASE_COACHES]

const CARD_WIDTH = 324
const CARD_GAP = 24
const SLIDE_AMOUNT = CARD_WIDTH + CARD_GAP
const LOOP_WIDTH = BASE_COACHES.length * SLIDE_AMOUNT

export default function BrowseCoaches() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const isPointerDown = useRef(false)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const autoSlideTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const normalizeLoopPosition = () => {
    const el = carouselRef.current
    if (!el) return
    if (el.scrollLeft >= LOOP_WIDTH) el.scrollLeft -= LOOP_WIDTH
    else if (el.scrollLeft < 0) el.scrollLeft += LOOP_WIDTH
  }

  const snapToNearestCard = () => {
    const el = carouselRef.current
    if (!el) return
    const nearestIndex = Math.round(el.scrollLeft / SLIDE_AMOUNT)
    el.scrollTo({ left: nearestIndex * SLIDE_AMOUNT, behavior: "smooth" })
  }

  const stopAutoSlide = () => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current)
      autoSlideTimer.current = null
    }
  }

  const startAutoSlide = () => {
    stopAutoSlide()
    autoSlideTimer.current = setInterval(() => {
      if (isPointerDown.current) return
      normalizeLoopPosition()
      carouselRef.current?.scrollBy({ left: SLIDE_AMOUNT, behavior: "smooth" })
    }, 3000)
  }

  const beginDrag = (clientX: number) => {
    const el = carouselRef.current
    if (!el) return
    isPointerDown.current = true
    startX.current = clientX
    startScrollLeft.current = el.scrollLeft
    el.classList.add("cursor-grabbing")
    stopAutoSlide()
  }

  const moveDrag = (clientX: number) => {
    const el = carouselRef.current
    if (!isPointerDown.current || !el) return
    el.scrollLeft = startScrollLeft.current - (clientX - startX.current)
  }

  const endDrag = () => {
    const el = carouselRef.current
    if (!isPointerDown.current || !el) return
    isPointerDown.current = false
    el.classList.remove("cursor-grabbing")
    normalizeLoopPosition()
    snapToNearestCard()
    startAutoSlide()
  }

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return

    const onMouseDown = (e: MouseEvent) => beginDrag(e.clientX)
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX)
    const onMouseLeave = () => endDrag()
    const onMouseUp = () => endDrag()
    const onTouchStart = (e: TouchEvent) => beginDrag(e.touches[0].clientX)
    const onTouchMove = (e: TouchEvent) => moveDrag(e.touches[0].clientX)
    const onTouchEnd = () => endDrag()
    const onScroll = () => {
      if (!isPointerDown.current) normalizeLoopPosition()
    }
    const onMouseEnter = () => stopAutoSlide()
    const onMouseLeaveRestart = () => startAutoSlide()

    el.addEventListener("mousedown", onMouseDown)
    el.addEventListener("mousemove", onMouseMove)
    el.addEventListener("mouseleave", onMouseLeave)
    el.addEventListener("mouseenter", onMouseEnter)
    el.addEventListener("mouseleave", onMouseLeaveRestart)
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchmove", onTouchMove, { passive: true })
    el.addEventListener("touchend", onTouchEnd)
    el.addEventListener("scroll", onScroll)
    window.addEventListener("mouseup", onMouseUp)

    el.scrollLeft = 0
    startAutoSlide()

    return () => {
      stopAutoSlide()
      el.removeEventListener("mousedown", onMouseDown)
      el.removeEventListener("mousemove", onMouseMove)
      el.removeEventListener("mouseleave", onMouseLeave)
      el.removeEventListener("mouseenter", onMouseEnter)
      el.removeEventListener("mouseleave", onMouseLeaveRestart)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchmove", onTouchMove)
      el.removeEventListener("touchend", onTouchEnd)
      el.removeEventListener("scroll", onScroll)
      window.removeEventListener("mouseup", onMouseUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-[#060807]">
      <Container>
        <div
          className=""
          style={{
            backgroundImage: `url("/images/ecosystemBg.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",

          }}
        >
          {/* Top content */}
          <div className="flex  flex-col pt-5 ">
            <p
              className="m-0 text-lg leading-tight font-medium pb-10 "
              style={{
                background:
                  "linear-gradient(90deg, #009596 0%, #C6F57A 50%, #E8FFC3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Built For Everyone
            </p>

            <h2 className="m-0 text-[36px] leading-[1.08] font-normal tracking-[-0.03em] text-[#f3f3f3] md:text-[44px] lg:text-[64px]">
              One Platform, Three Ecosystems
            </h2>

            <p className="m-0 max-w-[530px] text-lg leading-[1.55] font-normal text-[#b7bcc6] lg:text-xl">
              Whether you&apos;re an athlete looking to level up, a coach
              growing your business, or a team scouting talent — GoElite has
              everything you need.
            </p>
          </div>

          {/* Carousel */}
          <div className="mt-14 lg:mt-20">
            <div
              ref={carouselRef}
              className="flex cursor-grab [scroll-snap-type:x_mandatory] gap-6 overflow-x-auto pb-2 select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {COACHES.map((coach, index) => (
                <article
                  key={index}
                  className="w-[min(324px,calc(100vw-64px))] flex-shrink-0 [scroll-snap-align:start] overflow-hidden rounded-[18px] border border-white/[0.08] shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition-all duration-[280ms] ease-in-out hover:border-[rgba(198,245,122,0.2)] hover:shadow-[0_22px_56px_rgba(0,0,0,0.34)]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(17,34,27,0.88) 0%, rgba(13,22,18,0.95) 100%)",
                  }}
                >
                  {/* Coach image */}
                  <div className="relative h-[250px] w-[min(324px,calc(100vw-64px))]">
                    <Image
                      src={coach.image}
                      alt={coach.name}
                      fill
                      className="pointer-events-none object-cover"
                      draggable={false}
                    />
                  </div>

                  {/* Coach body */}
                  <div
                    className="px-[18px] pt-5 pb-[18px]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(16,24,20,0.58) 0%, rgba(13,18,16,0.96) 100%)",
                    }}
                  >
                    <h3 className="m-0 text-[28px] leading-[1.15] font-bold text-[#f0f2f5]">
                      {coach.name}
                    </h3>

                    <p className="mt-2 mb-[18px] text-sm leading-[1.3] font-normal text-[#7b899d]">
                      {coach.role}
                    </p>

                    <div className="mb-[18px] flex items-center gap-2 text-[13px] text-[#dfe6ee]">
                      <Image
                        src="/images/starIcon.svg"
                        alt=""
                        width={14}
                        height={14}
                        aria-hidden
                      />
                      <strong className="font-bold">{coach.rating}</strong>
                      <span className="text-[#91a0b4]">({coach.reviews})</span>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <div className="text-xs leading-none font-normal text-[#f3f3f3]">
                        <strong className="text-[28px] font-bold">
                          {coach.price}
                        </strong>
                        /session
                      </div>

                      <button
                        type="button"
                        className="cursor-pointer rounded-[10px] border-none bg-[#20c565] px-4 py-3 text-sm leading-none font-semibold text-[#07110d] transition-all duration-200 ease-in-out hover:-translate-y-px hover:brightness-105"
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              className="rounded-xl border border-white/20 bg-transparent px-7 py-3 text-sm font-medium text-[#f3f3f3] transition-colors hover:bg-white/10"
            >
              Browse All Coaches
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}
