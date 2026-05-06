import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {  TSportOption } from "@/types"
import CommonBtn from "./common-btn"
import { MdOutlineCleaningServices } from "react-icons/md";

export default function ProgramHead({
  title,
  options,
  placeholder,
  setSelectedFilter,
  selectedFilter
}: {
  title: string
  options: TSportOption[]
  placeholder: string
  setSelectedFilter:  React.Dispatch<React.SetStateAction<string>>
  selectedFilter: string
}) {
  const selectItemClassName =
    "text-white bg-transparent rounded-none data-[highlighted]:bg-brand data-[highlighted]:text-primary focus:bg-brand focus:text-primary"

  return (
    <div className="mx-1 my-0.5 flex justify-between">
      <h2 className="text-xl font-bold text-white">{title}</h2>

      <div className="flex items-center gap-2 "> 
        <Select  onValueChange={setSelectedFilter} value={selectedFilter}>
          <SelectTrigger className="w-fit text-white">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-secondary">
            <SelectGroup> 
              {options.map((option) => (
                <SelectItem
                  key={option.id}
                  className={selectItemClassName}
                  value={String(option.name)}
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <CommonBtn
          size={"sm"}
          variant={"outline"}
          icon={<MdOutlineCleaningServices />}
          className="text-brand border-brand hover:bg-brand/10 hover:text-brand cursor-pointer  "
          onClick={()=> setSelectedFilter("") }
        />

      </div>
    </div>
  )
}
