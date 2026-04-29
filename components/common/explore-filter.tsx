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
import { getCities, getCountries, getSportOptions } from "@/app/(dashboards)/action"



type LocationOption = {
  id: number
  name: string
  cities: {
    id: number
    country_id: number
    name: string
  }[]
}


type ExploreFilterState = {
  button_type: string
  location: string
  sports: string
  ageGroup: string
  priceRange: string
  country_id: string
  city_id: string
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



function ExploreFilter({ filters, setFilters, initialState }: { filters: ExploreFilterState; setFilters: React.Dispatch<React.SetStateAction<ExploreFilterState>>; initialState: ExploreFilterState }) {
  
  const [sportsOptions, setSportsOptions] = useState<{ id: number; name: string }[]>([])
  const [countriesOptions, setCountriesOptions] = useState<{ id: number; name: string }[]>([])
  const [citiesOptions, setCitiesOptions] = useState<{ id: number; country_id: number; name: string }[]>([])
  
 


  useEffect(() => {
  const init = async () => {
    const [sports, countries, cities] = await Promise.all([
      getSportOptions(),
      getCountries(),
      getCities(),
    ])
    if (sports && 'success' in sports && sports.success && sports.data) setSportsOptions(sports.data.data)
    if (countries && 'success' in countries && countries.success && countries.data) setCountriesOptions(countries.data.data)
    if (cities && 'success' in cities && cities.success && cities.data) setCitiesOptions(cities.data.data)
  }
  init()
}, [])

  const locationOptions: LocationOption[] = React.useMemo(() => {
    return countriesOptions.map((country) => ({
      id: country.id,
      name: country.name,
      cities: citiesOptions.filter((city) => city.country_id === country.id),
    }))
  }, [countriesOptions, citiesOptions])

  const updateFilter = <K extends keyof ExploreFilterState>(
    key: K,
    value: ExploreFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSelectCountry = (country: LocationOption) => {
    setFilters((prev) => ({
      ...prev,
      location: country.name,
      country_id: String(country.id),
      city_id: "",
    }))
  }

  const handleSelectCity = (
    country: LocationOption,
    city: LocationOption["cities"][number]
  ) => {
    setFilters((prev) => ({
      ...prev,
      location: `${country.name}, ${city.name}`,
      country_id: String(country.id),
      city_id: String(city.id),
    }))
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
        <div className="flex">
          <UiInput
            placeholder="Search players, coaches, teams, programs..."
            value={filters.button_type}
            onChange={(e) => updateFilter("button_type", e.target.value)}
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

          <div className="grid max-w-6/10 flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

            {/* Location Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex w-full items-center rounded-xl border border-white/15 bg-transparent px-3 py-1.5 text-left text-sm text-white"
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
                {locationOptions.length > 0 ? (
                  locationOptions.map((country) => (
                    <DropdownMenuSub key={country.id}>
                      <DropdownMenuSubTrigger className="focus:bg-brand focus:text-primary data-[state=open]:bg-brand data-[state=open]:text-primary">
                        {country.name}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="min-w-52 border-white/10 bg-secondary text-white">
                          {/* Country-level selection (no specific city) */}
                          <DropdownMenuItem
                            onClick={() => handleSelectCountry(country)}
                            className="focus:bg-brand focus:text-primary"
                          >
                            All cities in {country.name}
                          </DropdownMenuItem>
                          {country.cities.map((city) => (
                            <DropdownMenuItem
                              key={city.id}
                              onClick={() => handleSelectCity(country, city)}
                              className="focus:bg-brand focus:text-primary"
                            >
                              {city.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ))
                ) : (
                  <DropdownMenuItem disabled className="text-white/40">
                    Loading locations...
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sports Select - dynamic from API */}
            <Select
              value={filters.sports || "all"}
              onValueChange={(value) =>
                updateFilter("sports", value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-white/15 bg-transparent text-white py-5">
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
              value={filters.ageGroup}
              onValueChange={(value) => updateFilter("ageGroup", value)}
            >
              <SelectTrigger className="w-full border-neutral-700 bg-neutral-800 py-5 text-white/60 [&>span]:font-medium [&>span]:text-white ">
                <SelectValue placeholder="Select Age Group" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="13">U13</SelectItem>
                <SelectItem value="15">U15</SelectItem>
                <SelectItem value="17">U17</SelectItem>
                <SelectItem value="18">18+</SelectItem>
              </SelectContent>
            </Select>


            {/* Price Range Select */}
            <Select
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
            >
              <SelectTrigger className="w-full border-neutral-700 bg-neutral-800 py-5 text-white/60 [&>span]:font-medium [&>span]:text-white ">
                <SelectValue placeholder="Select Price Range" />
              </SelectTrigger>
              <SelectContent position="popper"> 
                <div className="flex flex-col gap-2 p-2 bg-primary border border-secondary    ">
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
          onClick={() => setFilters(initialState)}
          text="Reset Filters"
        />
      </div>
    </section>
  )
}

export default ExploreFilter