
import authbg from "/images/authbg.png"
import Logo from "@/components/common/logo"
import authformbg from "/images/authformbg.png"
import LoginForm from "@/components/auth/login-form"

export function AuthPage() {




  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-h-screen ">
        <div className="relative"> 
            <img
                src={authbg}
                alt="Authentication background"
                className=" max-h-screen w-full object-cover"
            />

            {/* logo */}
            <Logo className="absolute top-10 left-1/2 -translate-x-1/2 w-47.5  " />
        </div>

        <div className="pl-0 p-3 max-h-screen bg-[#060807]  "> 
            <div className="grid place-items-center h-full rounded-[20px] border-2 border-[#6C7278]/50    " style={{background: `url(${authformbg})` , backgroundSize: "cover" , backgroundPosition: "center" , backgroundRepeat: "no-repeat"    }}   >

            <LoginForm/>



            </div>
        </div>


    </div>
  )
}
