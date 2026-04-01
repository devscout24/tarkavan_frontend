import StatCard from "@/components/common/stat-card";
import { Calendar, Clipboard, Eye, Video, Wallet } from "lucide-react";

 
export default function PlayerStats() {

    const stats = [
  { title: "Profile Visibility", text: "Public", icon: <Eye className="text-black!"/> },
  { title: "Total Programs", text: "05", icon: <Calendar className="text-primary"/> },
  { title: "Upcoming Session", text: "01", icon: <Clipboard className="text-primary"/> },
  { title: "Recent Payments", text: "$360.00", icon: <Wallet className="text-primary"/> },
  { title: "Videos Uploaded", text: "3/5", icon: <Video className="text-primary"/> }
];

  return (
    <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 "> 
       
        {stats.map((stat) => (
            <StatCard key={stat.title} title={stat.title} text={stat.text} icon={stat.icon} />
        ))}
    
    </div>
  )
}