"use client"

import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Container from "../common/container"
import { TCoachAndClub } from "@/types"
import { BadgeCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"

export default function BrowseCoaches({ data }: { data: TCoachAndClub[] }) {
  return (
    <div className="bg-[#060807]">
      <Container>
        <div
          style={{
            backgroundImage: `url("/images/ecosystemBg.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* TOP TEXT */}
          <div className="flex flex-col px-2 pt-5">
            <p className="bg-linear-to-r from-[#009596] via-[#C6F57A] to-[#E8FFC3] bg-clip-text pb-10 text-lg font-medium text-transparent">
              Built For Everyone
            </p>

            <h2 className="text-2xl font-normal tracking-[-0.03em] text-[#f3f3f3] md:text-[44px] lg:text-[64px]">
              One Platform, Three Ecosystems
            </h2>

            <p className="mt-5 max-w-130 text-base text-[#b7bcc6] md:text-lg">
              Whether you&apos;re an athlete looking to level up, a coach
              growing your business, or a team scouting talent — GoElite has
              everything you need.
            </p>
          </div>

          {/* CAROUSEL */}
          <div className="relative mt-14 lg:mt-20">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 2500,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {data?.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-full pl-2 sm:basis-1/2 md:pl-4 lg:basis-1/3"
                  >
                    <article
                      className="relative overflow-hidden rounded-[18px] border border-white/10 shadow-lg transition hover:border-[#C6F57A]/30"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(17,34,27,0.88) 0%, rgba(13,22,18,0.95) 100%)",
                      }}
                    >
                      {/* badge */}
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className="bg-brand text-primary">
                          <BadgeCheck className="mr-1 h-4 w-4" />
                          {item.role}
                        </Badge>
                      </div>

                      {/* image */}
                      <div className="relative h-65 w-full">
                        <Image
                          src={item.image || "/images/bannerbg.png"}
                          alt={item.name} 
                          className="object-cover"
                          width={500}
                          height={260}
                        />
                      </div>

                      {/* content */}
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-white">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-sm text-secondary!">
                          Min {item.min_price} - Max {item.max_price}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-sm text-white">
                            <strong>From {item.min_price}</strong> / program
                          </p>

                          <Link
                            href={`/profile/${item.role}/${item.profile_id}`}
                            className="rounded-lg bg-[#C6F57A] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* ARROWS (IMPORTANT FIX) */}
              <CarouselPrevious className="left-2 z-10 hidden cursor-pointer text-white transition-all duration-300 hover:border-brand hover:bg-brand md:flex xl:-left-10" />
              <CarouselNext className="right-2 z-10 hidden cursor-pointer text-white transition-all duration-300 hover:border-brand hover:bg-brand md:flex xl:-right-10" />
            </Carousel>
          </div>

          {/* CTA */}
          {/* <div className="mt-12 flex justify-center">
            <button className="rounded-xl border border-white/20 px-7 py-3 text-white hover:bg-white/10">
              Browse All Coaches
            </button>
          </div> */}
        </div>
      </Container>
    </div>
  )
}
