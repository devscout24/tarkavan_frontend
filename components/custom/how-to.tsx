"use client"
 
import GoEliteShap from "../icons/go-elite-shap"
import Container from "../common/container"
import { TStepsResponse } from "@/types"

 

export default function HowGoEliteWorks({ data }: { data: TStepsResponse | undefined }) {
  return (
    <section id="how_to_work" className="w-full bg-[#060807] px-6 py-10 md:py-20 text-white">
      {/* Header */}
      <div className=" mb-10 md:mb-20 text-center">
        <h2 className=" text-xl md:text-2xl lg:text-4xl xl:text-[64px]  font-light tracking-tight text-white">
          How GoElite Works
        </h2>
        <p className="mt-5 text-xl text-secondary">
          Four simple steps to start your journey on the platform
        </p>
      </div>

      {/* Steps + SVG container */}
      <Container>
        <div className="relative mx-auto">
          <GoEliteShap className=" hidden md:block mt-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 " />

          {/* Steps */}
          <div className="flex flex-col gap-4 md:gap-10 lg:gap-14">
            {data?.steps.map((step, i) => (
              <div
                key={step.id  }
                className={`flex w-full mt-2 md:mt-6 lg:mt-12 relative z-2  ${
                  i%2 === 1 ? "justify-end" : "justify-start"
                }`}
              >
                <div className="relative flex gap-6  ">
                  {/* Large ghost number */}
                  <span className=" text-2xl md:text-5xl lg:text-[128px] leading-none font-bold text-secondary select-none">
                    {i+1}
                  </span>

                  {/* Content */}
                  <div className=" max-w-97  ">
                    <h3 className=" text-xl md:text-[36px] font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base md:text-xl leading-relaxed text-white/80">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
