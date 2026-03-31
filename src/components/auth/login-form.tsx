import UiInput from "../common/input";

 

export default function LoginForm() {
  return (
    <div className="w-full max-w-[420px] rounded-2xl bg-[#101117] p-7 text-[#F5F6F8] shadow-[0_22px_60px_rgba(0,0,0,0.45)] md:p-8">
      <div className="mb-7 space-y-2">
        <h2 className="text-[42px] leading-[1.05] font-semibold tracking-tight">
          Login
        </h2> 
      </div>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          
          <UiInput/>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm text-[#D2D5DC]">
            Password
          </label>
          <div className="flex h-12 items-center gap-3 rounded-lg border border-[#393E49] bg-[#2B2E36] px-3.5">
            <span className="text-sm text-[#8A90A0]">#</span>
            <input
              id="password"
              type="password"
              defaultValue="********"
              className="w-full bg-transparent text-base text-[#F5F6F8] outline-none"
            />
            <button
              type="button"
              className="text-[#C2C6CF]"
              aria-label="Toggle password visibility"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-[18px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4L20 20"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M10.58 10.58A2 2 0 0 0 13.42 13.42"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M9.88 5.09A10.7 10.7 0 0 1 12 4.9C16.42 4.9 20.14 7.77 21.5 11.75C21.11 12.89 20.5 13.96 19.7 14.88"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M14.14 18.7A10.8 10.8 0 0 1 12 18.9C7.58 18.9 3.86 16.03 2.5 12.05C3.11 10.28 4.19 8.7 5.61 7.49"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="text-right">
          <a
            href="#"
            className="text-lg font-medium text-[#B8EC63] hover:underline"
          >
            Forgot Password ?
          </a>
        </div>

        <button
          type="submit"
          className="mt-1 h-12 w-full rounded-lg bg-[#B8EC63] text-lg font-semibold text-[#111319] transition hover:bg-[#AEE456]"
        >
          Login
        </button>

        <div className="flex items-center gap-4 py-1">
          <div className="h-px flex-1 bg-[#2D313A]" />
          <span className="text-lg text-[#8D93A1]">Or</span>
          <div className="h-px flex-1 bg-[#2D313A]" />
        </div>

        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#3A404B] bg-[#2B2E36] text-lg font-medium text-[#EEF1F6] hover:bg-[#323640]"
        >
          <span className="text-[#EA4335]">G</span>
          <span>Login with Google</span>
        </button>
 
      </form>
    </div>
  )
}
