"use client"

import { useState } from "react"
import { toast } from "sonner"
import CommonBtn from "@/components/common/common-btn"
import UiInput from "@/components/common/ui-input"
import { changePassword } from "@/components/parentApi"
import type { ChangePasswordData } from "@/components/parentApi"

export default function ChangePassword() {
  const [formData, setFormData] = useState<ChangePasswordData>({
    current_password: "",
    new_password: "",
    new_password_confirmation: ""
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof ChangePasswordData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.current_password.trim()) {
      newErrors.current_password = "Current password is required"
    }

    if (!formData.new_password.trim()) {
      newErrors.new_password = "New password is required"
    } else if (formData.new_password.length < 6) {
      newErrors.new_password = "Password must be at least 6 characters"
    }

    if (!formData.new_password_confirmation.trim()) {
      newErrors.new_password_confirmation = "Password confirmation is required"
    } else if (formData.new_password !== formData.new_password_confirmation) {
      newErrors.new_password_confirmation = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSavePassword()
  }

  const handleSavePassword = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors({})

    try {
      const response = await changePassword(formData)
      
      if (response.success) {
        toast.success(response.message || "Password changed successfully!")
        // Reset form
        setFormData({
          current_password: "",
          new_password: "",
          new_password_confirmation: ""
        })
      } else {
        toast.error(response.message || "Failed to change password")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      console.error("Change password error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-white/12 bg-primary p-4 text-white md:p-6">
      <h2 className="text-xl font-semibold tracking-tight">Change Password</h2>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <UiInput
          label="Current Password"
          type="password"
          placeholder="Enter current password"
          value={formData.current_password}
          onChange={(e) => handleInputChange("current_password", e.target.value)}
          className="h-12 rounded-xl border-white/15 bg-transparent! py-0"
        />

        <UiInput
          label="New Password"
          type="password"
          placeholder="Enter new password"
          value={formData.new_password}
          onChange={(e) => handleInputChange("new_password", e.target.value)}
          className="h-12 rounded-xl border-white/15 bg-transparent! py-0"
        />

        <UiInput
          label="Confirm New Password"
          type="password"
          placeholder="Confirm new password"
          value={formData.new_password_confirmation}
          onChange={(e) => handleInputChange("new_password_confirmation", e.target.value)}
          className="h-12 rounded-xl border-white/15 bg-transparent! py-0"
        />

        <div className="flex items-center justify-end gap-4">
          <CommonBtn
            size="lg"
            variant="outline"
            text="Cancel"
            onClick={() => {
              setFormData({
                current_password: "",
                new_password: "",
                new_password_confirmation: ""
              })
              setErrors({})
            }}
            className="h-12 px-10 w-fit hover:text-brand rounded-xl border border-brand bg-transparent text-base font-semibold text-brand hover:bg-brand/10"
          />

          <CommonBtn
            size="lg"
            variant="default"
            text="Save"
            onClick={handleSavePassword}
            isLoading={loading}
            className="h-12 px-10 w-fit rounded-xl bg-brand text-base font-semibold text-primary hover:bg-brand/90"
          />
        </div>
      </form>
    </div>
  )
}
