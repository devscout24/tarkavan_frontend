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

