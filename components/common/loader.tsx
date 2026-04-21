// components/Loader.tsx

export default function Loader() {
  return (
    <div className=" w-full fixed top-0 left-0 backdrop-blur z-10 h-screen flex items-center justify-center">
      <div className="flex items-center justify-center">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative mx-2.5 flex h-5 w-5 animate-[circle-keys_2s_ease-in-out_infinite] items-center justify-center rounded-full border-2 border-[hsl(0,0%,87%)] bg-transparent"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <div
              className="absolute h-4 w-4 animate-[dot-keys_2s_ease-in-out_infinite] rounded-full bg-[hsl(0,0%,87%)]"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            <div
              className="absolute h-5 w-5 animate-[outline-keys_2s_ease-in-out_infinite] rounded-full"
              style={{ animationDelay: `${0.9 + i * 0.3}s` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
