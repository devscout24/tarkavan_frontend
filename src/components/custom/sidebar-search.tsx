import UiInput from "../common/input";
import { Button } from "../ui/button";
import { CiSearch } from "react-icons/ci";


export default function SidebarSearch() {
  return (
    <div
      className={`relative p-4 pb-0 `}
    > 
      <UiInput className="bg-primary! pl-10 " placeholder="Search..." />
      <Button className=" absolute top-2 left-4 h-full  text-white bg-transparent z-10  ">
        <CiSearch className=" scale-[1.5]   "/>
      </Button>
    </div>
  )
}
