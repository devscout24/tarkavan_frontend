import { MapPin } from "lucide-react";
import Image from "next/image";
import { CiLock } from "react-icons/ci";
import { IoIosFootball } from "react-icons/io";

 

export default function ProfileCard() {
  return (
              <div className="relative overflow-hidden rounded-[22px] border border-brand/80 bg-[#0d0f16] shadow-[0_0_0_1px_rgba(178,246,111,0.2),0_18px_45px_rgba(0,0,0,0.5)]">
            <div className="absolute top-4 left-4 z-10 rounded-md bg-brand px-3 py-1 text-sm font-semibold text-primary italic">
              PROSPECT #10
            </div>

            <div className="relative min-h-155 w-full">
              <Image
                src="/images/playerimage.png"
                alt="Shahin Tarkavan"
                fill
                className="object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,18,0.15)_22%,rgba(8,10,18,0.82)_72%,rgba(8,10,18,0.97)_100%)]" />

              <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-6">
                <h2 className="text-[42px] leading-[0.88] font-bold tracking-tight text-white">
                  SHAHIN
                  <span className="block text-brand mt-1 ">TARKAVAN</span>
                </h2>

                <p className="mt-3 text-lg leading-tight text-white/92">
                  Midfielder | Toronto FC Academy
                </p>

                <div className="mt-2 flex items-center gap-2 text-lg leading-tight text-white/92">
                  <MapPin className="size-5 text-white/88" />
                  
                  <span>North Toronto</span>
                  <CiLock />
                  <span>Parental Control Active</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  <span className="rounded-lg border border-white/20 bg-white/8 px-3 py-2 text-base font-medium  leading-none text-white/92">
                    <IoIosFootball />
                  </span>
                  <span className="rounded-lg border border-white/20 bg-white/8 px-4 py-2 text-base font-medium text-white/92">
                    MALE
                  </span>
                  <span className="rounded-lg border border-white/20 bg-white/8 px-4 py-2 text-base font-medium text-white/92">
                    UNDER-16
                  </span>
                  <span className="rounded-lg border border-white/20 bg-white/8 px-4 py-2 text-base font-medium text-white/92">
                    RIGHT FOOTED
                  </span>
                </div>
              </div>
            </div>
          </div>
  )
}