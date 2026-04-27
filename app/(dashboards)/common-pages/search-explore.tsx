"use client"
import ExploreFilter from "@/components/common/explore-filter" 
import ExploreCard from "@/components/common/explore-card"

export default function SearchExplore() { 

  return (
    <section>
      <ExploreFilter />

      {/* programs cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ExploreCard
          image={"/images/player1.png"}
          name="Martinez"
          summary="Age: 45 | Coach | Experience: 10+"
          details={[
            "North Toronto",
            "Head Coach – U17 FC Club",
            "USA Basketball Gold Coach",
          ]}
        />

        <ExploreCard
          image={"/images/player2.png"}
          name="Premier Soccer Striker Clinic"
          price="$199"
          details={[
            "Coach: David Chen",
            "Weekends, 10:00 AM",
            "4 Weeks Program",
          ]}
        />

        <ExploreCard
          image={"/images/player3.png"}
          name="Daniel Martinez" 
          summary="Age: 15 | Midfielder | Jersey: 9"
          details={[
            "North Toronto",
            "Parental Control Active",  
          ]}
          stats={["Goals: 12", "Assists: 8", "Matches: 20"]}
        />

        <ExploreCard
          image={"/images/player3.png"}
          name="Canada Strikers FC" 
          summary="Youth Club | Academy"
          details={[
            "North Toronto",
            "High Performance Program", 
          ]}
          desc="Premier youth soccer development club focused on building champions "
        />


      </div>
    </section>
  )
}
