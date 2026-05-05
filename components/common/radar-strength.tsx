import { TPlayerStrength } from "@/types"


export default function RadarStrength({ strengths }: {strengths: TPlayerStrength[] }) {
 
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-white/40 ">
      <h3 className="bg-secondary py-3.25 text-center text-base font-semibold text-white">
        Your Top 5 Strengths
      </h3>

      <ul className="   ">
        {strengths?.map((item) => (
          <li
            key={item.strength_name}
            className=" bg-secondary/30 border-b border-secondary/70 px-4 py-2 text-sm font-medium text-white flex justify-between items-center"
          >
            <span className="text-white/70 text-[14px]  ">{item.strength_name}</span>
            <span className="text-brand font-[14px] ">Endorse ({item.endorse_count})</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
