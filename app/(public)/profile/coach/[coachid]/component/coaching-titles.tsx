export default function CoachingTitles({ titles }: { titles?: string[] }) {
  return titles && titles?.length > 0 ? (
    <div className="relative mt-3 overflow-hidden rounded-[22px] border border-brand/80 bg-[#0d0f16] px-4 py-6 shadow-[0_0_0_1px_rgba(178,246,111,0.2),0_18px_45px_rgba(0,0,0,0.5)]">
      <h2 className="font-semibold text-sm uppercase text-white!  ">Coaching Titles</h2>

      <div className="mt-2.5  flex flex-wrap gap-3   ">
        {titles?.map((title, index) => (
          <p key={index} className="text-sm text-white! bg-secondary/50! border-2  border-secondary! uppercase py-0.5 px-1 rounded-md  ">
            {title}
          </p> 
        ))}
      </div>
    </div>
  ) : null
}
