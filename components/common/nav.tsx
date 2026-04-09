"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react" 

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="">
      <div className="flex">
        {/* Logo and Title */}
        <Link
          href="/"
          className="navbar-logo"
          style={{ textDecoration: "none" }}
        >
          <Image
            src="/assets/logo.svg"
            alt="GoElite Logo"
            height={32}
            width={32}
          />
          <span className="navbar-title">GoElite</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link href="#" className="navbar-link active">
            Home
          </Link>
          <Link href="#features" className="navbar-link">
            Features
          </Link>
          <Link href="#how-it-works" className="navbar-link">
            How It Works
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="navbar-buttons">
          <button className="btn-primary-small" type="button">
            <div className="btn-gradient"></div>
            <span className="btn-text">Log In</span>
            <Image
              src="/assets/rightArrow.svg"
              alt=""
              width={14}
              height={14}
              className="btn-arrow"
            />
          </button>
          <button className="btn-lime" type="button">
            <span className="btn-text">Get Started</span>
            <Image
              src="/assets/rightArrow.svg"
              alt=""
              width={14}
              height={14}
              className="btn-arrow"
            />
          </button>
        </div>

        {/* Hamburger Menu */}
        <button
          className="navbar-hamburger"
          aria-label="Open menu"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <Image
            src="/assets/hamburger.svg"
            alt="Open menu"
            width={28}
            height={28}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </button>
      </div>
    </nav>
  )
}
