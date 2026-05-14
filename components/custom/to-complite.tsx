 

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Container from "../common/container"
import { TFeatureItem, TFeaturesLanding } from "@/types/landing.type"
import Image from "next/image"


 
function FeatureCard({ item }: { item: TFeatureItem }) {
   

  return (
    <Card className="h-full rounded-xl border border-white/10 bg-white/5 text-white  ">
      <CardHeader className="pb-2">
           <Image
            src={item.icon}
            alt={`${item.title} icon`}
            width={200}
            height={200}
            className="w-10 h-10"
           /> 
        <CardTitle className=" text-base md:text-lg lg:text-[24px] font-bold text-white">
          {item.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-base md:text-lg leading-relaxed text-secondary">
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default function ToComplite({ data }: { data: TFeaturesLanding | undefined }) {
  return (
    <section 
      className="py-10 md:py-20 lg:py-35  bg-[#060807]!  "
    >
      <Container>
        <div className="mx-auto max-w-330 rounded-2xl  px-5 py-12 sm:px-10 lg:px-12">
          <header className="text-center">
            <h2
              id="compete-heading"
              className=" text-2xl md:text-4xl lg:text-[64px] font-semibold tracking-tight text-white"
            >
              Everything You Need to Compete
            </h2>
            <p className="mx-auto mt-7.5 max-w-xl text-base md:text-xl leading-relaxed text-secondary ">
              A complete ecosystem built for the modern athlete, coach, and
              team.
            </p>
          </header>

          <div className="mt-10 md:mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.items.map((item) => (
              <article key={item.title}>
                <FeatureCard item={item} />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
