import Footer from "@/components/common/footer"
import Nav from "@/components/common/nav"
import Link from "next/link"

export default function Page({}: {}) {
  return (
    <>
      <Nav className="bg-primary!" />
      <div className="min-h-screen bg-gray-50 pt-15">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-8 text-center  ">
              <h1 className="  text-3xl font-bold text-gray-900">
                Terms & Conditions
              </h1>
              <p className="text-secondary!">Last updated: 20 June, 2026</p>
            </div>
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                1. Acceptance of Terms
              </h2>
              <div className="prose text-secondary!">
                <p className="text-secondary!">
                  By accessing and using this website, you accept and agree to
                  be bound by the terms and provision of this agreement.
                </p>
              </div>
            </section>
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                2. Use License
              </h2>
              <div className="rounded-lg bg-gray-50 p-6">
                <ul className="space-y-4 text-gray-600">
                  <li className="flex gap-3">
                    <svg
                      className="h-6 w-6 shrink-0 text-brand"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      Permission is granted to temporarily download one copy of
                      the materials for personal, non-commercial transitory
                      viewing only.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <svg
                      className="h-6 w-6 shrink-0 text-brand"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      This is the grant of a license, not a transfer of title.
                    </span>
                  </li>
                </ul>
              </div>
            </section>
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                3. Disclaimer
              </h2>
              <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div className="flex">
                  <div className="shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-secondary!">
                      The materials on this website are provided on an 'as is'
                      basis. We make no warranties, expressed or implied, and
                      hereby disclaim and negate all other warranties including,
                      without limitation, implied warranties or conditions of
                      merchantability, fitness for a particular purpose, or
                      non-infringement of intellectual property or other
                      violation of rights.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                4. Limitations
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-2 font-medium text-gray-900">
                    Time Limitations
                  </h3>
                  <p className="text-secondary!">
                    Claims must be filed within 30 days of incident.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-2 font-medium text-gray-900">Liability</h3>
                  <p className="text-secondary!">
                    We shall not be held liable for any damages.
                  </p>
                </div>
              </div>
            </section>
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                5. Revisions
              </h2>
              <div className="prose text-secondary!">
                <p className="text-secondary!">
                  We may revise these terms of service at any time without
                  notice. By using this website you are agreeing to be bound by
                  the current version of these terms of service.
                </p>
              </div>
            </section>
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                6. Contact
              </h2>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-6">
                <p className="text-secondary!">
                  Questions about the Terms of Service?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-md bg-brand px-5 py-2 text-primary"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact Us
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
