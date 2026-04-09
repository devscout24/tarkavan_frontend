import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type BIOProps = {
  title?: string
  description?: string
  className?: string
}

const defaultDescription =
  "Creative midfielder with excellent vision and aéng ability. Strong game intelligence and leadership."

export default function BIO({
  title = "PLAYER Bio",
  description = defaultDescription,
  className,
}: BIOProps) {
  return (
    <Card
      className={cn(
        "mt-6 w-full rounded-[22px] border border-brand/80 bg-[#151515]/40 p-0 shadow-[0_0_0_1px_rgba(178,246,111,0.16)]",
        className
      )}
    >
      <CardHeader className="px-8 pt-8 ">
        <CardTitle className="text-[24px] font-bold tracking-[0.2em] text-brand uppercase">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-8 pb-5 ">
        <p className="text-base leading-relaxed text-white/80">{description}</p>
      </CardContent>

    </Card>
  )
}
