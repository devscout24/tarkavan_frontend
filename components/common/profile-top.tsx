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
import { useAppSelector } from "@/lib/hooks"
import { selectUserImage } from "@/lib/features/userSlice"

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
    try {
      setLoading(true)
      const res = await deleteAccount()
      if (res.status) {
        toast.success("Account deleted successfully")
        setLoading(false)
        handleLogout(router)
      }
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }
  const userImage = useAppSelector(selectUserImage)

  return (
    <div className="rounded-2xl border border-white/12 bg-primary p-4 text-white md:p-6">
      <h2 className="text-xl font-semibold tracking-tight">Profile</h2>

      <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-xl bg-white/10 p-4 sm:flex-row sm:items-center md:p-5">
        <div className="flex items-center gap-4">
          <div className="relative overflow-hidden rounded-full border border-brand">
            <Image
              src={userImage || "/images/bannerbg.png"}
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
              <div className="absolute bottom-0 left-0 flex h-1/3 w-full items-center justify-center bg-primary/50">
                <MdPhotoCamera className="text-2xl" />
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

        <div className=" ">
          <EditProfileModal
            profileTopInfo={profileTopInfo}
            handleEditProfileModdal={(name) => handleEditProfileModdal(name)}
            editProfileModalOpen={editProfileModalOpen}
            setEditProfileModalOpen={setEditProfileModalOpen}
          />

          <Dialog>
            <DialogTrigger>
              <div className="mt-2 w-fit rounded-lg border-red-500 bg-red-500/10! py-2 px-5 text-white hover:bg-red-500/20 cursor-pointer hover:text-white!">
                Delete Account
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl text-red-500">
                  Are you absolutely sure?
                </DialogTitle>
                <DialogDescription>
                  <p className="text-xs text-secondary!">
                    Deleting your account is permanent and cannot be undone. All
                    data will be removed from our servers and cannot be
                    recovered.
                  </p>
                </DialogDescription>
              </DialogHeader>

              {/* actions buttons */}
              <div className="mt-6 flex items-center justify-between gap-2">
                <CommonBtn
                  variant="outline"
                  size="sm"
                  className="ml-2 w-fit rounded-lg border-secondary bg-transparent px-2 px-3 text-primary"
                  text="Cancel"
                />
                <CommonBtn
                  variant="outline"
                  size="sm"
                  className="w-fit rounded-lg border-red-500 bg-red-500/10 bg-transparent px-3 text-primary hover:bg-red-500/20"
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
