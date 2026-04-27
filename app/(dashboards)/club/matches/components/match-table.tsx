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

export default function MatchTable() {
  const columnBorderClass = "border-r border-white/15 last:border-r-0"

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
            {demoMatches.map((match , idx) => (
              <TableRow
                key={idx}
                className="border-t border-white/20 hover:bg-transparent"
              >
                <TableCell
                  className={`sticky left-0 bg-background font-medium ${columnBorderClass}`}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={match.clubImage}
                      alt={match.clubName}
                      width={50}
                      height={50}
                      className="h-12.5 w-12.5 rounded-full"
                    />
                    <span>{match.clubName}</span>
                  </div>
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {match.teamName}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {match.date}
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
                          <DropdownMenuItem className="hover:bg-brand!">Accept</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-brand!">Reject</DropdownMenuItem>
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
