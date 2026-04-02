import { Badge } from "@/components/ui/badge"
import { Lock, MapPin } from "lucide-react"




export default function ProspectCard() {
  return (
    <div className="border-2 border-secondary relative rounded-lg      ">
        <img src="/images/playerimage.png" alt="playerimage" className="rounded-lg h-full object-cover  " />


        <Badge variant="default" className=" absolute top-3 left-3 bg-brand text-primary rounded-[4px] -skew-10 rotate-10 font-bold text-[14px]    ">PROSPECT #10</Badge>


        <div className="px-8 absolute bottom-0 left-0 right-0    ">
            <h1 className="text-extrabold text-[32px]">
                <p className="">SHAHIN</p>
                <span className="text-brand ">TARKAVAN</span>
            </h1>

            <p className="py-1 text-[14px]  ">Midfielder | Toronto FC Academy</p>

            <ul className=" space-y-2  text-sm ">
                <li className="flex items-center gap-1 "><span className="font-bold"><MapPin className="w-5" /> </span>North Toronto</li>
                <li className="flex items-center gap-1 "><span className="font-bold"><Lock className="w-5" /></span>Parental Control Active</li>
            </ul>

            <div className="flex mt-3 pb-8 flex-wrap gap-2 justify-start    ">
                <Badge variant="outline" className="border-secondary text-white rounded-[4px] font-medium text-[12px] py-3  ">
                    <img src="/images/footballfull.png" alt="footballfull" />
                </Badge>
                <Badge variant="outline" className="border-secondary text-white rounded-[4px] font-medium text-[12px] py-3  ">MALE</Badge>
                <Badge variant="outline" className="border-secondary text-white rounded-[4px] font-medium text-[12px] py-3  ">UNDER-16</Badge>
                <Badge variant="outline" className="border-secondary text-white rounded-[4px] font-medium text-[12px] py-3  ">HIGHTFOOTED</Badge>
            </div>

        </div>


    </div>
  )
}