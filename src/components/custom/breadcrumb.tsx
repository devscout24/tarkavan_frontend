    
import { useLocation } from "react-router"

export default function BreadcrumbCustom() {

    const routes = useLocation().pathname.split("/")

  return ( 
    <h2 className="font-bold text-base text-white capitalize ">
        {routes.length > 2 ? routes[2] : routes[1]}
    </h2>
  )
}
