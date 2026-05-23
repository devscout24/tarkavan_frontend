export default function CoachingExperienceEducation({
  yearfrom,
  yearEnd,
  desc,
}: {
  yearfrom?: string
  yearEnd?: string
  desc?: string
}) {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-brand/80 bg-[#0d0f16] px-4 py-6 shadow-[0_0_0_1px_rgba(178,246,111,0.2),0_18px_45px_rgba(0,0,0,0.5)]">
      <h2 className="text-sm font-semibold uppercase">
        Experience & Education
      </h2>

      <div className="mt-4 flex">
        <div className="mr-4 flex-1">
          <h3 className="text-lg font-bold text-white">Experience</h3>
          <p className="text-sm text-white/70">
            15 years of coaching experience at various levels.
          </p>

          <p className="mt-6">{desc}</p>
        </div>
        <div className="rounded-md bg-secondary p-2 text-center">
          <h3 className="text-lg font-bold text-white">{yearfrom}</h3> -
          <p className="text-sm text-white/70">{yearEnd}</p>
        </div>
      </div>
    </div>
  )
}
