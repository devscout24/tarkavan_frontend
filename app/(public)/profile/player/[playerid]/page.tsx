import type { Metadata } from "next"
import ProfilePage from "./components/main-page"
import { TPlayerProfile } from "@/types"
import { getPlayerProfile } from "@/app/(public)/action" 

type ProfilePageProps = {
  params: Promise<{
    playerid: string
  }>
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

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { playerid } = await params

  

  // const res = await getPlayerProfile(String(playerid))
  // let rootData = null
  // if (
  //   res &&
  //   "success" in res &&
  //   res.success &&
  //   res.data &&
  //   "data" in res.data &&
  //   res.data.data
  // ) {
  //   rootData = res.data.data
  // }

  return {
    openGraph: {
      images: [`/profile/player/${playerid}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      images: [`/profile/player/${playerid}/opengraph-image`],
    },
  }
}
