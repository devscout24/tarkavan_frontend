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
import { EcosystemSection } from "@/types"
import { da } from "date-fns/locale"

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
    href: "auth?auth-tab=register&role=player",
    ctaLabel: "Get Started",
  },
  {
    title: "For Coaches",
    description:
      "Create a coaching profile, offer training services, manage bookings, and earn revenue - all from one powerful dashboard.",
    href: "auth?auth-tab=register&role=coach",
    ctaLabel: "Get Started",
  },
  {
    title: "For Teams",
    description:
      "Discover talented players, connect with certified coaches, manage your roster, and schedule matches with other teams.",
    href: "auth?auth-tab=register&role=club",
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
    <Card className="h-full rounded-2xl border border-white/15 bg-white/10 px-3 py-3 backdrop-blur-sm md:px-6 md:py-7.5">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white md:text-[24px] md:font-bold">
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
          className="h-12 rounded-full bg-brand px-7 text-base font-medium text-black hover:bg-brand/90! md:text-lg"
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

export default function Ecosystem({
  data,
}: {
  data: EcosystemSection | undefined
}) {
  const ecosystemItems: EcosystemCardProps[] = [
    {
      title: data?.cards[0]?.title || "For Players",
      description:
        data?.cards[0]?.description ||
        "Build your sports profile, upload highlight videos, track your stats, and connect with professional coaches to accelerate your career.",
      href: "auth?auth-tab=register&role=player",
      ctaLabel: "Get Started",
    },
    {
      title: data?.cards[1]?.title || "For Coaches",
      description:
        data?.cards[1]?.description ||
        "Create a coaching profile, offer training services, manage bookings, and earn revenue - all from one powerful dashboard.",
      href: "auth?auth-tab=register&role=coach",
      ctaLabel: "Get Started",
    },
    {
      title: data?.cards[2]?.title || "For Teams",
      description:
        data?.cards[2]?.description ||
        "Discover talented players, connect with certified coaches, manage your roster, and schedule matches with other teams.",
      href: "auth?auth-tab=register&role=club",
      ctaLabel: "Get Started",
    },
  ]

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
        <div className="px-2 py-10 sm:p-12 lg:p-16">
          <div className="items-center justify-between md:flex">
            <div className="space-y-6">
              <p className="text-lg font-medium text-[#3EE4C2]">
                Built For Everyone
              </p>

              {data?.header?.title && (
                <h2
                  id="ecosystem-heading"
                  className="text-xl leading-tight tracking-tight text-white md:text-2xl lg:text-4xl xl:text-[64px]"
                >
                  {data.header.title}
                </h2>
              )}

              {data?.header?.description && (
                <p className="max-w-2xl text-base leading-relaxed text-secondary md:text-2xl">
                  {data.header.description}
                </p>
              )}
            </div>

            <Image
              src="/images/ecosysimg.jpg"
              alt="Athlete training on field"
              width={500}
              height={500}
              className="min-w-85 object-cover rounded-lg   "
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
