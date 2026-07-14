import { TPlayerProfilePayload } from "../type"

export default function BioSetup({
  payload,
  setPayload,
}: {
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}) {
  return (
    <div>
      <h3 className="mt-10 mb-2 text-[20px] leading-[120%] font-semibold text-white">
        Setup Your Bio
      </h3>
      <p className="border-white/20 pb-3 text-[14px] leading-[150%] font-normal text-white/70">
        Almost there! Your athlete&apos;s profile is taking shape.
      </p>

      <textarea
        placeholder="Describe the player's history, favorite positions, and major accomplishments..."
        className="min-h-55 w-full rounded-lg border border-dashed border-white/20 p-2 text-white outline-0"
        value={payload.biography}
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, biography: e.target.value }))
        }
      />
    </div>
  )
}
