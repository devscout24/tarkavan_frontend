import Container from "../common/container"

export default function StartJourney() {
  return (
    <div className="mx-auto   px-4 py-5 font-sans md:px-6 bg-[#060807]">
      <Container>
        <section
          style={{
            background: "url('/images/journybg.png') center/cover no-repeat",
          }}
          className="box-border px-5 py-16 md:px-8 md:py-20 lg:rounded-[32px] lg:px-[364px] lg:pt-40 lg:pb-40"
        >
          <div className="mx-auto max-w-138 text-center">
            {/* Title */}
            <h2 className="m-0 text-[36px] leading-[1.08] font-normal tracking-[-0.03em] text-[#f3f3f3] md:text-[44px] lg:text-[64px]">
              Start Your Sports Journey Today
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 mb-10 text-base leading-[1.65] font-normal text-[#b5b5b5] md:text-lg lg:mt-8">
              Join thousands of athletes, coaches, and teams already on GoElite.
              Create your free account and start building your sports career.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                type="button"
                className="cursor-pointer rounded-xl border-none bg-[#C6F57A] px-8 py-3 text-sm font-semibold text-[#07110d] transition-all duration-200 hover:-translate-y-px hover:brightness-105"
              >
                Join Now
              </button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}
