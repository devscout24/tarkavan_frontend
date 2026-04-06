"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Modal from "./modal"

export default function useModal() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const close = (modalId: string, cleanupQueryKeys: string[] = []) => {
    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.delete(modalId)
    cleanupQueryKeys.forEach((key) => nextParams.delete(key))

    router.replace(
      nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname
    )
  }

  return { close, Modal }
}
