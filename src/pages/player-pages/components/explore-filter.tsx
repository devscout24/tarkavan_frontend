import * as React from "react"
import { CalendarDays, GraduationCap, Users, UsersRound } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 
import { cn } from "@/lib/utils"
import CommonBtn from "@/components/common/common-btn"

type ExploreFilterState = {
  category: string
  location: string
  sports: string
  trainingArea: string
  ageGroup: string
  priceRange: string
}

const categories = [
  {
    value: "coaches",
    label: "Find Coaches",
    icon: Users,
  },
  {
    value: "teams",
    label: "Find Teams & Clubs",
    icon: UsersRound,
  },
  {
    value: "programs",
    label: "Find Programs",
    icon: GraduationCap,
  },
  {
    value: "events",
    label: "Find Upcoming Events",
    icon: CalendarDays,
  },
]

const selectOptions = {
  location: ["All Location", "Toronto", "Vancouver", "Calgary", "Ottawa"],
  sports: ["All Sports", "Football", "Basketball", "Tennis", "Track"],
  trainingArea: ["Training Area", "Indoor", "Outdoor", "Strength", "Speed"],
  ageGroup: ["Age Group", "U12", "U14", "U16", "U18"],
  priceRange: ["Price Range", "$0 - $50", "$50 - $100", "$100 - $250"],
} as const

const initialState: ExploreFilterState = {
  category: "",
  location: "",
  sports: "",
  trainingArea: "",
  ageGroup: "",
  priceRange: "",
}

export default function ExploreFilter() {
  const [filters, setFilters] = React.useState<ExploreFilterState>(initialState)
  console.log(filters)

  const updateFilter = <K extends keyof ExploreFilterState>(
    key: K,
    value: ExploreFilterState[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const selectItemClassName: string = "text-white data-[highlighted]:bg-brand data-[highlighted]:text-primary focus:bg-brand focus:text-primary text-white py-2! px-4! rounded-0! "

  return (
    <section className="w-full   text-white  ">
      <div className="grid gap-4 md:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon
          const isActive = filters.category === category.value

          return (
            <button
              key={category.value}
              type="button"
              onClick={() =>
                updateFilter("category", isActive ? "" : category.value)
              }
              className={cn(
                "flex min-h-28 flex-col items-center justify-center rounded-2xl border px-4 py-5 text-center transition-all duration-200",
                isActive
                  ? "border-[#C9F96A] bg-[#0F1018] shadow-[0_0_24px_rgba(201,249,106,0.2)]"
                  : "border-white/10 bg-transparent hover:border-white/20 hover:bg-white/5"
              )}
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#C9F96A] text-[#0A0A0F]">
                <Icon className="size-5" />
              </span>
              <span className="mt-4 text-base font-medium text-white">
                {category.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex w-fit rounded-full bg-[#C9F96A] px-4 py-2 text-sm font-semibold tracking-wide text-[#0B0B12] uppercase">
          Quick Filters
        </div>

        <div className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {(
            [
              ["location", selectOptions.location],
              ["sports", selectOptions.sports],
              ["trainingArea", selectOptions.trainingArea],
              ["ageGroup", selectOptions.ageGroup],
              ["priceRange", selectOptions.priceRange],
            ] as const
          ).map(([key, options]) => (
            <Select
              key={key}
              value={filters[key]}
              onValueChange={(value) => updateFilter(key, value)}
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-white/15 bg-transparent text-white">
                <SelectValue placeholder={options[0]} />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="border-white/10 bg-secondary text-white!"
              >
                {options.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className={selectItemClassName}
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end"> 
        <CommonBtn
          variant="default"
          size="sm"
          className="h-8 rounded-lg border border-white/10 px-3 text-white hover:bg-white/5 hover:text-white w-fit "
          onClick={() => setFilters(initialState)}
          text="Reset Filters"
        />
      </div>
    </section>
  )
}
