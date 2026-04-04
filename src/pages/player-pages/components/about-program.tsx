import { cn } from "../../../lib/utils"

type ProgramGoal = {
  title: string
  description: string
}

type AboutProgramProps = {
  sectionTitle?: string
  description?: string
  goals?: ProgramGoal[]
  className?: string
}

const defaultGoals: ProgramGoal[] = [
  {
    title: "Performance Goals",
    description:
      "Increase vertical leap by 15%, improve 40-yard dash times, and optimize recovery cycles.",
  },
  {
    title: "Mentorship Goals",
    description:
      "Develop leadership skills and understand the collegiate recruiting landscape.",
  },
]

export default function AboutProgram({
  sectionTitle = "About This Program",
  description = "The Varsity Prep Mentorship is designed to bridge the gap between high school athletics and NCAA-level expectations. Our curriculum focuses on three core pillars: explosive physical development, tactical sports intelligence, and psychological resilience.",
  goals = defaultGoals,
  className,
}: AboutProgramProps) {
  return (
    <section
      className={cn(
        " rounded-2xl border border-secondary/70 bg-[#030612]/90 p-4 md:p-6",
        className
      )}
      aria-label={sectionTitle}
    >
      <h2 className="text-base font-semibold text-white">{sectionTitle}</h2>

      <p className="mt-3 max-w-6xl text-[14px] leading-6 text-white font-light   ">
        {description}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {goals.map((goal) => (
          <article
            key={goal.title}
            className="rounded-xl border border-secondary/70 bg-[#020417]/70 p-4 md:p-5"
          >
            <h3 className="text-base font-semibold text-white  ">
              {goal.title}
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-white/90">
              {goal.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
