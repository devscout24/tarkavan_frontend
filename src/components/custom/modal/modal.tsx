import type { PropsWithChildren } from "react"
import { useSearchParams } from "react-router"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { useIsMobile } from "@/hooks/use-mobile"
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"

interface ModalProps {
  modalId: string
  openId: string
  className?: string
  title?: string
  autoFocus?: boolean
  cleanupQueryKeys?: string[]
}

export default function Modal({
  openId,
  modalId,
  className = "",
  title = "",
  cleanupQueryKeys = [],
  children,
}: PropsWithChildren<ModalProps>) {
  const [searchParams, setSearchParams] = useSearchParams()
  const modal = searchParams.get(modalId)
  const isMobile = useIsMobile()

  const handleOpenChange = (open: boolean) => {
    const nextParams = new URLSearchParams(searchParams)

    if (open) {
      nextParams.set(modalId, openId)
    } else {
      nextParams.delete(modalId)
      cleanupQueryKeys.forEach((key) => nextParams.delete(key))
    }

    setSearchParams(nextParams)
  }

  if (isMobile) {
    return (
      <Drawer open={modal === openId} onOpenChange={handleOpenChange}>
        <DrawerContent
          className={cn(
            "max-h-[90vh] w-full overflow-x-scroll px-2 py-4 sm:px-6",
            className
          )}
        >
          {title && (
            <VisuallyHidden.Root asChild>
              <DrawerTitle>{title}</DrawerTitle>
            </VisuallyHidden.Root>
          )}
          {children}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={modal === openId} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[90dvh] w-full max-w-[95vw] overflow-x-scroll px-2 py-4 sm:px-6",
          className
        )}
      >
        {title && (
          <VisuallyHidden.Root asChild>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden.Root>
        )}
        {children}
      </DialogContent>
    </Dialog>
  )
}
