import { PiDotsThreeOutline } from "react-icons/pi"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TMatchRequestByOthersClub } from "@/types"
import moment from "moment"
import { updateMatchStatusRechuestedByOtherClub } from "../action"
import { toast } from "sonner"

// Demo Booking type
interface Booking {
  id: string
  clubName: string
  clubImage: string
  teamName: string
  date: string
  status: string
}

const demoMatches: Booking[] = [
  {
    id: "1",
    clubName: "CANADA STRIKERS FC",
    clubImage: "https://avatars.githubusercontent.com/u/124599?v=4",
    teamName: "U16 Elite Academy",
    date: "Saturday, Oct 14th",
    status: "Available",
  },
  {
    id: "1",
    clubName: "CANADA STRIKERS FC",
    clubImage: "https://avatars.githubusercontent.com/u/124599?v=4",
    teamName: "U16 Elite Academy",
    date: "Saturday, Oct 14th",
    status: "Available",
  },
  {
    id: "1",
    clubName: "CANADA STRIKERS FC",
    clubImage: "https://avatars.githubusercontent.com/u/124599?v=4",
    teamName: "U16 Elite Academy",
    date: "Saturday, Oct 14th",
    status: "Available",
  },
]

export default function MatchTable({ matchRequests }: { matchRequests: TMatchRequestByOthersClub[] }) {
  const columnBorderClass = "border-r border-white/15 last:border-r-0"

  const handleUpdateMatchStatus = async (bid_id: string, status: string) => {
    try{

      const formData = new FormData() 
      formData.append("status", status)

      const res = await updateMatchStatusRechuestedByOtherClub({
        bid_id,
        status: formData,
      })

      if(res?.status === false){
        toast.error(res.message)
        return
      }

      console.log(res)

    }catch(error){
      console.error(error)
    }
  }

  return (
    <div className="mx-1 mt-6 text-white">
      <div className="mx-auto mt-4 max-w-[95vw] [&>div]:rounded-lg [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="bg-brand hover:bg-brand">
              <TableHead
                className={`sticky left-0 z-10 bg-brand ${columnBorderClass} text-primary!`}
              >
                Club Name
              </TableHead>
              <TableHead className={"text-primary!"}>Team Name</TableHead>
              <TableHead className={"text-primary!"}>Match Dates</TableHead>
              <TableHead className={"text-primary!"}>Status</TableHead>
              <TableHead className={"text-primary!"}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matchRequests.map((match , idx) => (
              <TableRow
                key={idx}
                className="border-t border-white/20 hover:bg-transparent"
              >
                <TableCell
                  className={`sticky left-0 bg-background font-medium ${columnBorderClass}`}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={match.requested_club.team.image || ""}
                      alt={match.requested_club.club_name}
                      width={50}
                      height={50}
                      className="h-12.5 w-12.5 rounded-full"
                    />
                    <span>{match.requested_club.club_name}</span>
                  </div>
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {match.requested_club.team.name}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {moment(match.match.available_date).format("MMM Do YY")}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {match.status}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  <div className="flex items-center justify-center gap-4">
                    <Eye className="text-brand" />
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <PiDotsThreeOutline />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup> 
                          <DropdownMenuItem onClick={() => handleUpdateMatchStatus(String(match.id), "accepted")} className="hover:bg-brand!">Accept</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateMatchStatus(String(match.id), "rejected")} className="hover:bg-brand!">Reject</DropdownMenuItem>
                        </DropdownMenuGroup>  
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
