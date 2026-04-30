"use client"
 
import Image from "next/image"
import { MdPhotoCamera } from "react-icons/md"
import { EditProfileModal } from "./edit-profile-modal"

export default function ProfileTop({
  setProfileImage,
  handleEditProfileModdal,
  profileTopInfo,
}: {
  setProfileImage: (image: string | File) => void
  handleEditProfileModdal: () => void
  profileTopInfo: {
    name: string 
  }
}) {

  
  return (
    <div className="rounded-2xl border border-white/12 bg-primary p-4 text-white md:p-6">
      <h2 className="text-xl font-semibold tracking-tight">Profile</h2>

      <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-xl bg-white/10 p-4 sm:flex-row sm:items-center md:p-5">
        <div className="flex items-center gap-4">
          <div className="relative  rounded-full overflow-hidden">
            <Image
              src={"/images/player1.png"}
              alt={"profile.name"}
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
              {"profile.email"}
            </p>
          </div>
        </div> 

         <EditProfileModal profileTopInfo={profileTopInfo} handleEditProfileModdal={handleEditProfileModdal}/>

      </div>
    </div>
  )
}
