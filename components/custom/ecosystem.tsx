import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Container from "../common/container"

type EcosystemCardProps = {
  title: string
  description: string
  href: string
  ctaLabel: string
}

const ecosystemItems: EcosystemCardProps[] = [
  {
    title: "For Players",
    description:
      "Build your sports profile, upload highlight videos, track your stats, and connect with professional coaches to accelerate your career.",
    href: "auth?auth-tab=register?role=player",
    ctaLabel: "Get Started",
  },
  {
    title: "For Coaches",
    description:
      "Create a coaching profile, offer training services, manage bookings, and earn revenue - all from one powerful dashboard.",
    href: "auth?auth-tab=register?role=coach",
    ctaLabel: "Get Started",
  },
  {
    title: "For Teams",
    description:
      "Discover talented players, connect with certified coaches, manage your roster, and schedule matches with other teams.",
    href: "auth?auth-tab=register?role=club",
    ctaLabel: "Get Started",
  },
]

function EcosystemCard({
  title,
  description,
  href,
  ctaLabel,
}: EcosystemCardProps) {
  return (
    <Card className="h-full rounded-2xl border border-white/15 bg-white/10 px-3 md:px-6 py-3 md:py-7.5 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className=" text-lg md:text-[24px] font-medium md:font-bold text-white">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <CardDescription className="min-h-20 text-lg leading-relaxed font-thin text-secondary">
          {description}
        </CardDescription>

        <Button
          asChild
          size="lg"
          className="h-12 rounded-full bg-brand px-7 text-base md:text-lg font-medium text-black hover:bg-brand/90!"
        >
          <Link href={href} aria-label={`${ctaLabel} for ${title}`}>
            {ctaLabel}
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function Ecosystem() {
  return (
    <section
      className="bg-[#060807]!"
      style={{
        backgroundImage: `url("/images/ecosystemBg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <div className="sm:p-12 px-2 py-10 lg:p-16">
          <div className="md:flex items-center justify-between">
            <div className="space-y-6">
              <p className="text-lg font-medium text-[#3EE4C2]">
                Built For Everyone
              </p>

              <h2
                id="ecosystem-heading"
                className=" text-xl md:text-2xl lg:text-4xl xl:text-[64px] leading-tight tracking-tight text-white"
              >
                One Platform, Three Ecosystems
              </h2>

              <p className="max-w-2xl text-base md:text-2xl leading-relaxed text-secondary">
                Whether you&apos;re an athlete looking to level up, a coach
                growing your business, or a team scouting talent - GoElite has
                everything you need.
              </p>
            </div>

            <Image
              src="/images/ecosysimg.png"
              alt="Athlete training on field"
              width={220}
              height={260}
              className="min-w-85 object-cover"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {ecosystemItems.map((item) => (
              <article key={item.title} className="">
                <EcosystemCard {...item} />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
