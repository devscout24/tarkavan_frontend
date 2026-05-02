"use client"

 
import CommonBtn from "@/components/common/common-btn"
import UiInput from "@/components/common/ui-input" 
import { TChangePasswordData } from "@/types"
import PwdInput from "./password-input"

export default function ChangePassword({ 
  onSave,
  setPasswordFormData,
  passwordFormData,
  changePasswordLoading,
}: { 
  onSave: () => void
  setPasswordFormData: (formData: TChangePasswordData) => void
  passwordFormData: TChangePasswordData
  changePasswordLoading: boolean
}) {
 

  const handleCancel = () => {
    setPasswordFormData({
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    })
  }

 
  return (
    <div className="mt-6 rounded-2xl border border-white/12 bg-primary p-4 text-white md:p-6">
      <h2 className="text-xl font-semibold tracking-tight">Change Password</h2>

      <form className="mt-6 space-y-5" >
        <PwdInput
          label="Current Password" 
          placeholder="Enter current password"
          value={passwordFormData.current_password}
          onChange={(e) => setPasswordFormData({ ...passwordFormData, current_password: e.target.value })}
          className="h-12 rounded-xl border-white/15 bg-transparent! py-0"
        />
        

        <PwdInput
          label="New Password" 
          placeholder="Enter new password"
          value={passwordFormData.new_password}
          onChange={(e) => setPasswordFormData({ ...passwordFormData, new_password: e.target.value })}
          className="h-12 rounded-xl border-white/15 bg-transparent! py-0"
        />

        <PwdInput
          label="Confirm New Password" 
          placeholder="Confirm new password"
          value={passwordFormData.new_password_confirmation}
          onChange={(e) => setPasswordFormData({ ...passwordFormData, new_password_confirmation: e.target.value })}
          className="h-12 rounded-xl border-white/15 bg-transparent! py-0"
        />

        <div className="flex items-center justify-end gap-4">
          <CommonBtn
            size="lg"
            variant="outline"
            text="Cancel"
            onClick={handleCancel}
            className="h-12 w-fit rounded-xl border border-brand bg-transparent px-10 text-base font-semibold text-brand hover:bg-brand/10 hover:text-brand"
          />

          <CommonBtn
            size="lg"
            variant="default"
            text="Save"
            onClick={onSave} 
            className="h-12 w-fit rounded-xl bg-brand px-10 text-base font-semibold text-primary hover:bg-brand/90"
            isLoading={changePasswordLoading}
          />
        </div>
      </form>
    </div>
  )
}
