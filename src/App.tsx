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
import MyChildren from "./pages/parent-pages/myChildren"
import Agreement from "./pages/parent-pages/Agreement"
import ProgramPage from "./pages/player-pages/program-page"
import ProgramDetails from "./pages/player-pages/program-details"
import UpcomingEventPage from "./pages/player-pages/upcoming-event-page"
import SearchExplorePage from "./pages/player-pages/search-explore-page"
import PaymentPage from "./pages/player-pages/payment-page"
import MessagePage from "./pages/player-pages/message-page"

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/auth" replace /> },
  { path: "/auth", element: <AuthPage /> },
  {
    path: "/agreement",
    element: <Agreement />,
  },
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
      {
        path: "programs",
        element: <ProgramPage />,
      },
      {
        path: "programs/details/:id",
        element: <ProgramDetails />,
      },
      {
        path: "upcoming-events",
        element: <UpcomingEventPage />,
      },
      {
        path: "search-explore",
        element: <SearchExplorePage />,
      },
      {
        path: "payments",
        element: <PaymentPage />,
      },
      {
        path: "messages",
        element: <MessagePage />,
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
      {
        path: "children",
        element: <MyChildren />,
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
