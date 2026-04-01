import UiInput from "../common/input";
import { Button } from "../ui/button";
import { CiSearch } from "react-icons/ci";


export default function SidebarSearch() {
  return (
    <div
      className={`relative  `}
    > 
      <UiInput className="bg-primary! pl-10 " placeholder="Search..." />
      <Button className=" absolute top-0 left-0 h-full  text-white bg-transparent z-10  ">
        <CiSearch className=" scale-[1.5]   "/>
      </Button>
    </div>
  )
}
