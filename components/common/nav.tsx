"use client"

import LoginGetStart from "./login-getstart"
import Logo from "./logo"
import { DrawerWithSides } from "./mobile-nav"

export default function Nav() {
  return (
    <nav className="fixed inset-s-0 top-0 z-20 w-full border-b border-white/10 bg-primary/65 backdrop-blur-sm supports-backdrop-filter:bg-primary/5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between p-4">
        <Logo className="w-25" />

        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <LoginGetStart className="hidden md:block" />
 
          <DrawerWithSides/>
        </div>

        <div
          className="hidden w-full items-center justify-between text-white md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="border-default rounded-base bg-neutral-secondary-soft md:bg-neutral-primary mt-4 flex flex-col border p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
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
      </div>
    </nav>
  )
}
