"use client"

import Image from "next/image"
import { MdPhotoCamera } from "react-icons/md"
import { EditProfileModal } from "./edit-profile-modal"
import CommonBtn from "./common-btn"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteAccount } from "@/app/(dashboards)/action"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { handleLogout } from "@/lib/helpers"

export default function ProfileTop({
  setProfileImage,
  handleEditProfileModdal,
  profileTopInfo,
  editProfileModalOpen,
  setEditProfileModalOpen,
}: {
  setProfileImage: (image: string | File) => void
  handleEditProfileModdal: (name: string) => void
  profileTopInfo: {
    name: string
    image: string
    email: string
  }
  editProfileModalOpen: boolean
  setEditProfileModalOpen: (open: boolean) => void
}) {

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleDeleteAccount = async () => {
    try{
      setLoading(true)
      const res = await  deleteAccount() 
      console.log(res)
      if(res.status){
        toast.success("Account deleted successfully")
        setLoading(false) 
        handleLogout(router)
      }
    }catch(error) {
      setLoading(false)
      console.error(error)
    }
  }


  return (
    <div className="rounded-2xl border border-white/12 bg-primary p-4 text-white md:p-6">
      <h2 className="text-xl font-semibold tracking-tight">Profile</h2>

      <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-xl bg-white/10 p-4 sm:flex-row sm:items-center md:p-5">
        <div className="flex items-center gap-4">
          <div className="relative border border-brand rounded-full overflow-hidden">
            <Image
              src={profileTopInfo?.image || "/images/bannerbg.png"}
              alt={profileTopInfo?.name}
              width={80}
              height={80}
              className="size-16 object-cover md:size-20"
              priority
            />
            <div className="absolute top-0 left-0 z-1 h-full w-full">
              <input
                type="file"
                className="absolute top-0 left-0 z-2 h-full w-full opacity-0"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setProfileImage(e.target.files[0] as File)
                  }
                }}
              />
              <div className="bg-primary/50 w-full h-1/3 absolute bottom-0 left-0 flex items-center justify-center ">

                <MdPhotoCamera className="   text-2xl   " />
              </div>
            </div>
          </div>

          <div>
            <p className="text-lg leading-tight font-semibold text-white">
              {profileTopInfo?.name || "GoElite Club"}
            </p>
            <p className="mt-1 text-base leading-tight font-normal text-white/55">
              {profileTopInfo?.email || ""}
            </p>
          </div>
        </div>

        <div className="  ">
          <EditProfileModal profileTopInfo={profileTopInfo} handleEditProfileModdal={(name) => handleEditProfileModdal(name)} editProfileModalOpen={editProfileModalOpen} setEditProfileModalOpen={setEditProfileModalOpen} />

          <Dialog>
            <DialogTrigger>
              <CommonBtn
                variant="outline"
                size="sm"
                className=" rounded-lg border-red-500  bg-transparent px-3 text-white hover:bg-white/5 w-fit px-5 bg-red-500/10 mt-2 hover:text-white! hover:bg-red-500/20      "
                text="Delete Account"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl text-red-500 ">Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  <p className="text-secondary! text-sm">
                    If you delete your account, this action cannot be undone. Please make sure you are certain before proceeding.
                  </p>



                  <p className="text-secondary! text-sm  mt-4 ">

                    Once your account is deleted, all of your data will be permanently removed from our servers and cannot be recovered.
                  </p>
                </DialogDescription>
              </DialogHeader>

              {/* actions buttons */}
              <div className="flex items-center justify-between gap-2 mt-6">
                <CommonBtn
                  variant="outline"
                  size="sm"
                  className="ml-2 w-fit px-2  rounded-lg border-secondary  bg-transparent px-3 text-primary      "
                  text="Cancel"
                />
                <CommonBtn
                  variant="outline"
                  size="sm"
                  className=" rounded-lg border-red-500  bg-transparent px-3 text-primary  w-fit border-red-500 bg-red-500/10 hover:bg-red-500/20       "
                  text="Confirm Delete"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  isLoading={loading}
                />

              </div>
            </DialogContent>
          </Dialog>


        </div>

      </div>
    </div>
  )
}
