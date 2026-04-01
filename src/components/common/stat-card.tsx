import type React from "react";









export default function StatCard({icon , title = "State title" , text="Down text" }:{icon?: React.ReactNode , title?: string , text?: string }){

    return(
        <div className="max-w-[206px] p-4 rounded-[16px] border border-secondary     ">
            <div className="flex">

                {/* icon box */}
                <div className="min-w-10 min-h-10 rounded-[10px] bg-brand text-primary grid place-items-center    ">
                    <div className="w-5 h-5">{icon}</div> 
                </div>

                {/* title */}
                <h3 className="ml-2.5 text-[14px] text-white ">{title}</h3>

            </div>

            {/* text btm */}
            <p className="text-bold text-xl mt-3 text-white   ">{text}</p>

        </div>
    )
}







