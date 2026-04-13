"use client"

import Image from "next/image"
import GoEliteShap from "../icons/go-elite-shap"
import Container from "../common/container"

const steps = [
  {
    number: "1",
    title: "Create Your Profile",
    desc: "Sign up and build your sports profile with your experience, skills, and achievements.",
    side: "left",
  },
  {
    number: "2",
    title: "Discover & Connect",
    desc: "Find coaches, players, or teams that match your goals using smart filters.",
    side: "right",
  },
  {
    number: "3",
    title: "Book Training",
    desc: "Schedule sessions with certified coaches, pick dates and times that fit your calendar.",
    side: "left",
  },
  {
    number: "4",
    title: "Grow Your Career",
    desc: "Improve your skills, track progress, earn recognition, and build your sports career.",
    side: "right",
  },
]

export default function HowGoEliteWorks() {
  return (
    <section className="w-full bg-[#060807] px-6 py-10 md:py-20 text-white">
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
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex w-full mt-2 md:mt-6 lg:mt-12 relative z-2  ${
                  step.side === "right" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="relative flex gap-6  ">
                  {/* Large ghost number */}
                  <span className=" text-2xl md:text-5xl lg:text-[128px] leading-none font-bold text-secondary select-none">
                    {step.number}
                  </span>

                  {/* Content */}
                  <div className=" max-w-97  ">
                    <h3 className=" text-xl md:text-[36px] font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base md:text-xl leading-relaxed text-white/80">
                      {step.desc}
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
