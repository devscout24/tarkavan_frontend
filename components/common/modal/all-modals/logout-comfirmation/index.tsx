"use client"

import { LogOut, ShieldAlert } from "lucide-react"

import CommonBtn from "@/components/common/common-btn"
import useModal from "@/components/common/modal/useModal"
import { handleLogout } from "@/lib/helpers"
import { useRouter } from "next/navigation"

export default function LogoutComfirmation() {
  const { close } = useModal()
  const router = useRouter()

  const handleCancel = () => {
    close("logout-confirmation")
  }

 

  return (
    <div className="relative max-h-full w-full bg-white p-4">
      <div className="max-w-md mx-auto ">
        <div className="bg-neutral-primary-soft rounded-base relative p-4 md:p-6">
          <div className="p-4 text-center md:p-5">
            <div className="text-secondary/80">
              <svg
                className="text-fg-disabled mx-auto mb-4 h-12 w-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h3 className="text-body mb-6">
              Are you sure you want to log out of your account?
            </h3>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={()=> handleLogout(router)}
                data-modal-hide="popup-modal"
                type="button"
                className=" bg-[#C70036] text-white px-5 py-3 rounded-full shadow cursor-pointer     "
              >
                {`Yes, I'm sure`}
              </button>
              <button
                onClick={handleCancel}
                data-modal-hide="popup-modal"
                type="button"
                className="text-body bg-secondary/5 px-5 py-3  rounded-full shadow cursor-pointer     "
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
