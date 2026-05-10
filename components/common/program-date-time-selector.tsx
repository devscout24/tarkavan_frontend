"use client"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react" 
import { isSameDay, eachDayOfInterval, parseISO } from "date-fns"
import { IoIosCheckmark } from "react-icons/io";
import {  TChield, TTimeSlot } from "@/types"
import moment from "moment"
import { getAvailableTimes } from "@/app/(dashboards)/action"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getChildList } from "@/app/(dashboards)/player/programs/action"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import animationData from "../../public/searching.json"
import Lottie from "lottie-react"
import CommonBtn from "./common-btn"
import { useRouter } from "next/navigation"
import { bookProgram } from "@/app/(dashboards)/parent/action"
import { toast } from "sonner"

const timeSlots = [
  "12:15 PM",
  "12:30 PM",
  "12:45 PM",
  "1:00 PM",
  "1:15 PM",
  "1:30 PM",
  "1:45 PM",
  "2:00 PM",
]

const availableDates = [
  new Date(2026, 3, 20),
  new Date(2026, 3, 22),
  new Date(2026, 3, 25),
]

type ProgramDateTimeSelectorProps = { 
  programStartDate?: string | Date
  programEndDate?: string | Date
  programTimes?: Array<{ id: number; time: string; is_available: boolean }>
  isOwner?: boolean
  availableTimes?: TTimeSlot[] 
  price?: number
  detailsID: string 
  priceToShow?: number
}

export default function ProgramDateTimeSelector({ 
  programStartDate,
  programEndDate,
  programTimes = [],
  isOwner = false,  
  price ,
  detailsID,
  priceToShow
}: ProgramDateTimeSelectorProps) {
  
 
  const router = useRouter()

  const startDate =
    programStartDate
      ? typeof programStartDate === "string"
        ? parseISO(programStartDate)
        : programStartDate
      : undefined

  const endDate =
    programEndDate
      ? typeof programEndDate === "string"
        ? parseISO(programEndDate)
        : programEndDate
      : undefined

  const [date, setDate] = useState<Date | undefined>(startDate)
  const user = localStorage.getItem("go_elite_user") ? JSON.parse(String(localStorage.getItem("go_elite_user"))) : null
  

  let displayTimes: string[] = []

  if (programTimes && programTimes.length > 0) {
    const timeStrings = programTimes.map(t => t.time).filter(Boolean)

    displayTimes = timeStrings.flatMap(timeStr => {
      if (typeof timeStr === "string" && timeStr.includes(",")) {
        return timeStr.split(",").map(t => t.trim()).filter(Boolean)
      }
      return timeStr
    })
  } else {
    displayTimes = timeSlots
  }

 

  const programDates =
    startDate && endDate
      ? eachDayOfInterval({
          start: startDate,
          end: endDate,
        })
      : []

  const isProgramDate = (day: Date) =>
    programDates.some(d => isSameDay(d, day))

  const isAvailableDate = (day: Date) =>
    availableDates.some(d => isSameDay(d, day))

  const canSelectDate = (day: Date) =>
    programDates.length > 0 ? isProgramDate(day) : isAvailableDate(day)

    const [selectedDate, setSelectedDate] = useState<Date | string>("")
    const [selectedTime, setSelectedTime] = useState<TTimeSlot>()  
    const [availableTimes, setAvailableTimes] = useState<TTimeSlot[]>([])
    const [allChields , setAllChields] = useState<TChield[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedChildId, setSelectedChildId] = useState<string>("")
    console.log(selectedTime)

    useEffect(() => {
      if(!selectedDate) {
        return
      }

      const fetchAvailableTimes = async () => {
        try{

          const res  = await getAvailableTimes({ program_id: detailsID , date: String(moment(selectedDate).format("YYYY-MM-DD")) })
          if(res && 'success' in res && res.success && res.data && 'data' in res.data && res.data.data){
            setAvailableTimes(res.data.data.times)
          }

        }catch(err) {
          console.error("Error fetching available times:", err)
        }

      }
      fetchAvailableTimes()

    } , [selectedDate])

    useEffect(() => {
      const getChild = async () => {
        try{
          const res = await getChildList()
          console.log(res)
          if(          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data){ 
            setAllChields(res.data.data)
          }
        }catch(error) {
          console.error("Error fetching child list:", error)
        }
      }
      getChild()
    } , [])


    const handleBooking = async (bookBy: "parent" | "player") => {


      if(!selectedTime) {
        toast.error("Please select a time slot.")
        return
      }


      if(bookBy === "parent") { 

        if(!selectedChildId) {
          toast.error("Please select a child to proceed.")
          return
        }
        const data  = {
           program_id: detailsID,
           athlete_profile_id: selectedChildId,
           booking_time_id: selectedTime?.id ,
           amount: Number(price) ,
           date: selectedTime?.slot_date ? String(moment(selectedTime.slot_date).format("YYYY-MM-DD")) : String(moment(selectedDate).format("YYYY-MM-DD"))
        } 
 
        const formData = new FormData()
        formData.append("program_id", String(data.program_id))
        formData.append("athlete_profile_id", String(data.athlete_profile_id))
        formData.append("booking_time_id", String(data.booking_time_id))
        formData.append("amount", String(data.amount))
        formData.append("date", data.date)
        try{

          const res = await bookProgram(formData)
           

          if(res?.status === false && res?.message){
            toast.error(res.message)
          }
          if(res && 'success' in res && res.success && res.data && 'data' in res.data && res.data.data){
            console.log(res.data.data)
             const { checkout_url } = res.data.data
             if(checkout_url) {
              window.location.href = checkout_url
             } else {
              toast.error("Checkout URL not found.")
             }
          }
  
        }catch(err){
          console.error("Error booking program:", err)
        }
      }


      if(bookBy === "player") {

      }

    }
 

  return (
    <div className="space-y-6 rounded-2xl bg-white p-4 sm:p-6 mt-4">

      {/* Calendar (UNCHANGED UI) */}
      <Calendar
        className="w-full bg-transparent p-0 [aria-multiselectable='false']:w-stretch!"
        mode="single"
        buttonVariant="ghost"
        selected={date}
        defaultMonth={startDate}
        onSelect={(d) => {
          if (d && canSelectDate(d)) {
            setDate(d) 
            setSelectedDate(d)
          }
        }}
        disabled={(day) => !canSelectDate(day)}
        modifiers={{
          program_date: programDates,
        }}
        modifiersClassNames={{
          program_date: "bg-brand rounded-md mx-0.5  text-primary! hover:bg-brand opacity-100!"
        }}
        classNames={{
          root: "w-full",
          month: "w-full gap-5",
          month_caption: "h-10 justify-start px-0",
          caption_label:
            "text-xl font-semibold tracking-tight text-[#171717]",
          nav: "top-0 gap-1",
          button_previous:
            "absolute right-10 cursor-pointer size-8 rounded-md text-primary hover:bg-[#F5F5F5] hover:text-[#171717]",
          button_next:
            "absolute right-0 cursor-pointer size-8 rounded-md text-primary  hover:bg-[#F5F5F5] hover:text-primary",
          weekdays: "mt-1   ",
          weekday: "text-sm font-normal text-primary     ",
          week: "mt-1  ",
          day: "aspect-square",
          day_button:
            "size-11 rounded-xl text-lg font-normal hover:bg-[#F5F5F5] w-full!    ",
          selected:
            "bg-brand! text-white hover:bg-brand/70 hover:text-primary rounded-xl",
          today: 
            "bg-[#ECECEC] text-[#272727] rounded-xl data-[selected=true]:bg-[#101010] data-[selected=true]:text-white ",
          outside:
            "text-[#B7B7B7] line-through  aria-selected:text-[#B7B7B7]",
          // disabled:
          //   role === "coach"
          //     ? "text-[#C0C0C0] opacity-50"
          //     : "text-[#C0C0C0] line-through opacity-100",
        }}
      /> 

      {/* times */}
      {date && availableTimes && availableTimes?.length > 0 && (
        <>
          <div className="mb-2 text-sm font-medium text-[#191919]">
            Available Times:
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {availableTimes?.map((slot, index) => (
              <Button
                key={index}
                variant="outline"
                className={`${slot.is_booked ? 'line-through' : ''} ${selectedTime?.id === slot.id ? "border-brand" : " border-[#DEDEDE]"} relative h-10 rounded-xl bg-white text-sm font-medium text-[#202020] hover:bg-[#F8F8F8]`}
                onClick={() => setSelectedTime(slot)}
                disabled={slot.is_booked}
              >
                {moment(slot.start_time, 'HH:mm').format('LT')} - {moment(slot.end_time, 'HH:mm').format('LT')}
                
                {selectedTime?.id === slot.id && 
                <div className="absolute top-0 right-0 bg-brand rounded-2xl w-4 h-4   ">
                   <IoIosCheckmark className="absolute top-0 right-0   " />
                </div>
                } 
              </Button>
            ))}
          </div>
        </>
      )}

      {/* payment */}
      {user.role !== "coach" && (
        <div className="flex items-center justify-between gap-4 flex-wrap border-t border-[#DEDEDE] pt-4">
          <p className="text-lg font-medium text-[#191919]">
            Total: $ {priceToShow}
          </p>

        {user && user.role == "parent" ? 
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button
                className="h-10 rounded-xl bg-brand text-lg font-medium text-primary hover:bg-brand/80 hover:text-primary cursor-pointer"
              >
                {isOwner ? "Can not book own program" : "Proceed to Payment"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold  ">Select child</DialogTitle> 
                <DialogDescription>
                  <p className="text-sm text-muted-foreground">
                    Please select a child to proceed with the booking.
                  </p>

                  {allChields.length > 0 ? 
                   <div className="grid grid-cols-1 gap-2 mt-2">
                    <Select 
                      onValueChange={(value) => setSelectedChildId(value)}
                      defaultValue={selectedChildId}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select a child" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectGroup>
                          {allChields.map((child) => ( 
                            <SelectItem value={String(child.id)} key={child.id} className="cursor-pointer hover:bg-brand!   ">
                              {child.name} {child.last_name}
                            </SelectItem> 
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select> 
                   </div>
                  : 
                  <div className=""> 
                    <Lottie animationData={animationData} loop />
                    <div className="">
                      <p className="text-sm text-muted-foreground text-center pb-4  ">
                        No children found.
                      </p>
                      <CommonBtn
                        variant="outline"
                        size="default"
                        text="add child"
                        className="w-full bg-brand hover:bg-brand text-primary border-0 cursor-pointer     "
                        onClick={()=> router.push("?add-new=player") }
                        />
                    </div>
                  </div>
                  }


                  <div className="flex justify-between   mt-4    ">
                      <CommonBtn
                        variant="outline"
                        size="default"
                        text="Close"
                        className="w-fit px-4 border-brand  bg-transparent hover:bg-transparent text-primary cursor-pointer     "
                        onClick={()=> setIsDialogOpen(false) }
                        />

                      <CommonBtn
                        variant="outline"
                        size="default"
                        text="Continue to Payment"
                        className="w-fit px-4 bg-brand hover:bg-brand text-primary border-0 cursor-pointer     "
                        onClick={()=> handleBooking("parent") }
                        />
                  </div>


                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        :

        user.role == "player" &&
        <Button
          disabled={isOwner}
          className="h-10 rounded-xl bg-brand text-lg font-medium text-primary hover:bg-brand/80 hover:text-primacursor-pointer"
          onClick={() => handleBooking("player")}
        >
          {isOwner ? "Can not book own program" : "Proceed to Payment"}
        </Button>
        }

        </div>
      )}
    </div>
  )
}