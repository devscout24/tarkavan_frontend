"use client"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useParams } from "next/navigation"
import { changeStatus, getRecruitmentDetails } from "../action"
import { useEffect, useState } from "react"
import { TCoachApplication } from "@/types"
import moment from "moment"
import { toast } from "sonner"
import Lottie from "lottie-react"
import animationData from "../../../../../public/searching.json"

export default function Page() {
  const route = useRouter()
  const columnBorderClass =
    "border-r border-white/15 last:border-r-0 text-white  "

  const router = useRouter()
  const params = useParams()
  const [data, setData] = useState<TCoachApplication[]>([])

  useEffect(() => {
    const handleGetRecruitDetails = async () => {
      try {
        const res = await getRecruitmentDetails(params.recruitID as string)
        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          setData(res.data.data.applicants)
        }
      } catch (error) {
        console.error("Error getting recruit details:", error)
      }
    }
    handleGetRecruitDetails()

    const handleRecruitDetailsLoaded = () => {
      handleGetRecruitDetails()
    }

    window.addEventListener(
      "recruit_details_loaded",
      handleRecruitDetailsLoaded
    )

    return () => {
      window.removeEventListener(
        "recruit_details_loaded",
        handleRecruitDetailsLoaded
      )
    }
  }, [params.recruitID])

  const handleChangeStatus = async (applicantId: string, status: string) => {
    try {
      const formData = new FormData()
      formData.append("status", status)

      const res = await changeStatus({
        applicantId: applicantId as string,
        status: formData,
      })
      console.log(res)
      if (
        res &&
        "success" in res &&
        res.success &&
        res.data &&
        "data" in res.data &&
        res.data.data
      ) {
        toast.success(res.data.message || "Status changed successfully")
        window.dispatchEvent(new Event("recruit_details_loaded"))
      } else {
        toast.error(res?.message || "Failed to change status")
      }
    } catch (error) {
      console.error("Error changing status:", error)
      toast.error("Failed to change status")
    }
  }

  return (
    <section>
      <Button onClick={() => route.back()} className="flex items-center gap-2">
        <BsArrowLeft />
        <span>Back to Recruitment</span>
      </Button>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/15">
        {data.length > 0 ? (
          <Table className="w-full">
            <TableHeader className="">
              <TableRow className="bg-brand hover:bg-brand">
                <TableHead
                  className={`sticky left-0 z-10 bg-brand ${columnBorderClass} text-primary!`}
                >
                  Applier Name
                </TableHead>
                <TableHead className={"text-primary!"}>Team</TableHead>
                <TableHead className={"text-primary!"}>Tryout Dates</TableHead>
                <TableHead className={"text-primary!"}>Status</TableHead>
                <TableHead className={"text-primary!"}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((data) => (
                <TableRow
                  key={data.name}
                  className="border-t border-white/20 hover:bg-transparent"
                >
                  <TableCell
                    className={`sticky left-0 bg-background font-medium ${columnBorderClass} flex items-center gap-3`}
                  >
                    <Image
                      src={
                        data?.profile_image || "https://github.com/shadcn.png"
                      }
                      alt="https://github.com/shadcn.png"
                      width={100}
                      height={100}
                      className="max-h-12.5 min-h-12.5 max-w-12.5 min-w-12.5 rounded-full"
                    />
                    <div className="">
                      <h3 className="text-base font-medium">{data.name}</h3>
                      <p className="mt-1 text-brand">
                        {data.recruitment.coach_position}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {data.recruitment.team_name}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {moment(data.recruitment.end_date).format("MMM Do YY")}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {data.status}
                  </TableCell>
                  <TableCell className={`${columnBorderClass}`}>
                    <div className="flex items-center justify-center gap-5 text-white">
                      <FiEye
                        className="text-lg text-brand"
                        onClick={() => router.push(`/profile/${data.user_id}`)}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button>
                            <PiDotsThreeOutlineLight />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() =>
                                handleChangeStatus(
                                  String(data.application_id),
                                  "accepted"
                                )
                              }
                              className="hover:bg-brand!"
                            >
                              Accept
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleChangeStatus(
                                  String(data.application_id),
                                  "scheduled"
                                )
                              }
                              className="hover:bg-brand!"
                            >
                              Scheduled
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleChangeStatus(
                                  String(data.application_id),
                                  "rejected"
                                )
                              }
                              className="hover:bg-brand!"
                            >
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="bg-white rounded-lg    ">

          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4 pt-10  ">No results found</h2>

          <div className="max-w-md mx-auto   "> 
            <Lottie animationData={animationData} loop />
          </div>
          </div>
        )}
      </div>
    </section>
  )
}
