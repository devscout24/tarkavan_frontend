"use client"

import { useState } from "react"
import CommonBtn from "../common/common-btn"
import { toast } from "sonner"

interface InviteFormProps {
  onClose: () => void
}

export default function InviteForm({ onClose }: InviteFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    // Validate form
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }
    
    // Show success message
    toast.success("Invitation sent successfully!")
    
    // Reset form
    setEmail("")
    setPassword("")
    
    // Close form
    onClose()
  }

  const handleBack = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">Create Account</h2>
        
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full rounded-lg bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full rounded-lg bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <CommonBtn
              text="Back"
              variant="outline"
              size="lg"
              className="flex-1 border-brand bg-transparent text-brand hover:bg-brand hover:text-primary"
              onClick={handleBack}
            />
            <CommonBtn
              text="Invite"
              variant="default"
              size="lg"
              className="flex-1 bg-brand text-primary hover:bg-brand/90"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
