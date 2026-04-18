"use client"

import Logo from "@/components/common/logo"
import ProfileCard from "../components/profile-card"
import Achievement from "../components/achivement"
import StatCard from "../components/stat-card"
import RadarChart from "@/components/common/radar"
import RadarStrength from "@/components/common/radar-strength"
import BIO from "../components/bio"
import PositionMap from "@/components/common/position-map"
import QRCode from "@/components/common/qr-code"
import { FaFacebookF } from "react-icons/fa"
import { IoLogoInstagram } from "react-icons/io5"
import { FaTiktok } from "react-icons/fa6"
import { FaXTwitter } from "react-icons/fa6"
import { IoLogoWhatsapp } from "react-icons/io5"
import Nav from "@/components/common/nav"
import Footer from "@/components/common/footer"
import CommonBtn from "@/components/common/common-btn"
import { useState } from "react" 

export default function ProfilePage() {
  const [teamVoted, setTeamVoted] = useState(false)
  const [academyVoted, setAcademyVoted] = useState(false)
  const [loading, setLoading] = useState({
    team: false,
    academy: false,
  })

  return (
    <>
      <Nav /> 
      <div
        className="bg-primary px-8 pt-24 pb-16"
        style={{
          backgroundImage: `url("/images/profilebg.png")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <Logo className="w-full max-w-111.25!" />
          <div className="mt-15 h-1 w-full bg-brand" />

          <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {/* left */}
            <div className="">
              <ProfileCard academyVotes={12} provincialVotes={7} />
              <Achievement />

              <div className="mt-6 flex items-center flex-wrap gap-2 justify-between rounded-2xl border border-brand p-7">
                <div className="">
                  <h2 className="text-[24px] font-semibold text-white">
                    Watch Highlights
                  </h2>
                  <ul className="mt-8.5 flex gap-7.5 rounded-lg bg-white/20 p-4 text-2xl text-white">
                    <a
                      href="http://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href="http://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IoLogoInstagram />
                    </a>
                    <a
                      href="http://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTiktok />
                    </a>
                    <a
                      href="http://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaXTwitter />
                    </a>
                    <a
                      href="http://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IoLogoWhatsapp />
                    </a>
                  </ul>
                </div>
                <QRCode link="profile/123" />
              </div>
            </div>

            {/* right */}
            <div className="">
              {/* player stats */}
              <div className="rounded-lg border-2 border-brand p-5">
                <h2 className="text-[24px] font-semibold text-white">
                  Player Stats
                </h2>
                <div className="mt-4 flex justify-between gap-2 flex-wrap   ">
                  <StatCard title="Games" text="30" />
                  {/* <StatCard title="Minutes Played" text="35" /> */}
                  <StatCard title="Goals" text="22" />
                  <StatCard title="Asists" text="08" />
                  <StatCard title="Yellow" text="08" />
                  <StatCard title="Red" text="01" />
                </div>
              </div>

              {/*  */}
              {/* Player Attributes */}
              <div className="mt-6">
                {/* stats */}
                <h2 className="mb-4 text-base font-semibold text-white">
                  Player Attributes
                </h2>

                <div className="grid grid-cols-1 items-center gap-4 rounded-xl bg-secondary/30 py-1 xl:grid-cols-2">
                  <RadarChart />

                  <div className="px-6">
                    <RadarStrength />

                    {/* player votes */}
                    <div className="mt-10 space-y-4">
                      <CommonBtn
                        size={"lg"}
                        variant={"default"}
                        text={teamVoted ? "Voted" : "Provincial Team Vote"}
                        className="w-full cursor-pointer bg-yellow-500 text-primary hover:bg-yellow-500/90 hover:text-primary"
                        onClick={() => {
                          setLoading((prev) => ({ ...prev, team: true }))
                          setTimeout(() => {
                            setTeamVoted((prev) => !prev)
                            setLoading((prev) => ({ ...prev, team: false }))
                          }, 2000)
                        }}
                        isLoading={loading.team}
                      />
                      <CommonBtn
                        size={"lg"}
                        variant={"default"}
                        text={
                          academyVoted ? "Voted" : "Professional Academy Vote"
                        }
                        className="w-full cursor-pointer bg-red-500 text-primary hover:bg-red-500/90 hover:text-primary"
                        onClick={() => {
                          setLoading((prev) => ({ ...prev, academy: true }))
                          setTimeout(() => {
                            setAcademyVoted((prev) => !prev)
                            setLoading((prev) => ({ ...prev, academy: false }))
                          }, 2000)
                        }}
                        isLoading={loading.academy}
                      />
                    </div>
                  </div>
                </div>

                {/* position map */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-brand">
                  <PositionMap />
                </div>
              </div>
            </div>
          </div>

          <BIO />

          <div className="mt-10 w-full flex flex-wrap justify-center gap-10 sticky bottom-0 backdrop-blur-md py-5   ">
            <CommonBtn
              size={"lg"}
              variant={"default"}
              text={teamVoted ? "Voted" : "Provincial Team Vote"}
              className="w-fit px-10 cursor-pointer bg-yellow-500 text-primary hover:bg-yellow-500/80 hover:text-primary"
              onClick={() => {
                setLoading((prev) => ({ ...prev, team: true }))
                setTimeout(() => {
                  setTeamVoted((prev) => !prev)
                  setLoading((prev) => ({ ...prev, team: false }))
                }, 2000)
              }}
              isLoading={loading.team}
            />
            <CommonBtn
              size={"lg"}
              variant={"default"}
              text={academyVoted ? "Voted" : "Professional Academy Vote"}
              className="w-fit px-10 cursor-pointer bg-red-500 text-primary hover:bg-red-500/80 hover:text-primary"
              onClick={() => {
                setLoading((prev) => ({ ...prev, academy: true }))
                setTimeout(() => {
                  setAcademyVoted((prev) => !prev)
                  setLoading((prev) => ({ ...prev, academy: false }))
                }, 2000)
              }}
              isLoading={loading.academy}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
