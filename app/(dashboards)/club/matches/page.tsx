"use client"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  FriendlyMatchCard,
  MatchPlaceholderCard,
} from "@/components/common/friendly-match-card"
import { useRouter } from "next/navigation"

const matches = [
  {
    clubName: "CANADA STRIKERS FC",
    title: "Friendly Match Available",
    teamName: "U16 Elite Academy",
    date: "Saturday, Oct 14th",
    location: "Central Park Complex",
    note: "We have a field",
    actionLabel: "View Details",
  },
]

export default function Page() {

    const route = useRouter()

  return (
    <section className="space-y-6 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-medium text-white">Professional Coaches</h1>

        <Button
          type="button"
          onClick={()=> route.push("?add-new=friendly-match") }
          className="h-11 rounded-xl bg-brand px-4 text-sm font-semibold text-[#111111] shadow-none hover:bg-brand/95"
        >
          <Plus className="size-4" />
          Add Friendly Match
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-[repeat(2,minmax(0,320px))]">
        {matches.map((match) => (
          <FriendlyMatchCard key={match.title} {...match} />
        ))}

        <MatchPlaceholderCard />
      </div>
    </section>
  )
}
