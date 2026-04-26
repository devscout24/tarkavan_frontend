import type { Metadata } from "next"
import ProfilePage from "./components/main-page"
import {
  getPublicProfile,
  type GetPublicProfileResult,
  type ProfileApiResponse,
  type PlayerRootData,
} from "../../action"

type ProfilePageProps = {
  params: Promise<{
    profileID: string
  }>
}

function isProfileSuccess(res: GetPublicProfileResult): res is {
  success: true
  data: ProfileApiResponse
} {
  return (
    res != null &&
    "success" in res &&
    res.success === true &&
    "data" in res &&
    res.data != null &&
    typeof res.data === "object" &&
    "data" in (res.data as object)
  )
}

function extractRootData(res: GetPublicProfileResult): PlayerRootData | null {
  if (!isProfileSuccess(res)) {
    return null
  }

  const rootData = res.data?.data
  if (rootData == null || typeof rootData !== "object") {
    return null
  }

  if (!("basic_info" in rootData) || rootData.basic_info == null) {
    return null
  }

  return rootData as PlayerRootData
}

async function getBaseUrl() {
  const configuredBase = process.env.NEXT_PUBLIC_BASE_URL?.trim()
  if (configuredBase) {
    return configuredBase.replace(/\/$/, "")
  }

  const productionHost =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?.trim() ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (productionHost) {
    return `https://${productionHost.replace(/^https?:\/\//, "").replace(/\/$/, "")}`
  }

  if (process.env.NODE_ENV === "production") {
    return "https://tarkavan.vercel.app"
  }

  return "http://localhost:3000"
}

export default async function ProfilePageFinal({ params }: ProfilePageProps) {
  const { profileID } = await params
  const res = await getPublicProfile({ id: profileID })
  const data = extractRootData(res)

  return <ProfilePage data={data} />
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { profileID } = await params
  const baseUrl = await getBaseUrl()
  const profileUrl = `${baseUrl}/profile/${profileID}`
  const ogRouteImage = `${baseUrl}/api/og?${new URLSearchParams({ url: profileUrl }).toString()}`
  const res = await getPublicProfile({ id: profileID })
  const rootData = extractRootData(res)

  console.log(ogRouteImage)

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
