export default function SearchExploreSkeleton() {
  return (
    <div className="w-[320px] rounded-2xl overflow-hidden border border-white/5 bg-[#111111]">

      {/* Photo area */}
      <div className="w-full h-[220px] bg-[#1e1e1e] animate-pulse" />

      <div className="p-4 space-y-4">

        {/* Player name */}
        <div className="h-5 w-3/5 rounded-md bg-[#1e1e1e] animate-pulse" />

        {/* Age / Position / Jersey row */}
        <div className="flex gap-4">
          {[["40%", "55%"], ["60%", "70%"], ["40%", "35%"]].map(([label, value], i) => (
            <div key={i} className="flex-1 space-y-1.5">
              <div
                className="h-2.5 rounded bg-[#1e1e1e] animate-pulse"
                style={{ width: label }}
              />
              <div
                className="h-3 rounded bg-[#1e1e1e] animate-pulse"
                style={{ width: value }}
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Location + Parental rows */}
        <div className="space-y-2">
          {["45%", "55%"].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#1e1e1e] animate-pulse flex-shrink-0" />
              <div
                className="h-3 rounded bg-[#1e1e1e] animate-pulse"
                style={{ width: w }}
              />
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex justify-between items-center bg-[#1a1a1a] rounded-xl px-3 py-2.5 border border-white/5">
          {["Games", "Goals", "Assists"].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
              <div className="h-2.5 w-11 rounded bg-[#272727] animate-pulse" />
              <div className="h-3.5 w-7 rounded bg-[#272727] animate-pulse" />
            </div>
          ))}
        </div>

        {/* View Profile button */}
        <div className="h-10 w-full rounded-xl bg-[#1e1e1e] animate-pulse" />

      </div>
    </div>
  );
}