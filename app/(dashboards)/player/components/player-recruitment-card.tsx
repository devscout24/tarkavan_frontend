import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import CommonBtn from "@/components/common/common-btn"
import Image from "next/image"

interface PlayerRecruitmentCardProps {
  position?: string
  ageGroup?: string
  tryoutDates?: string
  description?: string
  buttonText?: string
  onClick?: () => void  
  location?: string
  features?: string[]
  btnSecond?: boolean
  className?: string
}

export default function PlayerRecruitmentCard({
  position,
  ageGroup,
  tryoutDates,
  description,
  buttonText,
  onClick,
  className = "",
  location,
  features,
  btnSecond, 
}: PlayerRecruitmentCardProps) {
  return (
    <Card
      className={`mt-6 gap-0 overflow-hidden border-0 py-0! shadow-xl ${className}`}
    >
      {/* Gradient Header */}
      <div className="text-center text-lg font-medium">
        <Image
          src="/images/recruitimg.png"
          alt="recruitimg"
          width={300}
          height={200}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <CardContent className="space-y-6 bg-primary p-6">
        {/* Position */}
        <div>
          {position && (
            <h3 className="text-2xl font-semibold text-white">{position}</h3>
          )}
          {ageGroup && <p className="mt-1 text-white/70">{ageGroup}</p>}
        </div>

        {/* Tryout Info */}
        <div className="flex items-center gap-3 text-white/70">
          {tryoutDates && <Calendar className="h-5 w-5" />}
          {tryoutDates && <span className="text-sm">{tryoutDates}</span>}
        </div>

        {/* Description */}
        {description && (
          <p className="text-[15px] leading-relaxed text-white/70">
            {description}
          </p>
        )}

        {/* Location */}
        {location && (
          <div className="flex items-center gap-3 text-white/70">
            {location && <MapPin className="h-5 w-5" />}
            {location && <span className="text-sm">{location}</span>}
          </div>
        )}

        {features && features.length > 0 && (
          <div className="">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md bg-secondary px-2 py-1"
              >
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-white">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Apply Button */}
        <div className="flex justify-between "> 
          {btnSecond && (
            <CommonBtn 
              variant="outline"
              className="w-fit px-5 bg-transparent border border-brand text-brand hover:text-brand text-sm font-semibold hover:bg-transparent"
              size="lg"
              text={"View Details"}
            />
          )}

          <CommonBtn
            onClick={onClick}
            variant="outline"
            className="w-full px-5 bg-brand text-sm font-semibold hover:bg-brand/90"
            size="lg"
            text={buttonText}
          />
        </div>

      </CardContent>
    </Card>
  )
}
