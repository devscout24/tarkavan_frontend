"use client"
import Footer from "@/components/common/footer"
import Nav from "@/components/common/nav"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { FaFacebookF } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { PiInstagramLogo } from "react-icons/pi"
import { IoLogoWhatsapp } from "react-icons/io5"
import { RiTiktokFill } from "react-icons/ri"
import { submitContact } from "@/app/action"
import CommonBtn from "@/components/common/common-btn"
import { getWebsiteData } from "../action"

export type TWebsiteData = {
  id: number
  group_name: string
  key: string
  value: string
  created_at: string
  updated_at: string
}

export type TContactMessageResponse = {
  success: boolean
  data: {
    status: boolean
    message: string
    data: {
      id: number
      name: string
      email: string
      phone: string
      subject: string
      message: string
      created_at: string
      updated_at: string
    }
  }
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleMessage = async () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill all the fields")
      return
    }

    setLoading(true)

    try {
      const form = new FormData()
      form.append("name", formData.name)
      form.append("email", formData.email)
      form.append("phone", formData.phone)
      form.append("subject", formData.subject)
      form.append("message", formData.message)

      const res = await submitContact(form)

      const response = res as TContactMessageResponse

      if (response.data.status) {
        toast.success(response.data.message || "Message sent successfully")
        setLoading(false)
      } else {
        setLoading(false)
        toast.error(
          response.data.message ||
            "Failed to send message. Please try again later."
        )
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.")
      setLoading(false)
    }
  }

  const [socialLinks, setSocialLinks] = useState<TWebsiteData[]>([])
  useEffect(() => {
    const getContactData = async () => {
      try {
        const res = await getWebsiteData()
        if (res && "data" in res && res.data?.data) { 
          setSocialLinks(res.data.data)
        }
      } catch (error) {
        console.error("Error fetching contact data:", error)
      }
    }

    getContactData()
  }, [])

const allData = Object.fromEntries(
  socialLinks.map((item) => [item.key, item.value])
);
 
 

  return (
    <>
      <Nav className="bg-primary!" />

      {/* contact */}
      <section className="bg-white px-4 py-6 pt-30 md:px-6">
        <div className="mx-auto grid max-w-5xl items-start gap-16 md:grid-cols-2">
          <div>
            <div className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
                Let's Talk
              </h2>
              <p className="text-base leading-relaxed text-secondary!">
                {allData?.lets_talk }
              </p>
            </div>

            <div className="mt-12">
              <h3 className="text-base font-semibold text-slate-900">Email</h3>
              <ul className="mt-4">
                <li className="flex items-center">
                  <div className="flex h-8 w-8 items-center rounded-full bg-slate-200 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current text-slate-600"
                      stroke="currentColor"
                      viewBox="0 0 682.667 682.667"
                      aria-hidden="true"
                    >
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000" />
                        </clipPath>
                      </defs>
                      <g
                        clipPath="url(#a)"
                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                      >
                        <path
                          fill="none"
                          strokeMiterlimit="10"
                          strokeWidth="40"
                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                          data-original="#000000"
                        />
                        <path
                          d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                  </div>
                  <a href={`mailto:${allData.site_email || ""}`} className="ml-4 text-sm">
                    <small className="block text-slate-900">Mail</small>
                    <span className="font-semibold text-secondary">
                      {allData.site_email || "example@example.com"}
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-base font-semibold text-slate-900">
                Socials
              </h3>
              <ul className="mt-4 flex flex-wrap gap-4">
                <li>
                  <a
                    href={allData.facebook_link || "#"}
                    className="flex h-8 w-8 items-center rounded-full bg-slate-200 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a
                    href={allData.twitter_link || "#"}
                    className="flex h-8 w-8 items-center rounded-full bg-slate-200 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    aria-label="LinkedIn"
                  >
                    <FaXTwitter />
                  </a>
                </li>
                <li>
                  <a
                    href={allData.instagram_link || "#"}
                    className="flex h-8 w-8 items-center rounded-full bg-slate-200 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    aria-label="X"
                  >
                    <PiInstagramLogo />
                  </a>
                </li>
                <li>
                  <a
                    href={allData.whatsapp || "#"}
                    className="flex h-8 w-8 items-center rounded-full bg-slate-200 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    aria-label="X"
                  >
                    <IoLogoWhatsapp />
                  </a>
                </li>
                <li>
                  <a
                    href={allData.tiktok_link || "#"}
                    className="flex h-8 w-8 items-center rounded-full bg-slate-200 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    aria-label="X"
                  >
                    <RiTiktokFill />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 inline-block text-sm font-medium text-slate-900"
              >
                Name
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name..."
                className="w-full rounded-md bg-white px-3 py-2.5 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 inline-block text-sm font-medium text-slate-900"
              >
                Email
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                id="email"
                name="email"
                placeholder="example@example.com"
                className="w-full rounded-md bg-white px-3 py-2.5 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-2 inline-block text-sm font-medium text-slate-900"
              >
                Phone number
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="+11800-259-854"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full rounded-md bg-white px-3 py-2.5 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-2 inline-block text-sm font-medium text-slate-900"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter subject"
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full rounded-md bg-white px-3 py-2.5 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 inline-block text-sm font-medium text-slate-900"
              >
                Message
              </label>
              <textarea
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full rounded-md bg-white px-3 py-2.5 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand"
                placeholder="Write message here..."
                rows={6}
                id="message"
                name="message"
              ></textarea>
            </div>

            <CommonBtn
              text="Send message"
              onClick={handleMessage}
              isLoading={loading}
              size={"default"}
              variant={"default"}
              className="w-full cursor-pointer rounded-md border border-brand bg-brand px-4 py-2.5 text-sm font-semibold text-secondary transition-all hover:bg-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            />
          </form>
        </div>
      </section>

      <Footer />
    </>
  )
}
