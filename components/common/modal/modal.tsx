"use client"

import type { PropsWithChildren } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils" 
import { useIsMobile } from "@/hooks/use-mobile"
import { Drawer, DrawerContent } from "@/components/ui/drawer"

interface ModalProps {
  modalId: string
  openId: string
  className?: string 
  autoFocus?: boolean 
  children: React.ReactNode
}

export default function Modal({
  openId,
  modalId,
  className = "",  
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
          <DialogTitle className="scale-0 opacity-0 absolute top-0 left-0 h-0! bg-transparent! -z-5 "></DialogTitle>
          {children}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={modal === openId} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[90dvh] w-full max-w-[95vw] overflow-x-scroll px-2 py-4 sm:px-6 **:data-[slot='dialog-close']:bg-brand bg-transparent   ",
          className
        )}
      >
        <DialogTitle className="scale-0 opacity-0 absolute top-0 left-0 h-0! bg-transparent! -z-5  "></DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  )
}
