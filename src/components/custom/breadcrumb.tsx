import { useLocation } from "react-router"
import MenuBtn from "./menu-btn"
import { SidebarTrigger } from "../animate-ui/components/radix/sidebar"

export default function BreadcrumbCustom() {
  const routes = useLocation().pathname.split("/")

  return (
    <div className="flex items-center gap-2  ">
      <MenuBtn className="md:hidden text-white ">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
      </MenuBtn>
      <h2 className="text-base font-bold text-white capitalize">
        {routes.length > 2 ? routes[2] : routes[1]}
      </h2>
    </div>
  )
}
