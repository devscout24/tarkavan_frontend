"use client"

import type { PropsWithChildren } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const modal = searchParams.get(modalId)
  const isMobile = useIsMobile()

  const handleOpenChange = (open: boolean) => {
    const nextParams = new URLSearchParams(searchParams.toString())

    if (open) {
      nextParams.set(modalId, openId)
    } else {
      nextParams.delete(modalId)
      cleanupQueryKeys.forEach((key) => nextParams.delete(key))
    }

    router.replace(
      nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname
    )
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
          {title ? (
            <VisuallyHidden.Root asChild>
              <DrawerTitle>{title}</DrawerTitle>
            </VisuallyHidden.Root>
          ) : (
            <VisuallyHidden.Root asChild>
              <DrawerTitle>Modal</DrawerTitle>
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
        {title ? (
          <VisuallyHidden.Root asChild>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden.Root>
        ) : (
          <VisuallyHidden.Root asChild>
            <DialogTitle>Modal</DialogTitle>
          </VisuallyHidden.Root>
        )}
        {children}
      </DialogContent>
    </Dialog>
  )
}
