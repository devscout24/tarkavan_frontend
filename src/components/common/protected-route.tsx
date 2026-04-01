import { Navigate, useLocation } from "react-router"

type ProtectedRouteProps = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const role = localStorage.getItem("tarkavan_role")?.trim()
  const location = useLocation()
  console.log(role)

  console.log(location)
  if (!role) {
    return <Navigate to="/auth" replace />
  }

  if (!location.pathname.startsWith(`/${role}`)) {
    return <Navigate to={`/${role}`} replace />
  }

  return <>{children}</>
}

