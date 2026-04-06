import { CiSearch } from "react-icons/ci";
import UiInput from "../common/ui-input";
import { Button } from "../ui/button";

 

export default function SidebarSearch() {
  return (
    <div className={`relative p-2 pb-0`}>
      <UiInput className="bg-primary! pl-10" placeholder="Search..." />
      <Button className="absolute top-2 left-4 z-10 h-full bg-transparent text-white">
        <CiSearch className="scale-[1.5]" />
      </Button>
    </div>
  )
}
