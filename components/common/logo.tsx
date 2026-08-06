import Image from "next/image"
import Link from "next/link"
import ParticleText from "./particle-text"

type LogoProps = {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Tarkavan Logo"
        width={500}
        height={500}
        className="max-w-10"
      />

      <div className="absolute max-w-30 ml-10  ">
        <ParticleText
          text="GoElite"
          color1="#FFFFFF"
          className="text-2xl font-bold text-white"
        />
      </div>
      {/* <span className="text-2xl font-bold text-white"></span> */}
    </Link>
  )
}
