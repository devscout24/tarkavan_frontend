"use client"
import CreateNewPass from "@/components/auth/create-new-pass"
import EnterCode from "@/components/auth/enter-code"
import LoginForm from "@/components/auth/login-form"
import RegisterForm from "@/components/auth/register-form"
import ResetPassForm from "@/components/auth/reset-password"
import Logo from "@/components/common/logo"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

function Page() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const tab = searchParams.get("auth-tab") || "login"

  return (
    <section className=" ">
      <div className="grid min-h-dvh grid-cols-1 md:grid-cols-2">
        <div
          style={{
            backgroundImage: `url("/images/authbg.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="relative grid place-items-center"
        >
          <Logo className="absolute top-5 left-1/2 w-45 -translate-x-1/2" />

          <div className="mt-auto max-h-[85vh] overflow-y-scroll md:hidden">
            {tab === "login" ? (
              <LoginForm />
            ) : tab === "register" ? (
              <RegisterForm />
            ) : tab === "reset-pass" ? (
              <ResetPassForm setEmail={setEmail} email={email} />
            ) : tab === "enter-code" ? (
              <EnterCode email={email} />
            ) : tab === "create-new-pass" ? (
              <CreateNewPass email={email} />
            ) : (
              <LoginForm />
            )}
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url("/images/authformbg.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="hidden place-items-center border-5 border-l-0 border-primary md:grid"
        >
          {tab === "login" ? (
            <LoginForm />
          ) : tab === "register" ? (
            <RegisterForm />
          ) : tab === "reset-pass" ? (
            <ResetPassForm setEmail={setEmail} email={email} />
          ) : tab === "enter-code" ? (
            <EnterCode email={email} />
          ) : tab === "create-new-pass" ? (
            <CreateNewPass email={email} />
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </section>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  )
}
