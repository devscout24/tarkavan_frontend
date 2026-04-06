import { Calendar } from "lucide-react";
import { Card, CardContent  } from "@/components/ui/card"; 
import CommonBtn from "@/components/common/common-btn";

interface PlayerRecruitmentCardProps { 
  position?: string;
  ageGroup?: string;
  tryoutDates?: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
  className?: string;
}

export default function PlayerRecruitmentCard({ 
  position = "Defender, Winger",
  ageGroup = "Elite U16 | Age: U16",
  tryoutDates = "Tryouts: March 15-18, 2026",
  description = "Looking for skilled defenders for upcoming season.",
  buttonText = "Apply",
  onClick,
  className = "",
}: PlayerRecruitmentCardProps) {
  return (
    <Card className={`overflow-hidden border-0 shadow-xl py-0! gap-0 mt-6 ${className}`}>
      {/* Gradient Header */}
      <div className="  text-center font-medium text-lg    ">
         <img src="/images/recruitimg.png" alt="recruitimg" />
      </div>

      {/* Content */}
      <CardContent className="bg-primary p-6 space-y-6     ">
        {/* Position */}
        <div>
          <h3 className="text-2xl font-semibold text-white">{position}</h3>
          <p className="text-white mt-1">{ageGroup}</p>
        </div>

        {/* Tryout Info */}
        <div className="flex items-center gap-3 text-white">
          <Calendar className="w-5 h-5" />
          <span className="text-sm">{tryoutDates}</span>
        </div>

        {/* Description */}
        <p className="text-white text-[15px] leading-relaxed">
          {description}
        </p>

        {/* Apply Button */} 
        <CommonBtn onClick={onClick} variant="outline" className="w-full bg-brand hover:bg-brand/90 font-semibold text-sm  " size="lg" text={buttonText} />
      
      </CardContent>
    </Card>
  );
}