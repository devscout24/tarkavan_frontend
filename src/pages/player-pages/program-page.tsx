import ProgramCard from "@/components/common/program-card"
import ProgramHead from "./components/program-head"
import player1 from "@/assets/images/player1.png"
import player2 from "@/assets/images/player2.png"
import player3 from "@/assets/images/player3.png" 


export default function ProgramPage() {
const programs = [
  {
    id: "1",
    title: "Elite Hoops Leadership Academy",
    coachName: "Elena Rodriguez",
    schedule: "Tuesdays, 6:00 PM",
    duration: "8 Weeks Program",
    currentPrice: "$249", 
    imageSrc: player1,
    imageAlt: "Program image",
    buttonLabel: "View Details",  
  } ,
  {
    id: "2",
    title: "Premier Soccer Striker Clinic",
    coachName: "David Chen",
    schedule: "Weekends, 10:00 AM",
    duration: "4 Weeks Program",
    currentPrice: "$199",  
    imageSrc: player2,
    imageAlt: "Program image",
    buttonLabel: "View Details",  
  } ,
  {
    id: "3",
    title: "Mindset & Performance Coaching",
    coachName: "Sarah Jenkins",
    schedule: "Thursdays, 5:00 PM",
    duration: "12 Weeks Program",
    currentPrice: "$269",
    previousPrice: "$299",
    discountLabel: "10% Off",
    imageSrc: player3,
    imageAlt: "Program image",
    buttonLabel: "View Details",  
  } ,

];

  return (
    <section>
      <ProgramHead title="Available Programs" options={[{value: "all", label: "All"}, {value: "football", label: "Football"}, {value: "basketball", label: "Basketball"}]} placeholder="All Sports" />

      {/* programs cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 ">
        {programs.map((program, index) => 
          <ProgramCard key={index} {...program} />
        )}
      </div> 
    </section>
  )
}
