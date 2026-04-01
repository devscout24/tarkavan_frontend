  
import { HiOutlineMenuAlt4 } from "react-icons/hi";

export default function MenuBtn({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative grid min-w-8 min-h-8 place-items-center border-2 border-secondary rounded-[12px] p-0 bg-primary ${className} `}
    >
      <HiOutlineMenuAlt4/>

      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center opacity-0 ">
        {children}
      </div>
    </div>
  )
}
