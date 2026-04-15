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

export default function ProfilePage() {
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
              <ProfileCard />
              <Achievement />

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-brand p-7">
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
                <div className="mt-4 flex justify-between">
                  <StatCard title="Games" text="30" />
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
        </div>
      </div>
      <Footer/>
    </>
  )
}
