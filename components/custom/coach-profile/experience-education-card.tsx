"use client"
 
import { Card } from "@/components/ui/card" 

 

export default function ExperienceEducationCard(
  {
    experience_education
  }: {
    experience_education: {
    title: string | number
    duration: string
    description: string
  }[]
  }
) {
 
 console.log("ExperienceEducationCard data:", experience_education) // Debug log to check data structure

  

  return (
    <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
      <h5 className="text-2xl leading-[125%] font-medium text-white xl:text-3xl 2xl:text-[34px]">
        Experience &amp; Education
      </h5>

      <div className="mt-6 space-y-4 xl:mt-7 xl:space-y-5 2xl:mt-8 2xl:space-y-6">
  
        {/* Experience Section */}
        {experience_education && experience_education.length > 0 &&
          experience_education.map((item, index) => (
            <div key={index} className="rounded-[12px] border border-secondary/60 bg-white/10 p-4 xl:p-5 2xl:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h6 className="text-[22px] leading-[112%] font-medium text-white xl:text-[28px] 2xl:text-[36px]">
                    {item.title ||
                      ""}
                  </h6>
                  <p className="mt-2 text-xs leading-[150%] font-semibold tracking-[-0.24px] text-white/50 xl:text-sm 2xl:text-base">
                    {item.description ||
                      ""}
                  </p>
                </div>
                {item.duration &&
                  <span className="rounded-[6px] bg-secondary/40 px-2 py-1 text-xs text-white/70 xl:px-2.5 xl:py-1.5 xl:text-sm">
                    {item.duration ||
                      ""}
                  </span>
                }
              </div>
            </div>
          ))
        }
      </div>
    </Card>
  )
}
