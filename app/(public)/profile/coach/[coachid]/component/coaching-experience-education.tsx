export default function CoachingExperienceEducation({
  data,
}: {
  data?: { title: string; description: string; duration?: string }[]
}) {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-brand/80 bg-[#0d0f16] px-4 py-6 shadow-[0_0_0_1px_rgba(178,246,111,0.2),0_18px_45px_rgba(0,0,0,0.5)]">
      <h2 className="text-sm font-semibold text-white! uppercase">
        Experience & Education
      </h2>

      <div className="mt-4 space-y-4  ">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <div key={index} className="mr-4 flex items-start justify-between rounded-md border border-secondary/30 bg-[#1a1d29] p-4">
              <div className="">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-white/70">{item.description}</p>
              </div>
              {item.duration && <p className="mt-6 bg-secondary/30 p-2 rounded-md   ">{item.duration}</p>}
            </div>
          ))}
      </div>
    </div>
  )
}
