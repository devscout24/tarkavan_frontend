"use client"
import { Clock3, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { BsThreeDots } from "react-icons/bs"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type RecruitmentCardData = {
  id: string
  clubName: string
  title: string
  role: string
  meta: string
  tryoutsText: string
  description: string
}

type RecruitmentCardProps = {
  item: RecruitmentCardData
  actionLabel?: string
}

export default function RecruitmentCard({
  item,
  actionLabel = "View Application",
}: RecruitmentCardProps) {

  const router = useRouter()

  return (
    <Card className="max-w-86 gap-0 rounded-xl border border-white/15 bg-[#050816] p-0 text-white">
      <div className="h-full max-h-50 bg-linear-to-r from-[#073f57] to-[#00a66f]">
        <Image
          width={1000}
          height={1000}
          src={"/images/advertisementImage.png"}
          alt={`${item.clubName} logo`}
          className="h-full w-full object-cover"
        />
      </div>

      <CardContent className="space-y-3 px-5 pt-4 pb-2">
        <div className="space-y-1">
          <h4 className="text-2xl font-medium text-white">{item.role}</h4>
          <p className="text-sm text-white/75">{item.meta}</p>
        </div>

        <p className="mt-5 mb-3 flex items-center gap-1.5 text-sm text-white/75">
          <Clock3 className="size-3.5" />
          <span>{item.tryoutsText}</span>
        </p>

        <p className="min-h-10 text-sm text-white/75">{item.description}</p>

        <div className="mb-5 flex items-center gap-2">
          <Button
            onClick={() => router.push(`/club/recruitment/${item.id}`)}
            className="h-9 flex-1 rounded-md bg-brand text-primary hover:bg-brand"
          >
            {actionLabel}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="h-9 w-9 rounded-md border-brand/70 bg-transparent text-brand hover:bg-brand/10 hover:text-brand"
              >
                <BsThreeDots className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup> 
                <DropdownMenuItem onClick={()=> router.push(`/club/recruitment/?add-new=recruitment&edit-id=${item.id}`) } className=" hover:bg-brand!  justify-between ">
                  <span>Edit</span>
                  <Edit2/>
                </DropdownMenuItem>
                <DropdownMenuItem className=" hover:bg-brand!  justify-between ">
                  <span>Delete</span>
                  <Trash2/>
                </DropdownMenuItem>
              </DropdownMenuGroup> 
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
