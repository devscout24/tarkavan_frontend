import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"

const ClubDashboardSubscription = ({
  text,
  link,
  btnText,
}: {
  text: string
  link?: string
  btnText?: string
}) => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const divRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = divRef.current?.getBoundingClientRect()
    if (!bounds) return
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="w- relative h-96 cursor-pointer overflow-hidden rounded-xl bg-secondary p-0.5 text-gray-800 shadow-lg backdrop-blur-md"
    >
      {visible && (
        <div
          className="pointer-events-none absolute z-0 size-60 bg-linear-to-r from-blue-400 via-indigo-500 to-purple-500 blur-xl transition-opacity duration-300"
          style={{ top: position.y - 120, left: position.x - 120 }}
        />
      )}

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-[10px] bg-secondary p-6 text-center">
        <Image
          src="/images/main-logo.jpg"
          alt="Profile Avatar"
          width={200}
          height={200}
          className="my-4 h-24 w-24 rounded-full object-contain shadow-md"
        />
        <h2 className="mb-1 text-2xl font-bold text-white">Go Elite</h2>
        <p className="mb-4 text-sm font-medium text-white">
          One Platform, Three Ecosystems
        </p>
        <p className="mb-4 text-sm font-medium text-white">{text}</p>
        <div className="mb-4 flex space-x-4 text-xl text-indigo-600">
          <Link href={link || "#"} className="bg-brand text-primary py-3 px-10 rounded-lg text-lg    " >{btnText}</Link>
        </div>
      </div>
    </div>
  )
}

export default ClubDashboardSubscription
