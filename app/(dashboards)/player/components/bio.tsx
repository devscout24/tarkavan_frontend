import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BioProps {
  description?: string
}

export default function Bio({
  description = "Creative midfielder with excellent vision and agng ability. Strong game intelligence and leadership-",
}: BioProps) {
  return (
    <Card className="mt-6 border border-secondary/20 bg-primary       ">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-bold text-white ">
          Bio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-white">{description}</p>
      </CardContent>
    </Card>
  )
}
