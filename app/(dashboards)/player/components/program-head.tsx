import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ProgramHead({title , options , placeholder}: {title: string, options: {value: string, label: string}[], placeholder: string}) {
  const selectItemClassName =
    "text-white data-[highlighted]:bg-brand data-[highlighted]:text-primary focus:bg-brand focus:text-primary text-primary"

  return (
    <div className="mx-1 my-0.5 flex justify-between">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <Select>
        <SelectTrigger className="w-fit text-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem className={selectItemClassName} value={option.value}>
                {option.label}
              </SelectItem>
            ))} 
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
