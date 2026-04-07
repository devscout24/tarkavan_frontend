import CommonBtn from "@/components/common/common-btn"
import Image from "next/image"

export default function ProfileTop() {
  return (
    <div className="rounded-2xl border border-white/12 bg-primary p-4 text-white md:p-6">
      <h2 className="text-xl font-semibold tracking-tight">Profile</h2>

      <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-xl bg-white/10 p-4 sm:flex-row sm:items-center md:p-5">
        <div className="flex items-center gap-4">
          <Image
            src="/images/player1.png"
            alt="John Doe"
            width={80}
            height={80}
            className="size-16 rounded-full object-cover md:size-20"
            priority
          />

          <div>
            <p className="text-lg leading-tight font-semibold text-white">
              John Doe
            </p>
            <p className="mt-1 text-base leading-tight font-normal text-white/55">
              john@dealership.com
            </p>
          </div>
        </div>
 
        <CommonBtn size={"lg"} variant={"default"}  className="rounded-2xl bg-brand   text-base font-semibold text-primary transition-colors hover:bg-brand/90 w-fit py-4! px-5 " text="Edit Profile" />
      </div>
    </div>
  )
}
