import Image from "next/image"

export default function CertificateCredential({
  certificates,
}: {
  certificates?: { title: string; id: string; image: string }[]
}) {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-brand/80 bg-[#0d0f16] px-4 py-6 shadow-[0_0_0_1px_rgba(178,246,111,0.2),0_18px_45px_rgba(0,0,0,0.5)]">
      <h2 className="text-sm font-semibold uppercase">Certified Credentials</h2>

      <div className="mt-4 flex flex-wrap gap-4">
        {certificates?.map((cert, i) => (
          <div className="flex gap-3 items-center" key={i}>
            <div key={cert.id} className="flex flex-col items-center">
              <Image
                src={cert.image}
                alt={cert.title}
                width={100}
                height={100}
                className="h-7.5 w-7.5 rounded-md  object-cover"
              />
            </div>
            <div className="">
              <p className="mt-2 text-sm font-medium text-white">
                {cert.title}
              </p>
              <p className="text-[12px]! text-secondary">
                Certificate ID: {cert.id}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
