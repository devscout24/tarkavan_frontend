"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Share2 } from "lucide-react" 
import { IoLogoFacebook } from "react-icons/io5" 
import { RiTwitterXLine } from "react-icons/ri"
import { FaWhatsapp } from "react-icons/fa6"
import CommonBtn from "@/components/common/common-btn"
import ShareModal from "@/components/common/modal/all-modals/share-modal"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"



interface SocialLinksProps {
  facebookUrl?: string
  instagramUrl?: string
  tiktokUrl?: string
  twitterUrl?: string
  whatsappUrl?: string
  onClick?: () => void
  profileUrl?: string
}

 


export default function SocialLinks({
  facebookUrl = "",  
  twitterUrl = "",
  whatsappUrl = "",
  onClick,
  profileUrl
}: SocialLinksProps) {
  const socialLinks = [
    { icon: IoLogoFacebook, url: facebookUrl, label: "Facebook" },  
    { icon: RiTwitterXLine, url: twitterUrl, label: "X" },
    { icon: FaWhatsapp, url: whatsappUrl, label: "WhatsApp" },
  ]

 

  const [openShareModal, setOpenShareModal] = useState(false)
  const [profileId, setProfileId] = useState<string | null>(null);
  const params = useParams()
 
  useEffect(() => {
    const data = localStorage.getItem("go_elite_user");
    if (data) {
      const parsed = JSON.parse(data);
      setProfileId(parsed?.profile_id || params.child_id);
    }
  }, []);

  console.log(openShareModal)


 
 

  return (
    <Card className="mt-6 border border-secondary/20 bg-primary">
      <CardContent className="flex items-center justify-between flex-wrap gap-y-4  py-3">
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

        <CommonBtn 
          onClick={() => setOpenShareModal(true)}
          text="Profile Share"
          className="hidden w-fit bg-brand px-2 font-medium text-primary hover:bg-brand sm:flex"
          size={"sm"}
          variant={"default"}
          icon={<Share2 />}
        />
        <CommonBtn 
          className="w-fit bg-brand px-2 font-medium text-primary hover:bg-brand sm:hidden"
          size={"sm"}
          variant={"default"}
          icon={<Share2 />}
          onClick={onClick}
        />
      </CardContent>
      
      {profileId  && 
      <ShareModal
        key={"shareUrl"}
        open={openShareModal}
        onOpenChange={setOpenShareModal}
        url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${profileUrl}/${profileId}`}    
        title="Watch my Player Card"
      />
      }
    </Card>
  )
}
