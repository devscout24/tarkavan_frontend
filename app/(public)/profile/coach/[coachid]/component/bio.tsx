export default function CoachingBio({ bio }: { bio?: string }) {
  return bio ? (
    <div className="relative overflow-hidden rounded-[22px] border border-brand/80 bg-[#0d0f16] px-4 py-6 shadow-[0_0_0_1px_rgba(178,246,111,0.2),0_18px_45px_rgba(0,0,0,0.5)]">
      <h2 className="text-sm font-semibold uppercase">Bio</h2>

      <p className="mt-5   px-1 py-0.5 text-sm text-white/70!  ">
        {bio}
      </p>
    </div>
  ) : null
}
