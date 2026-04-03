import {
  IconButton,
  type IconButtonProps,
} from "@/components/animate-ui/components/buttons/icon"
import { LoaderCircle } from "lucide-react"
interface IconButtonDemoProps {
  variant: IconButtonProps["variant"]
  size: IconButtonProps["size"]
  icon?: React.ReactNode
  className?: string
  text?: string
  onClick?: () => void
  isLoading?: boolean
}

export default function CommonBtn({
  variant,
  size,
  icon,
  className,
  text,
  isLoading = false,
  onClick,
  ...props
}: IconButtonDemoProps) {
  return (
    <IconButton
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      {...props}
    >
      {isLoading ? <LoaderCircle className="animate-spin" /> : icon}

      {text && <span className={icon || isLoading ? "ml-2" : ""}>{text}</span>}
    </IconButton>
  )
}
