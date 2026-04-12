import CommonBtn from "@/components/common/common-btn"
import ProgramCoachCard from "@/components/common/program-coach-card"
import QRCode from "@/components/common/qr-code"
import VisibilityEdit from "@/components/common/visibility-edit"
import { Card } from "@/components/ui/card"
import { Share, Share2 } from "lucide-react"
import { FaFacebookF, FaTiktok } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io"

export default function page() {
  return (
    <section>
      {/* visibility and customization options */}
      <Card className="flex-row items-center bg-secondary/40 px-5">
        <VisibilityEdit />
        <CommonBtn
          text="Edit Profile"
          className="w-fit bg-brand px-2 font-medium text-primary hover:bg-brand"
          size={"sm"}
          variant={"default"}
        />
      </Card>

      {/* profile details */}
      <div className="mt-6 flex gap-6">
        <div className="flex-1">
          <ProgramCoachCard
            showMessageButton={false}
            location="Chicago,Illinois,USA "
            tags={["ACADEMY", "HIGH PERFORMANCE PROGRAM"]}
          />

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-secondary p-7">
            <div className=""> 
              <ul className="  flex gap-7.5 rounded-lg  p-4 text-2xl text-white">
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
            <CommonBtn size={"lg"} variant={"default"} text="Profile Share" icon={<Share2/>} className=" w-fit bg-brand hover:bg-brand text-primary hover:text-primary px-5   " />
          </div>
        </div>
        <div className="flex-2">
          {/* bio */}
          <Card className="rounded-2xl border border-white/15 bg-[#050716] p-6 text-white">
            <h3 className="mb-4 text-2xl font-semibold">Bio</h3>
            <p className="mb-6 text-base leading-8 text-white/85">
              {`My philosophy centers on mental resilience and technical
              precision. I believe that greatness is not just about physical
              ability, but the relentless pursuit of perfection in the
              fundamentals. Whether working with professional athletes or youth
              prospects, my approach is tailored to the individual&apos;s unique
              psychological profile and athletic goals.`}
            </p>
            <p className="text-base leading-8 text-white/85">
              {`I focus on a &quot;Player-centric approach&quot; where athlete
              development is tracked through data-driven training metrics. Every
              session is designed to push limits while ensuring a deep
              understanding of the &quot;why&quot; behind every movement on the
              court.`}
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
