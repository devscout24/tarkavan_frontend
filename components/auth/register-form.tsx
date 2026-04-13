"use client"

import { useState } from "react"
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

type UserRole = "parent" | "player" | "coach" | "team" | "club"

const roles: Array<{ label: string; value: UserRole }> = [
  { label: "Register as Parent", value: "parent" },
  { label: "Register as Player", value: "player" },
  { label: "Register as Coach", value: "coach" },
  { label: "Register as Team", value: "team" },
  { label: "Register as Club", value: "club" },
]

export default function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = searchParams.get("user-type")
  const [role, setRole] = useState<UserRole>(
    roles.some((item) => item.value === initialRole)
      ? (initialRole as UserRole)
      : "parent"
  )

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
            <SelectContent className="border-white/20 bg-secondary text-[#F5F6F8]">
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
        />

        <UiInput
          label="Email"
          placeholder="example@exmple.com"
          icon={<UserRound />}
        />

        <PwdInput label="Password" placeholder="••••••••" />

        <CommonBtn
          size={"lg"}
          text={"Register"}
          variant={"default"}
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
