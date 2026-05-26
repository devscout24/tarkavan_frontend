import ProfilePage from "./components/main-page"
import { TPlayerProfile } from "@/types"
import { getPlayerProfile } from "@/app/(public)/action"
import { Metadata } from "next"

type ProfilePageProps = {
  params: Promise<{
    playerid: string
  }>
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
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

  const previewImage = data?.basic_info?.preview

  return {
    metadataBase: new URL("https://goelitesport.com") ,
    title: data?.basic_info?.name || "Player Profile",
    description: data?.basic_info?.bio || "Player profile preview",

    openGraph: {
      title: data?.basic_info?.name || "Player Profile",
      description: data?.basic_info?.bio || "Player profile preview",
      images: previewImage
        ? [
            {
              url: previewImage,
              width: 1200,
              height: 630,
              alt: data?.basic_info?.name || "Profile Preview",
            },
          ]
        : [],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: data?.basic_info?.name || "Player Profile",
      description: data?.basic_info?.bio || "Player profile preview",
      images: previewImage ? [previewImage] : [],
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
