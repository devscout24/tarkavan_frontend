import StatCard from "@/components/common/stat-card";
import { TPlayerStatsSummary } from "@/types/player.type";
import { Calendar, Clipboard, Eye, Video, Wallet } from "lucide-react";

 
export default function PlayerStats({ summary }: { summary: TPlayerStatsSummary }) {

    const stats = [
  { title: "Profile Visibility", text: "Public", icon: <Eye className="h-full w-full "/> }, 
  { title: "Upcoming Session", text: "01", icon: <Clipboard className="h-full w-full "/> }, 
  { title: "Videos Uploaded", text: "3/5", icon: <Video className="h-full w-full "/> }
];

  return (
    <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 "> 
       
       {summary?.profile_visibility !== null && 
        <StatCard title={"Profile Visibility"} text={summary?.profile_visibility} icon={<Eye className="h-full w-full "/>} />
       }
       {summary?.total_programs !== null && 
        <StatCard title={"Total Programs"} text={String(summary?.total_programs)} icon={<Calendar className="h-full w-full "/>} />
       }
       {summary?.upcoming_sessions !== null && 
        <StatCard title={"Upcoming Sessions"} text={String(summary?.upcoming_sessions)} icon={<Clipboard className="h-full w-full "/>} />
       }
       {summary?.videos_uploaded !== null && 
        <StatCard title={"Videos Uploaded"} text={String(summary?.videos_uploaded)} icon={<Video className="h-full w-full "/>} />
       }
       {summary?.recent_payments !== null && 
        <StatCard title={"Recent Payments"} text={String(summary?.recent_payments)} icon={<Wallet className="h-full w-full "/>} />
       }
    
    </div>
  )
}