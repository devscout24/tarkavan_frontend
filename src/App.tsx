import { Navigate, RouterProvider, createBrowserRouter } from "react-router"

import { ClubDashboardPage } from "@/pages/club-dashboard"
import { CoachDashboardPage } from "@/pages/coach-dashboard"
import { AuthPage } from "@/pages/auth.tsx"
import { ParentDashboardPage } from "@/pages/parent-dashboard"
import { PlayerDashboardPage } from "@/pages/player-dashboard"
import { ClubRootLayout } from "@/layouts/club-root-layout"
import { CoachRootLayout } from "@/layouts/coach-root-layout"
import { ParentRootLayout } from "@/layouts/parent-root-layout"
import { PlayerRootLayout } from "@/layouts/player-root-layout"
// import ProtectedRoute from "./components/common/protected-route"

function NotFoundPage() {
  return (
    <div className="flex min-h-svh items-center justify-center px-6 text-center">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-muted-foreground">
          Try one of the dashboard routes.
        </p>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/auth" replace /> },
  { path: "/auth", element: <AuthPage /> },
  {
    path: "/player",
    element: (
      // <ProtectedRoute>
        <PlayerRootLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          // <ProtectedRoute>
            <PlayerDashboardPage />
          // </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/parent",
    element: (
      // <ProtectedRoute>
        <ParentRootLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          // <ProtectedRoute>
            <ParentDashboardPage />
          // </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/coach",
    element: (
      // <ProtectedRoute>
        <CoachRootLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          // <ProtectedRoute>
            <CoachDashboardPage />
          // </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/club",
    element: (
      // <ProtectedRoute>
        <ClubRootLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          // <ProtectedRoute>
            <ClubDashboardPage />
          // </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
])

export function App() {
  return <RouterProvider router={router} />
}

export default App
