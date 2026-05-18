import ProfilePage from "./components/main-page"
import { TPlayerProfile } from "@/types"
import { getPlayerProfile } from "@/app/(public)/action"
import type { Metadata } from "next"

type ProfilePageProps = {
  params: Promise<{
    playerid: string
  }>
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { playerid } = await params
  const res = await getPlayerProfile(String(playerid))

  let data = null

  if (
    res &&
    "success" in res &&
    res.success &&
    res.data &&
    "data" in res.data &&
    res.data.data
  ) {
    data = res.data.data
  }

  const playerName = data?.basic_info?.full_name ?? "Player Profile"
  const description = data?.basic_info?.biography ?? "View player profile on Go Elite"
  const imageUrl = `/api/og?playerid=${encodeURIComponent(String(playerid))}`

  return {
    title: playerName,
    description,
    openGraph: {
      title: playerName,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: playerName,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: playerName,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ProfilePageFinal({ params }: ProfilePageProps) {
  const { playerid } = await params
  const res = await getPlayerProfile(String(playerid))

  let data = null

  if (
    res &&
    "success" in res &&
    res.success &&
    res.data &&
    "data" in res.data &&
    res.data.data
  ) {
    data = res.data.data
  }

  return <ProfilePage data={data as TPlayerProfile} />
}