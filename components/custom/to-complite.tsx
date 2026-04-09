import type { LucideIcon } from "lucide-react"
import {
  BadgeCheck,
  CalendarDays,
  Goal,
  MessageCircle,
  PlaySquare,
  ShieldCheck,
  User,
  Users,
  Video,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Container from "../common/container"


type FeatureItem = {
  title: string
  description: string
  icon: LucideIcon
} 
const features: FeatureItem[] = [
  {
    title: "Athlete Profiles",
    description:
      "Comprehensive profiles with stats, achievements, playing history, and position details.",
    icon: User,
  },
  {
    title: "Video Highlights",
    description:
      "Upload training clips and game highlights for coaches and scouts to evaluate your talent.",
    icon: Video,
  },
  {
    title: "Coach Marketplace",
    description:
      "Browse certified coaches by sport, location, rating, and price. Book sessions instantly.",
    icon: Goal,
  },
  {
    title: "Booking System",
    description:
      "Full calendar integration for scheduling, rescheduling, and managing all training sessions.",
    icon: CalendarDays,
  },
  {
    title: "Real-Time Messaging",
    description:
      "Direct communication between players, coaches, and teams with instant notifications.",
    icon: MessageCircle,
  },
  {
    title: "Team Networking",
    description:
      "Teams can recruit players, challenge other teams to matches, and manage rosters.",
    icon: Users,
  },
]

function FeatureCard({ item }: { item: FeatureItem }) {
  const Icon = item.icon

  return (
    <Card className="h-full rounded-xl border border-white/10 bg-white/5 text-white  ">
      <CardHeader className="pb-2">
        <div className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-md border border-brand/35 bg-brand/10 text-brand">
          <Icon className="size-4" />
        </div>
        <CardTitle className="text-[24px] font-bold text-white">
          {item.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-lg  leading-relaxed text-secondary">
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default function ToComplite() {
  return (
    <section 
      className=" py-35  bg-[#060807]!  "
    >
      <Container>
        <div className="mx-auto max-w-330 rounded-2xl  px-5 py-12 sm:px-10 lg:px-12">
          <header className="text-center">
            <h2
              id="compete-heading"
              className="text-[64px] font-semibold tracking-tight text-white"
            >
              Everything You Need to Compete
            </h2>
            <p className="mx-auto mt-7.5 max-w-xl text-xl leading-relaxed text-secondary ">
              A complete ecosystem built for the modern athlete, coach, and
              team.
            </p>
          </header>

          <div className="mt-10 md:mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => (
              <article key={item.title}>
                <FeatureCard item={item} />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
