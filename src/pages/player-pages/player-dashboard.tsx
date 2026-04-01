import PlayerStats from "./components/player-stats";

 
export function PlayerDashboardPage() {
  return (
    <section className="       " >

      <h2 className="font-bold text-base ">Welcome, Daniel</h2>
      <p className="mt-1 text-base   ">Here is a summary of your children recent activity and upcoming sessions. </p>


      {/* stats */}
      <PlayerStats/>

      {/* activity and action  */}
      <div className="flex w-full">

        {/* recent activity */}
        <div className="flex-8 bg-red-100 ">s</div>

        {/* quick actions */}
        <div className="flex-2 bg-red-300 ">g</div>

      </div>
 

    </section>
  )
}
