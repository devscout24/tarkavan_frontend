"use client"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FiMenu } from "react-icons/fi"
import Logo from "./logo" 
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation" 
import { Button } from "../ui/button" 
import { handleGetStarted } from "@/lib/helpers"

const side = "left" as const

export function DrawerWithSides() {

  const router = useRouter()

  return (
    <div className="flex flex-wrap gap-2 md:hidden">
      <Drawer key={side} direction={side}>
        <DrawerTrigger asChild className="text-2xl text-white mr-2 ">
          <FiMenu />
        </DrawerTrigger>
        <DrawerContent className="bg-secondary data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle className="w-1/2">
              <Logo className=" " />
            </DrawerTitle>
            <DrawerDescription className="text-white">
              One Platform, Three Ecosystems
            </DrawerDescription>
          </DrawerHeader>
          <div className="no-scrollbar overflow-y-auto">
            <ul className="rounded-base bg-neutral-secondary-soft md:bg-neutral-primary mt-4 flex flex-col p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
              <li>
                <a
                  href="#"
                  className="md:text-fg-brand block rounded-sm bg-brand px-3 py-2 transition-all duration-300 hover:text-brand md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-heading hover:bg-neutral-tertiary md:hover:text-fg-brand block rounded px-3 py-2 transition-all duration-300 hover:text-brand md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-heading hover:bg-neutral-tertiary md:hover:text-fg-brand block rounded px-3 py-2 transition-all duration-300 hover:text-brand md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>
          <DrawerFooter>
            <div
              aria-label="Login and get started actions"
              className={`relative  mb-10 `}
            >  
              <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <Link
                  href="/auth?auth-tab=login"
                  className="w-full  flex items-center justify-center rounded-full border border-brand bg-[blur(10px)] px-5 py-2.5 text-nowrap text-white transition-colors duration-200 hover:bg-brand/10"
                >
                  Log In
                  <ChevronRight className="size-4" />
                </Link>

                <Button
                  onClick={()=> handleGetStarted(router)}
                  className="w-full  flex items-center rounded-full border border-brand bg-brand px-5 py-5.5 text-sm font-semibold text-nowrap text-primary transition-colors duration-200 hover:bg-brand"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
