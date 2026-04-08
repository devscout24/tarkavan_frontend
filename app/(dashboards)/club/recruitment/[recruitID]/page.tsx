"use client"
import PaymentTable from "@/components/common/payment-table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { BsArrowLeft } from "react-icons/bs"
import { FiEye } from "react-icons/fi"
import { PiDotsThreeOutlineLight } from "react-icons/pi"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Booking {
  id: string
  programName: string
  childName: string
  amount: string
  hst: string
  discount: string
  total: string
  date: string
  status: number | string
}

export default function Page() {
  const route = useRouter()
  const columnBorderClass =
    "border-r border-white/15 last:border-r-0 text-white  "

  const allData = [
    {
      playerName: "Marcus Silva",
      position: "Forward",
      team: "Elite Soccer Training",
      ageGroup: "U16",
      tryoutDate: "Dec 15, 2024",
      status: "Scheduled",
    },
    {
      playerName: "David Chen",
      position: "Midfielder",
      team: "Basketball Skills Academy",
      ageGroup: "U18",
      tryoutDate: "Dec 20, 2024",
      status: "Pending",
    },
    {
      playerName: "Alex Jonson",
      position: "Defender",
      team: "Youth Fitness Camp",
      ageGroup: "U14",
      tryoutDate: "Dec 22, 2024",
      status: "Reject",
    },
    {
      playerName: "Marcus Silva",
      position: "Forward",
      team: "Youth Fitness Camp",
      ageGroup: "U14",
      tryoutDate: "Dec 22, 2024",
      status: "Accept",
    },
  ]

  return (
    <section>
      <Button onClick={() => route.back()} className="flex items-center gap-2">
        <BsArrowLeft />
        <span>Back to Recruitment</span>
      </Button>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/15">
        <Table className="w-full">
          <TableHeader className="">
            <TableRow className="bg-brand hover:bg-brand">
              <TableHead
                className={`sticky left-0 z-10 bg-brand ${columnBorderClass} text-primary!`}
              >
                Player Name
              </TableHead>
              <TableHead className={"text-primary!"}>Team</TableHead>
              <TableHead className={"text-primary!"}>Tryout Dates</TableHead>
              <TableHead className={"text-primary!"}>Status</TableHead>
              <TableHead className={"text-primary!"}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allData.map((data) => (
              <TableRow
                key={data.playerName}
                className="border-t border-white/20 hover:bg-transparent"
              >
                <TableCell
                  className={`sticky left-0 bg-background font-medium ${columnBorderClass} flex items-center gap-3`}
                >
                  <Image
                    src="https://github.com/shadcn.png"
                    alt="https://github.com/shadcn.png"
                    width={100}
                    height={100}
                    className="max-h-12.5 max-w-12.5 rounded-full"
                  />
                  <div className="">
                    <h3 className="text-base font-medium">{data.playerName}</h3>
                    <p className="mt-1 text-brand">{data.position}</p>
                  </div>
                </TableCell>
                <TableCell className={columnBorderClass}>{data.team}</TableCell>
                <TableCell className={columnBorderClass}>
                  {data.tryoutDate}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {data.status}
                </TableCell>
                <TableCell className={`${columnBorderClass}`}>
                  <div className="flex items-center justify-center gap-5 text-white">
                    <FiEye className="text-lg text-brand    " />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button >
                          <PiDotsThreeOutlineLight />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup> 
                          <DropdownMenuItem className="hover:bg-brand!">Accept</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-brand!">Scheduled</DropdownMenuItem>
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
    </section>
  )
}
