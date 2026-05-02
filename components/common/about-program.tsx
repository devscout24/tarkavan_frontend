import { cn } from "@/lib/utils"

type Goal = {
  id: number
  goal: string
}

type AboutProgramProps = {
  sectionTitle?: string
  description?: string
  goals?: Goal[]
  className?: string
}

export default function AboutProgram({
  sectionTitle = "About This Program",
  description = "The Varsity Prep Mentorship is designed to bridge the gap between high school athletics and NCAA-level expectations. Our curriculum focuses on three core pillars: explosive physical development, tactical sports intelligence, and psychological resilience.",
  goals = [],
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

      {/* Goals */}
      {goals && goals.length > 0 && (
        <div className="mt-6">
          <h3 className="text-base font-semibold text-white mb-4">Program Goals</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {goals.map((goal) => (
              <article
                key={goal.id}
                className="rounded-xl border border-secondary/70 bg-[#020417]/70 p-4 md:p-5"
              >
                <h4 className="text-base font-normal text-white">
                  {goal.goal}
                </h4>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
