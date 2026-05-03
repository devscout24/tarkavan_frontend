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
import { getMatchList, getMatchRechuestedByOtherClub } from "./action"
import { TMatchRequestByOthersClub } from "@/types"

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
  const [matchRequests, setMatchRequests] = useState<
    TMatchRequestByOthersClub[]
  >([])

  useEffect(() => {
    const getMatchData = async () => {
      try {
        const res = await getMatchList()

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

    window.addEventListener("matchAdd", handleMatchAdd)

    return () => {
      window.removeEventListener("matchAdd", handleMatchAdd)
    }
  }, [])

  useEffect(() => {
    const getMatchRechuestedByOtherClubData = async () => {
      try {
        const res = await getMatchRechuestedByOtherClub()

        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          setMatchRequests(res.data.data)
        }
      } catch (err) {
        console.error("Error fetching match request data:", err)
      }
    }
    getMatchRechuestedByOtherClubData()
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
      {matchRequests.length > 0 && (
        <div className="">
          <h2 className="text-lg font-medium text-white">
            Others match requests
          </h2>
          {/* table */}
          <MatchTable matchRequests={matchRequests} />
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-medium text-white">Professional Coaches</h2>

        <Button
          type="button"
          onClick={() => route.push("?add-new=friendly-match")}
          className="h-11 rounded-xl bg-brand px-4 text-sm font-semibold text-[#111111] shadow-none hover:bg-brand/95"
        >
          <Plus className="size-4" />
          Add Friendly Match
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            onClick={() => route.push(`/club/matches/${match.id}`)}
          />
        ))}

        <MatchPlaceholderCard />
      </div>
    </section>
  )
}
