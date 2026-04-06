 

export default function Stat({name , count}: {name: string, count: number}) {
  return (
    <div className="py-3 px-5 text-center rounded-[20px] border border-b-4 border-secondary/40 bg-primary flex-1  ">
      <h3 className="text-white/60 font-bold uppercase   ">{name}</h3>
      <p className=" font-extrabold text-[24px] mt-1     ">{count}</p>
    </div>
  )
}