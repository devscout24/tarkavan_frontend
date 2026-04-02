import authbg from "/images/authbg.png"
import Logo from "@/components/common/logo"
import authformbg from "/images/authformbg.png"
import LoginForm from "@/components/auth/login-form"

export function AuthPage() {
  return (
    <div className="relative grid h-screen max-h-screen grid-cols-1 sm:grid-cols-2">
      <div className="relative">
        <img
          src={authbg}
          alt="Authentication background"
          className="h-screen max-h-screen w-full object-cover"
        />

        {/* logo */}
        <Logo className="absolute top-10 left-1/2 w-47.5 -translate-x-1/2" />
           
           <div className="sm:hidden fixed top-1/2 left-1/2 w-full max-w-105 -translate-x-1/2 -translate-y-1/2">
              <LoginForm />
           </div>

      </div>

      <div className="hidden  max-h-screen w-full bg-primary p-3 pl-0 sm:block">
        <div
          className="grid h-full place-items-center rounded-[20px] border-2 border-[#6C7278]/50"
          style={{
            background: `url(${authformbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
