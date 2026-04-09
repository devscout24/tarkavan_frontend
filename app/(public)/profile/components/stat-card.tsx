 

export default function StatCard({title , text}: {title : string , text : string}) {
  return (
    <div className=" border border-b-6 border-brand rounded-2xl py-6 px-3.5 w-fit text-center    ">
      <h3 className="font-bold text-xl text-secondary">{title}</h3>
      <p className="text-[26px] text-white font-extrabold   ">{text}</p>
    </div>
  )
}