import { Navigate, RouterProvider, createBrowserRouter } from "react-router"

import { ClubDashboardPage } from "@/pages/club-dashboard"
import { CoachDashboardPage } from "@/pages/coach-dashboard"
import { AuthPage } from "@/pages/auth.tsx"
import { ParentDashboardPage } from "@/pages/parent-pages/parent-dashboard" 
import { ClubRootLayout } from "@/layouts/club-root-layout"
import { CoachRootLayout } from "@/layouts/coach-root-layout"
import { ParentRootLayout } from "@/layouts/parent-root-layout"
import { PlayerRootLayout } from "@/layouts/player-root-layout" 
import { PlayerDashboardPage } from "./pages/player-pages" 
import PlayerProfile from "./pages/player-pages/profile"
import NotFoundPage from "./components/common/not-found"
// import ProtectedRoute from "./components/common/protected-route"

 

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
        element: <PlayerDashboardPage />,
      },
      {
        path: "profile",
        element: <PlayerProfile />,
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
        element: <ParentDashboardPage />,
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
        element: <CoachDashboardPage />,
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
        element: <ClubDashboardPage />,
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
])

export function App() {
  return <RouterProvider router={router} />
}

export default App
