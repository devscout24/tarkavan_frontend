import * as React from "react"
import { useEffect, useState } from "react"
import {
  CalendarDays,
  GraduationCap,
  Search,
  Users,
  UsersRound,
} from "lucide-react"

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
import {
  getCities,
  getCountries,
  getSportOptions,
} from "@/app/(dashboards)/action"
import CountryCitySelector from "./country-city-selector"

type ExploreFilterState = {
  button_type: string
  sports: string
  age_group: string
  priceRange: string
  province: string
  city: string
  country: string
  max_price: string
  min_price: string
  per_page: string
}

const categories = [
  {
    value: "players",
    label: "Find Players",
    icon: TbPlayFootball,
  },
  {
    value: "coaches",
    label: "Find Coaches",
    icon: Users,
  },
  {
    value: "clubs",
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

function ExploreFilter({
  filters,
  setFilters,
  initialState,
}: {
  filters: ExploreFilterState
  setFilters: React.Dispatch<React.SetStateAction<ExploreFilterState>>
  initialState: ExploreFilterState
}) {
  const [sportsOptions, setSportsOptions] = useState<
    { id: number; name: string }[]
  >([])
  const [locationResetSignal, setLocationResetSignal] = useState(0)

  useEffect(() => {
    const init = async () => {
      const [sports] = await Promise.all([
        getSportOptions(),
        getCountries(),
        getCities(),
      ])
      if (sports && "success" in sports && sports.success && sports.data)
        setSportsOptions(sports.data.data)
    }
    init()
  }, [])

  const updateFilter = <K extends keyof ExploreFilterState>(
    key: K,
    value: ExploreFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const selectItemClassName =
    "text-white data-[highlighted]:bg-brand data-[highlighted]:text-primary focus:bg-brand focus:text-primary py-2! px-4! rounded-0!"

  return (
    <section className="w-full text-white">
      <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map(({ value, label, icon: Icon }) => {
          const isActive = filters.button_type === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => updateFilter("button_type", isActive ? "" : value)}
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
                {label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-5 rounded-xl bg-[#2B2E36]/80 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <UiInput
            placeholder="Search players, coaches, teams, programs..."
            value={filters.button_type}
            className="w-full"
            onChange={(e) => updateFilter("button_type", e.target.value)}
          />
          <CommonBtn
            variant="default"
            size="sm"
            className="h-12 w-full rounded-lg border border-white/10 bg-brand px-3 text-primary hover:bg-brand/90 hover:text-primary sm:ml-2 sm:w-fit"
            text="Search"
            icon={<Search />}
          />
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex w-fit rounded-full bg-[#C9F96A] px-4 py-2 text-sm font-semibold tracking-wide text-[#0B0B12] uppercase">
            Quick Filters
          </div>

          <div className="flex flex-1 flex-col justify-end gap-3 lg:flex-row lg:items-center">
            {/* Location */}
            <CountryCitySelector
              className="w-full min-w-0 lg:min-w-75"
              resetSignal={locationResetSignal}
              onSelect={(data) => {
                if (data.country_name) {
                  setFilters((prev) => ({
                    ...prev,
                    country: String(data.country_name),
                  }))
                }
                if (data.city_name) {
                  setFilters((prev) => ({
                    ...prev,
                    city: String(data.city_name),
                  }))
                }
                if (data.province_name) {
                  setFilters((prev) => ({
                    ...prev,
                    province: String(data.province_name),
                  }))
                }
              }}
            />

            {/* Sports Select - dynamic from API */}
            <Select
              value={filters.sports || "all"}
              onValueChange={(value) =>
                updateFilter("sports", value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-white/15 bg-transparent py-5 text-white lg:w-fit">
                <SelectValue placeholder="Select a sport" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="border-white/10 bg-secondary text-white!"
              >
                <SelectItem value="all">All Sports</SelectItem>
                {sportsOptions.length > 0 &&
                  sportsOptions.map((option) => (
                    <SelectItem
                      key={option.id}
                      value={String(option.id)}
                      className={selectItemClassName}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {/* Age Group Select */}
            <Select
              value={filters.age_group}
              onValueChange={(value) => updateFilter("age_group", value)}
            >
              <SelectTrigger className="w-full border-neutral-700 bg-neutral-800 py-5 text-white/60 lg:w-fit [&>span]:font-medium [&>span]:text-white">
                <SelectValue placeholder="Select Age Group" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="8" className="hover:bg-brand!">
                  U3 - U8
                </SelectItem>
                <SelectItem value="12" className="hover:bg-brand!">
                  U9 - U12
                </SelectItem>
                <SelectItem value="17" className="hover:bg-brand!">
                  U13 - U17
                </SelectItem>
                <SelectItem value="21" className="hover:bg-brand!">
                  U18 - U21
                </SelectItem>
                <SelectItem value="30" className="hover:bg-brand!">
                  U21 - U30
                </SelectItem>
                <SelectItem value="200" className="hover:bg-brand!">
                  30+
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range Select */}
            <Select
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
            >
              <SelectTrigger className="w-full border-neutral-700 bg-neutral-800 py-5 text-white/60 lg:w-fit [&>span]:font-medium [&>span]:text-white">
                <SelectValue placeholder="Select Price Range" />
              </SelectTrigger>
              <SelectContent position="popper">
                <div className="flex flex-col gap-2 border border-secondary bg-primary p-2">
                  <UiInput
                    type="number"
                    value={filters.min_price}
                    placeholder="Type minimum price"
                    onChange={(e) => updateFilter("min_price", e.target.value)}
                  />
                  <UiInput
                    type="number"
                    value={filters.max_price}
                    placeholder="Type maximum price"
                    onChange={(e) => updateFilter("max_price", e.target.value)}
                  />
                </div>
              </SelectContent>
            </Select>
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
            setLocationResetSignal((prev) => prev + 1)
          }}
          text="Reset Filters"
        />
      </div>
    </section>
  )
}

export default ExploreFilter
