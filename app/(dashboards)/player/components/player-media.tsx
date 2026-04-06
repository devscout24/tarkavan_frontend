


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import CommonBtn from "@/components/common/common-btn" 
import { Upload } from "lucide-react" 


export type PlayerMediaItem = {
  id: string
  src: string
  alt: string
  type?: "image" | "video"
  poster?: string
}

type PlayerMediaProps = {
  title?: string
  subtitle?: string
  items?: PlayerMediaItem[]
  onUpload?: () => void
  uploadLabel?: string
  className?: string
  imageClassName?: string
}

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".m4v"]

function isVideoMedia(item: PlayerMediaItem) {
  if (item.type) return item.type === "video"

  const source = item.src.toLowerCase()
  return VIDEO_EXTENSIONS.some((ext) => source.endsWith(ext))
}

const defaultItems: PlayerMediaItem[] = [
  { id: "1", src: "/images/player1.png", alt: "Player match highlight 1" },
  { id: "2", src: "/images/player2.png", alt: "Player match highlight 2" },
  {
    id: "3",
    src: "/images/player3.png",
    alt: "Player training highlight 3",
  },
]

type MediaImageCardProps = {
  item: PlayerMediaItem
  imageClassName?: string
}

function MediaImageCard({ item, imageClassName }: MediaImageCardProps) {
  const video = isVideoMedia(item)

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-secondary/30">
      {video ? (
        <video
          controls
          preload="metadata"
          playsInline
          poster={item.poster}
          className={cn("h-28 w-full object-cover sm:h-32", imageClassName)}
        >
          <source src={item.src} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className={cn("h-28 w-full object-cover sm:h-32", imageClassName)}
        />
      )}
    </div>
  )
}

export default function PlayerMedia({
  title = "My Images",
  subtitle = "Match highlights & training",
  items = defaultItems,
  onUpload,
  uploadLabel = "Upload Media",
  className,
  imageClassName,
}: PlayerMediaProps) {
  return (
    <Card
      className={cn(
        "mt-6 border border-secondary/40 bg-primary py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <div>
          <CardTitle className="text-xl font-semibold text-white">
            {title}
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-muted-foreground">
            {subtitle}
          </CardDescription>
        </div> 
        <CommonBtn size={"lg"} variant={"default"} text={uploadLabel} onClick={onUpload} className=" bg-secondary/70 border-2 border-white/50 w-fit px-4 cursor-pointer text-base   " icon={<Upload/>}/>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MediaImageCard
              key={item.id}
              item={item}
              imageClassName={imageClassName}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
