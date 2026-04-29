"use client"
import CommonBtn from "@/components/common/common-btn"
import UiInput from "@/components/common/ui-input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { clubProfileSetup } from "../action"
export default function AddSocialClub() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [socialLinks, setSocialLinks] = useState({
    facebook_link: "",
    instagram_link: "",
    tiktok_link: "",
    twitter_link: "",
    whatsapp_link: "",
  })

  const user = localStorage.getItem("go_elite_user")
    ? JSON.parse(localStorage.getItem("go_elite_user") as string)
    : null

  const handleUpdateSocialLinks = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("facebook_link", socialLinks.facebook_link)
      formData.append("instagram_link", socialLinks.instagram_link)
      formData.append("tiktok_link", socialLinks.tiktok_link)
      formData.append("twitter_link", socialLinks.twitter_link)
      formData.append("whatsapp_link", socialLinks.whatsapp_link)
      formData.append("club_name", user?.name)

      const response = await clubProfileSetup(formData) 
      if (
        response &&
        typeof response === "object" &&
        "success" in response &&
        response.success
      ) {
        const successMessage =
          "data" in response &&
          response.data &&
          typeof response.data === "object" &&
          "message" in response.data &&
          typeof response.data.message === "string"
            ? response.data.message
            : "Social links updated successfully."

        toast.success(successMessage)
        router.refresh()
        return
      }

      const errorMessage =
        response &&
        typeof response === "object" &&
        "message" in response &&
        typeof response.message === "string"
          ? response.message
          : "Failed to update social links."

      toast.error(errorMessage)
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong while updating social links."
      toast.error(errorMessage)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <UiInput
          label="Facebook Link"
          placeholder="Enter URL"
          className="mb-4"
          onChange={(e) =>
            setSocialLinks((prev) => ({
              ...prev,
              facebook_link: e.target.value,
            }))
          }
        />

        <UiInput
          label="Instagram Link"
          placeholder="Enter URL"
          className="mb-4"
          onChange={(e) =>
            setSocialLinks((prev) => ({
              ...prev,
              instagram_link: e.target.value,
            }))
          }
        />

        <UiInput label="TikTok Link" placeholder="Enter URL" className="mb-4" />

        <UiInput
          label="Twitter Link"
          placeholder="Enter URL"
          className="mb-4"
          onChange={(e) =>
            setSocialLinks((prev) => ({
              ...prev,
              twitter_link: e.target.value,
            }))
          }
        />
      </div>

      <UiInput
        label="WhatsApp Link"
        placeholder="Enter URL"
        className="mb-4"
        onChange={(e) =>
          setSocialLinks((prev) => ({ ...prev, whatsapp_link: e.target.value }))
        }
      />

      <CommonBtn
        variant={"default"}
        onClick={handleUpdateSocialLinks}
        disabled={isLoading}
        className="mt-4 w-full cursor-pointer bg-brand px-5 text-primary hover:bg-brand hover:text-primary"
        text="Save"
        size="sm"
      />
    </div>
  )
}
