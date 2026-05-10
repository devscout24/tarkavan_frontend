"use client";

import PLayerProgramPage from "@/app/(dashboards)/player/programs/page";
import { useParams } from "next/navigation";

 

export default function childPrograms(){


        const params = useParams()
        const child_id = params.child_id

return <PLayerProgramPage child_id={String(child_id)}/>
 
}