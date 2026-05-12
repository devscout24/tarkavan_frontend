"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { MessageCircle, Phone, Video, Camera, Globe } from "lucide-react"

interface SocialMediaLinksProps {
  updateSocialMedia?: (data: SocialMediaData) => void
  initialData?: SocialMediaData
}

export interface SocialMediaData {
  facebook_link?: string
  twitter_link?: string
  instagram_link?: string
  tiktok_link?: string
  whatsapp_link?: string
}

export default function SocialMediaLinks({
  updateSocialMedia,
  initialData = {},
}: SocialMediaLinksProps) {
  const [socialData, setSocialData] = useState<SocialMediaData>(initialData)
  const localInitRef = useRef(false)

  // Initialize from initialData when it arrives
  useEffect(() => {
    if (!initialData || localInitRef.current) return
    // Only initialize if initialData has at least one meaningful value
    const hasRealData = Object.values(initialData).some((v) => v)
    if (!hasRealData) return

    setSocialData(initialData)
    localInitRef.current = true
  }, [initialData])

  const handleInputChange = (field: keyof SocialMediaData, value: string) => {
    const updatedData = { ...socialData, [field]: value || undefined }
    setSocialData(updatedData)
    updateSocialMedia?.(updatedData)
  }

  const socialFields = [
    {
      key: "facebook_link" as keyof SocialMediaData,
      label: "Facebook Profile",
      placeholder: "https://facebook.com/yourprofile",
      icon: Globe,
    },
    {
      key: "twitter_link" as keyof SocialMediaData,
      label: "Twitter Profile",
      placeholder: "https://twitter.com/yourprofile",
      icon: MessageCircle,
    },
    {
      key: "instagram_link" as keyof SocialMediaData,
      label: "Instagram Profile",
      placeholder: "https://instagram.com/yourprofile",
      icon: Camera,
    },
    {
      key: "tiktok_link" as keyof SocialMediaData,
      label: "TikTok Profile",
      placeholder: "https://tiktok.com/@yourprofile",
      icon: Video,
    },
    {
      key: "whatsapp_link" as keyof SocialMediaData,
      label: "WhatsApp Number",
      placeholder: "+1234567890",
      icon: Phone,
    },
  ]

  return (
    <section className="rounded-2xl border border-white/8 bg-secondary/20 p-5 text-white md:p-6">
      <div className="pb-4">
        <h3 className="text-lg font-semibold text-white">Social Media Links</h3>
        <div className="mt-3 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,transparent_12px,transparent_22px)]" />
      </div>

      <div className="mt-5 space-y-4">
        {socialFields.map(({ key, label, placeholder, icon: Icon }) => (
          <div key={key} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-white">
              <Icon className="h-4 w-4 text-white/70" />
              {label}
            </label>
            <Input
              value={socialData[key] || ""}
              onChange={(e) => handleInputChange(key, e.target.value)}
              placeholder={placeholder}
              className="h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
