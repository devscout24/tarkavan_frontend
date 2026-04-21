"use client"

import { useEffect, useState } from "react"
import { UserRound } from "lucide-react"
import CommonBtn from "../common/common-btn"
import UiInput from "../common/ui-input"
import PwdInput from "../common/password-input"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldLabel } from "../ui/field"
import { BsArrowLeft } from "react-icons/bs"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { registerUser } from "./action"
import { setAuthCookie } from "@/lib/set-token"

type UserRole = "player" | "parent" | "coach" | "team" | "club"

const roles: Array<{ label: string; value: UserRole }> = [
  { label: "Register as Player", value: "player" },
  { label: "Register as Parent", value: "parent" },
  { label: "Register as Coach", value: "coach" },
  { label: "Register as Club", value: "club" },
]

export default function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = searchParams.get("user-type")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>(
    roles.some((item) => item.value === initialRole)
      ? (initialRole as UserRole)
      : "player"
  )
  const [loading, setLoading] = useState(false)
  const parentAgreement = searchParams.get("parent-agreement")
  const isParentAgreementAgreed = parentAgreement === "true"

  console.log(isParentAgreementAgreed)

  useEffect(() => {
    if (role === "parent" && !isParentAgreementAgreed) {
      router.push("/auth?auth-tab=register&parent=agreement")
    }
  }, [role, isParentAgreementAgreed, router])

  const handleRegister = async () => {
    setLoading(true)

    // parent register
    if(role === "parent" && isParentAgreementAgreed) {
      const data = {
        name: fullName,
        email,
        password,
        password_confirmation: password,
        role,
      }
  
      try {
        const formData = new FormData()
  
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value)
        })
  
        const res = await registerUser(formData)
  
        if (!res.success) {
          setLoading(false)
          toast.error(res.message)
          return
        }
  
        if (res.data.data.token) {
          localStorage.setItem("go_elite_token", res.data.data.token)
          setAuthCookie(res.data.data.token)
          localStorage.setItem(
            "go_elite_user",
            JSON.stringify(res.data.data.user)
          )
          setLoading(false)
          toast.success("Registration successful! Welcome to GoElite.")
          router.push(`${res.data.data.user.role}`)
        }
      } catch (error) {
        setLoading(false)
        // toast.error("Registration failed. Please try again.")
        console.error("Registration error:", error)
        return
      }
    }
    else if (role === "parent" && !isParentAgreementAgreed) {
      setLoading(false)
      router.push("/auth?auth-tab=register&parent=agreement")
      return
    }


    // coach register
    if(role === "coach") {
      
    }
    
    





  }

  return (
    <div className="w-full max-w-105 rounded-2xl bg-primary p-7 text-[#F5F6F8] shadow-[0_22px_60px_rgba(0,0,0,0.45)] md:p-8">
      <div className="mb-7 space-y-2">
        <CommonBtn
          size={"lg"}
          icon={<BsArrowLeft className="text-white" />}
          variant={"link"}
          className="cursor-pointer py-2"
          onClick={() => router.back()}
        />
        <h2 className="text-lg leading-[1.05] font-semibold tracking-tight md:text-2xl lg:text-[42px]">
          Register
        </h2>
        <p className="">Let’s login into your account first</p>
      </div>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-3">
          <FieldLabel className=" ">Select your role</FieldLabel>
          <Select
            value={role}
            onValueChange={(value) => setRole(value as UserRole)}
          >
            <SelectTrigger className="h-12 w-full rounded-lg border-white/20 bg-transparent px-3 py-6 text-[#F5F6F8]">
              <SelectValue placeholder="Choose a role" />
            </SelectTrigger>
            <SelectContent
              className="border-white/20 bg-secondary text-[#F5F6F8]"
              position="popper"
            >
              {roles.map((r) => (
                <SelectItem
                  key={r.value}
                  value={r.value}
                  className="hover:bg-brand!"
                >
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <UiInput
          label="Full name"
          placeholder="Your full name"
          icon={<UserRound />}
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />

        <UiInput
          label="Email"
          placeholder="example@exmple.com"
          icon={<UserRound />}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <PwdInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <CommonBtn
          size={"lg"}
          text={"Register"}
          variant={"default"}
          onClick={handleRegister}
          isLoading={loading}
          className="mt-1 h-12 w-full rounded-lg bg-brand text-lg font-semibold text-primary transition hover:bg-brand/90"
        />

        <p className="text-center text-sm font-medium text-[#8D93A1]">
          Already have an account? ?{" "}
          <Link
            href="/auth?auth-tab=login"
            className="font-semibold text-brand hover:underline"
          >
            Login Here
          </Link>
        </p>
      </form>
    </div>
  )
}
