 

export default function Container({children}: { children: React.ReactNode }) {
  return (
    <div className="max-w-340 mx-auto">
      {children}
    </div>
  )
}