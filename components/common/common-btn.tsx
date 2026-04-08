import {
  IconButton,
  type IconButtonProps,
} from "@/components/animate-ui/components/buttons/icon"
import { LoaderCircle } from "lucide-react"
interface IconButtonDemoProps {
  variant: IconButtonProps["variant"]
  size: IconButtonProps["size"]
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  className?: string
  text?: string
  onClick?: () => void
  isLoading?: boolean
  disabled?: boolean
}

export default function CommonBtn({
  variant,
  size,
  icon,
  iconRight,
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

      {!isLoading && iconRight && (
        <span className={text ? "ml-2" : ""}>{iconRight}</span>
      )}
    </IconButton>
  )
}
