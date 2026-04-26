import type { Metadata } from "next"
import ProfilePage from "./components/main-page"
import { getPublicProfile } from "../../action"

export const revalidate = 60

type ProfilePageProps = {
  params: Promise<{
    profileID: string
  }>
}

export default async function ProfilePageFinal({ params }: ProfilePageProps) {
  return <ProfilePage />
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { profileID } = await params

  const res = await getPublicProfile({ id: profileID })

  const profile =
    res && "success" in res && res.success ? res.data : null

  const title = profile?.name
    ? `${profile.name} — Go Elite Profile`
    : "Go Elite Player Profile"

  const description = profile?.bio
    ? profile.bio.slice(0, 160)
    : "View this player's profile on Go Elite."

  const profileUrl = `https://tarkavan.vercel.app/profile/${profileID}`

  const ogImage = "https://tarkavan.vercel.app/images/program_details_bg.png"

  return {
    metadataBase: new URL("https://tarkavan.vercel.app"),
    alternates: {
      canonical: profileUrl,
    },
    title,
    description,

    openGraph: {
      type: "profile",
      siteName: "Go Elite",
      title,
      description,
      url: profileUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} preview`,
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}






















// import type { Metadata } from "next"
// import ProfilePage from "./components/main-page"

// export const dynamic = "force-dynamic"
// export const revalidate = 0
// export const fetchCache = "force-no-store"

// type ProfilePageProps = {
//   params: Promise<{
//     profileID: string
//   }>
// }

// export default async function ProfilePageFinal({ params }: ProfilePageProps) {
//   await params

//   return (
//     <>
//       <ProfilePage />
//     </>
//   )
// }

// export async function generateMetadata({
//   params,
// }: ProfilePageProps): Promise<Metadata> {
//   const { profileID } = await params

//   // Cache-busting for social crawlers so previews can refresh on re-share.
//   const cacheBuster = Date.now().toString()
//   const profileUrl = `https://tarkavan.vercel.app/profile/${profileID}`
//   const ogImageUrl = new URL(
//     "/images/program_details_bg.png",
//     "https://tarkavan.vercel.app"
//   )
//   ogImageUrl.searchParams.set("v", cacheBuster)
//   const ogImage = ogImageUrl.toString()

//   return {
//     metadataBase: new URL("https://tarkavan.vercel.app"),
//     alternates: {
//       canonical: profileUrl,
//     },
//     title: "post.title",
//     description: "post.excerpt",
//     openGraph: {
//       type: "article",
//       siteName: "Go Elite",
//       title: "post.title",
//       description: "post.excerpt",
//       url: profileUrl,
//       images: [
//         {
//           url: ogImage,
//           width: 1200,
//           height: 630,
//           alt: "Go Elite player profile preview",
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "post.title",
//       description: "post.excerpt",
//       images: [ogImage],
//     },
//     other: {
//       "og:image": ogImage,
//       "og:image:secure_url": ogImage,
//       "twitter:image": ogImage,
//     },
//   }
// }
