import { SlArrowRight } from "react-icons/sl";


type ArrowBtnProps = React.ComponentProps<"div"> & {
  dir?: "left" | "right";
};

export default function ArrowBtn({
  dir = "right",
  onClick, 
}: ArrowBtnProps) {
  return (
    <div 
      onClick={onClick}
      className="group transition-all duration-500  hover:bg-black  w-15 h-15 border border-black/30 bg-gray-200 rounded-2xl relative cursor-pointer      "
    >
      <div
        className={`transition-all duration-500  h-3 group-hover:h-1! w-6 group-hover:w-12 border border-black group-hover:border-brand rounded-lg border-t-0 group-hover:rounded-bl-none absolute bottom-[45%] 
         ${dir === "right" ? "rounded-tl-none left-[20%] group-hover:left-1/2 group-hover:border-l-0 rounded-br-none border-r-0 " : "right-[20%] group-hover:right-1/2 border-l-0 rounded-bl-none rounded-tr-none group-hover:border-r-0 group-hover:rounded-br-none    "} 
            `}
      >
        <SlArrowRight
          size={14}
          className={`absolute top-1  group-hover:-top-1 transition-all group-hover:text-brand duration-500 ${dir === "right" ? "-right-1.25" : "rotate-180 -left-1.25 "} `}
        />
      </div>
    </div>
  );
}
