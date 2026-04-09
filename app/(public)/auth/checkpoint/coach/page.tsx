"use client"
import { useState } from "react"
import CoachProfileSetupPage from "./components/coach-profile-setup"
import PendingApprovalPage from "./components/pending-approval"

export default function Page() {
    
  const [isReviewing, setIsReviewing] = useState(true)

  return (
    <div>
        {isReviewing ? <PendingApprovalPage /> : <CoachProfileSetupPage />}
    </div>
  )
}
