import { Link, Outlet, useLocation } from "react-router"

import { Button } from "@/components/ui/button"

type RolePath = "/player" | "/parent" | "/coach" | "/club"

const roleRoutes: Array<{ label: string; path: RolePath }> = [
  { label: "Player", path: "/player" },
  { label: "Parent", path: "/parent" },
  { label: "Coach", path: "/coach" },
  { label: "Club", path: "/club" },
]

type RoleRootLayoutProps = {
  title: string
  subtitle: string
}

export function RoleRootLayout({ title, subtitle }: RoleRootLayoutProps) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div>
            <p className="text-sm text-muted-foreground">Role dashboard</p>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {roleRoutes.map((route) => {
              const isActive = pathname.startsWith(route.path)

              return (
                <Button
                  key={route.path}
                  asChild
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                >
                  <Link to={route.path}>{route.label}</Link>
                </Button>
              )
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
        <div className="mb-5 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
          {subtitle}
        </div>
        <Outlet />
      </main>
    </div>
  )
}
