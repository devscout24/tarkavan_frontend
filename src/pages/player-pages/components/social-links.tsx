import { Card, CardContent } from "@/components/ui/card" 
import { Share2 } from "lucide-react"
import { FaInstagram } from "react-icons/fa";

interface SocialLinksProps {
  facebookUrl?: string
  instagramUrl?: string
  tiktokUrl?: string
  twitterUrl?: string
  whatsappUrl?: string
  onClick?: () => void
}
 
 
import { IoLogoFacebook } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import CommonBtn from "@/components/common/common-btn";

export default function SocialLinks({
  facebookUrl = "#",
  instagramUrl = "#",
  tiktokUrl = "#",
  twitterUrl = "#",
  whatsappUrl = "#",
  onClick,
}: SocialLinksProps) {
  const socialLinks = [
    { icon: IoLogoFacebook, url: facebookUrl, label: "Facebook" },
    { icon: FaInstagram, url: instagramUrl, label: "Instagram" },
    { icon: FaTiktok, url: tiktokUrl, label: "TikTok" },
    { icon: RiTwitterXLine, url: twitterUrl, label: "X" },
    { icon: FaWhatsapp, url: whatsappUrl, label: "WhatsApp" },
  ]

  return (
    <Card className="border border-secondary/20 mt-6  bg-primary   ">
      <CardContent className="flex items-center justify-between py-3">
        <div className="flex items-center gap-5">
          {socialLinks.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors hover:text-brand"
              aria-label={label}
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div> 

        <CommonBtn onClick={onClick} text="Profile Share" className=" hidden sm:flex  w-fit  px-2 bg-brand hover:bg-brand text-primary font-medium   " size={"sm"} variant={"default"} icon={<Share2 />}  />
        <CommonBtn onClick={onClick}  className=" sm:hidden   w-fit  px-2 bg-brand hover:bg-brand text-primary font-medium   " size={"sm"} variant={"default"} icon={<Share2 />}  />

      </CardContent>
    </Card>
  )
}
