import ProgramDetailsPage from "@/app/(dashboards)/common-pages/program-details"
import Footer from "@/components/common/footer"
import Nav from "@/components/common/nav"

export default async function page() {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-30 md:px-10">
      <Nav />

      <ProgramDetailsPage />

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  )
}
