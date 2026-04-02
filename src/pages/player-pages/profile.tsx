import { Card } from "@/components/ui/card";
import VisibilityEdit from "./components/visibility-edit";
import CommonBtn from "@/components/common/common-btn";
import ProspectCard from "./components/prospect-card";
import Bio from "./components/bio";
import Achievements from "./components/achievements";
import SocialLinks from "./components/social-links";
import Stat from "./components/stat";

 


export default function PlayerProfile(){
    return(
        <section className="text-white">
            
            {/* visibility and customization options */}
            <Card className="bg-secondary/40 px-5 flex-row items-center "> 
              <VisibilityEdit/>
              <CommonBtn text="Save Changes" className="  w-fit  px-2 bg-brand hover:bg-brand text-primary font-medium   " size={"sm"} variant={"default"}  />
            </Card>


            {/* profile info */}
            <div className="lg:flex mt-6 gap-6">

               <div className="flex-3"> 
                  <ProspectCard/> 
                  <Bio/>
                  <Achievements/> 
                  <SocialLinks/>
               </div>

               <div className="flex-7">
                   
                   {/* stats */}
                   <h2 className="text-white text-base font-semibold mb-4">Player Stats</h2>

                   <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4   "> 
                       <Stat  name="Games" count={28} />
                       <Stat  name="Goals" count={22} />
                       <Stat  name="Assists" count={15} />
                       <Stat  name="Shots" count={35} />
                       <Stat  name="Passes" count={42} />
                       <Stat  name="Tackles" count={18} />
                   </div>

               </div>

            </div>


        </section>
    )
}