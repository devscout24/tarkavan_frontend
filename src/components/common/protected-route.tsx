import { Navigate, useLocation } from "react-router"

type ProtectedRouteProps = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const role = localStorage.getItem("tarkavan_role")
  const location = useLocation()
 
  if (!role) {
    return <Navigate to="/auth" replace />
  }
 
  if (location.pathname !== `/${role}`) {
    return <Navigate to={`/${role}`} replace />
  }
  
  return  children
}