import { TPlayerStrength } from "@/types"
import CommonBtn from "./common-btn"


export default function RadarStrength({ strengths , isPublic = false }: {strengths: TPlayerStrength[], isPublic?: boolean }) {
 
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
            {isPublic ?
             <div className="flex">

              <p className="text-brand border border-brand rounded-md px-2 py-1 text-center">{item.endorse_count}</p>
              <CommonBtn
                text="Endorse"
                size={"sm"}
                variant={"outline"}
                className="w-fit px-2 bg-brand hover:bg-brand/80 cursor-pointer text-primary border-brand font-semibold ml-2"
              />

             </div>
            : 
            <span className="text-brand font-[14px] ">Endorse ({item.endorse_count})</span>
            }
          </li>
        ))}
      </ul>
    </div>
  )
}
