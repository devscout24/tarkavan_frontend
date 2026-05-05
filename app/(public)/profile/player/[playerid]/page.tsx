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
  if( res && "success" in res && res.success && res.data && "data" in res.data && res.data.data ) { 
    data = res.data.data
  }
  
  return <ProfilePage data={data as TPlayerProfile} />
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { playerid } = await params
  const baseUrl = `https://tarkavan.vercel.app`
  const profileUrl = `${baseUrl}/profile/${playerid}`
  const ogRouteImage = `${baseUrl}/api/og?${new URLSearchParams({ url: profileUrl }).toString()}`
  const res = await getPlayerProfile(String(playerid))
  let rootData = null
  if( res && "success" in res && res.success && res.data && "data" in res.data && res.data.data ) { 
    rootData = res.data.data
  }


  

  const basic = rootData?.basic_info
  const title = basic?.full_name
    ? `${basic.full_name} - Go Elite Profile`
    : "Go Elite Player Profile"
  const description =
    basic?.biography?.slice(0, 160) || "View this player's profile on Go Elite."

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: profileUrl,
    },
    openGraph: {
      type: "website",
      url: profileUrl,
      siteName: "Go Elite",
      title,
      description,
      images: [
        {
          url: ogRouteImage,
          width: 1200,
          height: 630,
          alt: `${basic?.full_name ?? basic?.name ?? "Player"} profile preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogRouteImage],
    },
    other: {
      "twitter:domain": new URL(baseUrl).hostname,
      "twitter:url": profileUrl,
    },
  }
}
