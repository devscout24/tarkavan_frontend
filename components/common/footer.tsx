"use client"

import Image from "next/image"
import Link from "next/link"
import Logo from "./logo"
import { FaFacebookF } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SlSocialInstagram } from "react-icons/sl"
import { AiOutlineYoutube } from "react-icons/ai"

const footerSections = [
  {
    title: "PLATFORM",
    links: [
      { label: "For Players", href: "#" },
      { label: "For Coaches", href: "#" },
      { label: "For Teams", href: "#" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
]

const socials = [
  { src: "/assets/facebookButton.svg", icon: <FaFacebookF /> },
  { src: "/assets/XButton.svg", icon: <FaXTwitter /> },
  { src: "/assets/instagramButton.svg", icon: <SlSocialInstagram /> },
  { src: "/assets/youTubeButton.svg", icon: <AiOutlineYoutube /> },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050706] px-6 pt-30 pb-20 md:pb-16">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-120 h-10 opacity-50 ">
        <Image
          src="/images/light.png"
          alt="Footer Background"
          fill
          className="pointer-events-none    "
        />
      </div>

      {/* Glow Effect */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-37.5 bg-[url('/images/footerGlow.svg')] bg-size-[720px_150px] bg-top bg-no-repeat opacity-100" />

      <div className="relative z-10 mx-auto max-w-340  lg:pt-16">
        <div className="mx-auto max-w-7xl ">
          {/* Top Section */}
          <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-16 md:grid-cols-2">
            {/* Brand */}
            <div className="flex items-center md:items-start">
              <Logo className="w-25" />
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {footerSections.map((section) => (
                <div key={section.title} className="group">
                  <h3 className="mb-6 text-base font-medium tracking-wide text-[#f3f3f3]">
                    {section.title}
                  </h3>
                  <div className="flex flex-col gap-4.5">
                    {section.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-[14px] text-[#b5b5b5] transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-center justify-between gap-8 pt-16 md:flex-row">
            <div className="text-sm text-secondary">
              ©2026 GoElite. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <Link
                  key={social.src}
                  href={social.src}
                  className="flex min-h-8 min-w-8 items-center justify-center rounded-full border-2 border-secondary/60 bg-[#1a1a1a] text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-[#333333] hover:brightness-110"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
