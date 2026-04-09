export default function RadarStrength() {
  const data = [
    { name: "Vision", value: 15 },
    { name: "Passing", value: 11 },
    { name: "Dribbling", value: 10 },
    { name: "Finishing", value: 9 },
    { name: "Leadership", value: 8 },
]

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-white/40 ">
      <h3 className="bg-secondary py-3.25 text-center text-base font-semibold text-white">
        Your Top 5 Strengths
      </h3>

      <ul className="   ">
        {data.map((item, index) => (
          <li
            key={index}
            className=" bg-secondary/30 border-b border-secondary/70 px-4 py-2 text-sm font-medium text-white flex justify-between items-center"
          >
            <span className="text-white/70 text-[14px]  ">{item.name}</span>
            <span className="text-brand font-[14px] ">Endorse ({item.value})</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
