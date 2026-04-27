"use client"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  FriendlyMatchCard,
  MatchPlaceholderCard,
} from "@/components/common/friendly-match-card"
import { useRouter } from "next/navigation"
import MatchTable from "./components/match-table"
import { useEffect, useState } from "react"
import { getMatchList } from "./action"

type Match = {
  id: number
  club_team_id: number
  available_date: string
  status: string
  opponent_club_id: null | number
  location: string
  field_opportunity: string
  created_at: string
  updated_at: string
  club_team: {
    id: number
    name: string
  }
}

export default function Page() {
  const route = useRouter()
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    const getMatchData = async () => {
      try {
        const res = await getMatchList()
        console.log(res)

        if (
          res &&
          typeof res === "object" &&
          "success" in res &&
          res.success &&
          "data" in res
        ) {
          const typedRes = res as {
            success: true
            data: { data: Match[] }
          }
          if (typedRes.data && typedRes.data.data) {
            setMatches(typedRes.data.data)
          }
        }
      } catch (err) {
        console.error("Error fetching match data:", err)
      }
    } 
    getMatchData()

    const handleMatchAdd = () => {
      getMatchData()
    }

    window.addEventListener('matchAdd', handleMatchAdd)

    return () => {
      window.removeEventListener('matchAdd', handleMatchAdd)
    }
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const formatFieldOpportunity = (fieldOpp: string) => {
    return fieldOpp
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <section className="space-y-6 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-medium text-white">Professional Coaches</h1>

        <Button
          type="button"
          onClick={() => route.push("?add-new=friendly-match")}
          className="h-11 rounded-xl bg-brand px-4 text-sm font-semibold text-[#111111] shadow-none hover:bg-brand/95"
        >
          <Plus className="size-4" />
          Add Friendly Match
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   ">
        {matches.map((match) => (
          <FriendlyMatchCard
            key={match.id}
            clubName={match.club_team.name}
            title="Friendly Match Available"
            teamName={match.club_team.name}
            date={formatDate(match.available_date)}
            location={
              match.location.charAt(0).toUpperCase() + match.location.slice(1)
            }
            note={formatFieldOpportunity(match.field_opportunity)}
            actionLabel="View Details"
          />
        ))}

        <MatchPlaceholderCard />
      </div>

      {/* table */}
      <MatchTable />
    </section>
  )
}
