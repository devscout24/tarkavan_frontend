import StatCard from "@/components/common/stat-card";
import { Calendar, Clipboard, Eye, Video, Wallet } from "lucide-react";

 
export default function PlayerStats() {

    const stats = [
  { title: "Profile Visibility", text: "Public", icon: <Eye className="h-full w-full "/> },
  { title: "Total Programs", text: "05", icon: <Calendar className="h-full w-full "/> },
  { title: "Upcoming Session", text: "01", icon: <Clipboard className="h-full w-full "/> },
  { title: "Recent Payments", text: "$360.00", icon: <Wallet className="h-full w-full "/> },
  { title: "Videos Uploaded", text: "3/5", icon: <Video className="h-full w-full "/> }
];

  return (
    <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 "> 
       
        {stats.map((stat) => (
            <StatCard key={stat.title} title={stat.title} text={stat.text} icon={stat.icon} />
        ))}
    
    </div>
  )
}