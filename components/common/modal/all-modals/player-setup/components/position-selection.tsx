import { getPlayerPosition } from "@/app/(dashboards)/action"
import PositionMap from "@/components/common/position-map"
import { sortPositions } from "@/lib/sort-position"
import { TPlayerPosition } from "@/types"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TPlayerProfilePayload } from "../type"

export default function PositionSelection({
  payload,
  setPayload,
}: {
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}) {
  const [positions, setPositions] = useState<TPlayerPosition[]>()
  const [selectedPositions, setSelectedPositions] = useState<{
    primary: string
    secondary: string
  }>({
    primary: payload.primaryPosition || "",
    secondary: payload.secondaryPosition || "",
  })

useEffect(() => {
  setSelectedPositions((prev) => ({
    primary: String(payload?.primaryPosition) || prev.primary,
    secondary: String(payload?.secondaryPosition ) || prev.secondary,
  }))
}, [payload?.primaryPosition, payload?.secondaryPosition]) // dependency যোগ করা হলো

  useEffect(() => {
    const getPositions = async () => {
      try {
        const res = await getPlayerPosition()
        if (
          res &&
          typeof res === "object" &&
          "success" in res &&
          res.success &&
          "data" in res
        ) {
          setPositions(sortPositions(res.data.data))
        }
      } catch (error) {
        // Keep fallback positions when API fails.
        console.error(error)
      }
    }
    getPositions()
  }, [])

  return (
    <div>
      <h3 className="my-4 mt-10 text-[20px] leading-[120%] font-semibold text-white">
        Player Position Selection
      </h3>

      <div className="">
        <PositionMap data={
          positions?.filter((position) =>
            [selectedPositions.primary, selectedPositions.secondary].includes(
              String(position.id)
            )
          )
        } />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className=" ">
          <p className="text-white">Primary Position:</p>
          <Select
            value={selectedPositions.primary}
            onValueChange={(value) => {
              setSelectedPositions((prev) => ({ ...prev, primary: value }))
              setPayload((prev) => ({ ...prev, primaryPosition: value }))
            }}
          >
            <SelectTrigger className="w-full py-5.5 text-white">
              <SelectValue placeholder="Select primary position" />
            </SelectTrigger>
            <SelectContent position="popper" className=" ">
              <SelectGroup>
                {Number(positions?.length) > 0 &&
                  positions?.map((position, idx) => (
                    <SelectItem
                      key={idx}
                      value={String(position.id)}
                      className="hover:bg-brand!"
                    >
                      {position.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <p className="text-white">Secondary Position:</p>
          <Select
            value={selectedPositions.secondary}
            onValueChange={(value) => {
              setSelectedPositions((prev) => ({ ...prev, secondary: value }))
              setPayload((prev) => ({ ...prev, secondaryPosition: value }))
            }}
          >
            <SelectTrigger className="w-full py-5.5 text-white  ">
              <SelectValue placeholder="Select secondary position" />
            </SelectTrigger>
            <SelectContent position="popper" className=" ">
              <SelectGroup>
                {Number(positions?.length) > 0 &&
                  positions?.map((position, idx) => (
                    <SelectItem
                      key={idx}
                      value={String(position.id)}
                      className="hover:bg-brand!"
                    >
                      {position.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
