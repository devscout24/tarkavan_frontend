import React, { useState, useEffect, useRef } from "react"
import { Icon } from "@/components/custom/Icon"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CommonBtn from "./common-btn"
import { MdOutlineCleaningServices } from "react-icons/md";


type FilterType = {
  program_type: string
  status: string
}

const ProgramFilterDropdown = ({
  setFilter,
  filter
}: {
  filter: FilterType
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)



  const allOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Draft", value: "draft" },
  ]



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (

    <div className="flex gap-2    ">

      {/* type filter */}
      <Select
        onValueChange={(value) =>
          setFilter((prev) => ({ ...prev, program_type: value }))
        } 
        value={filter.program_type}
      >
        <SelectTrigger className="pl-5 pr-2 py-4.5 border border-secondary text-white">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>

        <SelectContent position="popper" className="bg-secondary  ">
          <SelectGroup>
            <SelectItem value="group" className="text-white hover:bg-brand!   " >Group</SelectItem>
            <SelectItem value="one_one" className="text-white hover:bg-brand!   ">
              One One
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* program status filter */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-lg border border-secondary   px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand/20"
        >
          <span className="text-sm font-medium">{filter.status ? filter.status : "Select Status"}</span>
          <Icon
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Icon>
        </button>

        {isOpen && (
          <div className="absolute right-0 z-50 mt-2 w-25 rounded-lg border border-secondary bg-secondary shadow-lg">
            <div className="py-1">
              {allOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(prev => ({ ...prev, status: option.value }))}
                  className="w-full px-4 py-2 text-left text-sm text-white transition-colors duration-150 hover:bg-brand hover:text-black focus:bg-brand focus:text-black focus:outline-none"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <CommonBtn
        size="sm"
        variant="outline"
        onClick={() => setFilter({ program_type: "", status: "" })}
        className=" border border-secondary bg-transparent px-3 py-4.5  text-white hover:bg-brand/90 hover:text-primary" 
        icon={<MdOutlineCleaningServices />}
      />

    </div>
  )
}

export default ProgramFilterDropdown
