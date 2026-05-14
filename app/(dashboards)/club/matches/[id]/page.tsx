import { getMatchRechuestedByOtherClub } from "../action";
import MatchTable from "../components/match-table";

export default async function Page() {

    let matchRequests = []

      try {
        const res = await getMatchRechuestedByOtherClub()

        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          matchRequests = res.data.data
        }
      } catch (err) {
        console.error("Error fetching match request data:", err)
      }

    return <div className="text-center   ">
        {matchRequests.length > 0 ? <MatchTable matchRequests={matchRequests} /> : <p className="text-white ">No match requests from other clubs.</p>}
    </div>
}