import * as React from "react"
import {
  CalendarDays,
  GraduationCap,
  Search,
  Users,
  UsersRound,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import CommonBtn from "@/components/common/common-btn"
import UiInput from "./ui-input"
import { TbPlayFootball } from "react-icons/tb"

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
    value: "Players",
    label: "Find Players",
    icon: TbPlayFootball,
  },
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
  countries: ["Canada", "United States"],
  citiesByCountry: {
    Canada: ["Toronto", "Vancouver", "Calgary", "Ottawa"],
    "United States": ["New York", "Los Angeles", "Chicago", "Austin"],
  },
  statesByCity: {
    Toronto: ["Ontario"],
    Vancouver: ["British Columbia"],
    Calgary: ["Alberta"],
    Ottawa: ["Ontario"],
    "New York": ["New York"],
    "Los Angeles": ["California"],
    Chicago: ["Illinois"],
    Austin: ["Texas"],
  },
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

  const updateFilter = <K extends keyof ExploreFilterState>(
    key: K,
    value: ExploreFilterState[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const selectItemClassName: string =
    "text-white data-[highlighted]:bg-brand data-[highlighted]:text-primary focus:bg-brand focus:text-primary text-white py-2! px-4! rounded-0! "

  return (
    <section className="w-full text-white">
      <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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

      <div className="mt-5 rounded-xl bg-[#2B2E36]/80 p-5">
        <div className="flex">
          <UiInput
            placeholder="Search players , coaches, teams, programs..."
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
          />
          <CommonBtn
            variant="default"
            size="sm"
            className="ml-2 h-12 w-fit rounded-lg border border-white/10 bg-brand px-3 text-primary hover:bg-brand/90 hover:text-primary"
            text="Search"
            icon={<Search />}
          />
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex w-fit rounded-full bg-[#C9F96A] px-4 py-2 text-sm font-semibold tracking-wide text-[#0B0B12] uppercase">
            Quick Filters
          </div>

          <div className="grid max-w-6/10 flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex py-1.5 w-full items-center rounded-xl border border-white/15 bg-transparent px-3 text-left text-sm text-white"
                >
                  <span className="truncate">
                    {filters.location || "Select Location"}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60 border-white/10 bg-secondary text-white"
                align="start"
              >
                {selectOptions.countries.map((country) => (
                  <DropdownMenuSub key={country}>
                    <DropdownMenuSubTrigger className="focus:bg-brand focus:text-primary data-[state=open]:bg-brand data-[state=open]:text-primary">
                      {country}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="min-w-52 border-white/10 bg-secondary text-white">
                        {selectOptions.citiesByCountry[
                          country as keyof typeof selectOptions.citiesByCountry
                        ].map((city) => (
                          <DropdownMenuSub key={`${country}-${city}`}>
                            <DropdownMenuSubTrigger className="focus:bg-brand focus:text-primary data-[state=open]:bg-brand data-[state=open]:text-primary">
                              {city}
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="min-w-52 border-white/10 bg-secondary text-white">
                                {selectOptions.statesByCity[
                                  city as keyof typeof selectOptions.statesByCity
                                ].map((stateValue) => (
                                  <DropdownMenuItem
                                    key={`${country}-${city}-${stateValue}`}
                                    onClick={() =>
                                      updateFilter(
                                        "location",
                                        `${country}, ${city}, ${stateValue}`
                                      )
                                    }
                                    className="focus:bg-brand focus:text-primary"
                                  >
                                    {stateValue}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {(
              [
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
      </div>

      <div className="mt-4 flex justify-end">
        <CommonBtn
          variant="default"
          size="sm"
          className="h-8 w-fit rounded-lg border border-white/10 px-3 text-white hover:bg-white/5 hover:text-white"
          onClick={() => {
            setFilters(initialState)
          }}
          text="Reset Filters"
        />
      </div>
    </section>
  )
}
