import { Card } from "@/components/ui/card"
import { NscaIcon, UsabIcon } from "./icons"

export default function CredentialsCard() {
  return (
    <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
      <h5 className="text-2xl leading-[125%] font-medium text-white xl:text-3xl 2xl:text-[34px]">
        Certified Credentials
      </h5>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:mt-5 xl:gap-5">
        <div className="flex items-start gap-3 rounded-[10px] border border-secondary/60 bg-white/5 p-3 xl:gap-4 xl:p-4 2xl:p-5">
          <div className="grid h-10 w-10 place-items-center rounded-[8px] bg-secondary/10 xl:h-11 xl:w-11 2xl:h-12 2xl:w-12">
            <UsabIcon />
          </div>
          <div>
            <p className="text-base leading-[150%] font-semibold text-white xl:text-lg 2xl:text-xl">
              USA Basketball Gold Coach
            </p>
            <p className="text-xs leading-[150%] font-normal text-white/70 xl:text-sm 2xl:text-base">
              ID: USAB-99281-2024
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-[10px] border border-secondary/60 bg-white/5 p-3 xl:gap-4 xl:p-4 2xl:p-5">
          <div className="grid h-10 w-10 place-items-center rounded-[8px] bg-secondary/10 xl:h-11 xl:w-11 2xl:h-12 2xl:w-12">
            <NscaIcon />
          </div>
          <div>
            <p className="text-base leading-[150%] font-semibold text-white xl:text-lg 2xl:text-xl">
              NSCA CSCS Certified
            </p>
            <p className="text-xs leading-[150%] font-normal text-white/70 xl:text-sm 2xl:text-base">
              Strength & Conditioning Specialist
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
