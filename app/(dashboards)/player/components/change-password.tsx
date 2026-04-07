import CommonBtn from "@/components/common/common-btn"
import UiInput from "@/components/common/ui-input"

export default function ChangePassword() {
  return (
    <div className="mt-6 rounded-2xl border border-white/12 bg-primary p-4 text-white md:p-6">
      <h2 className="text-xl font-semibold tracking-tight">Change Password</h2>

      <form className="mt-6 space-y-5">
        <UiInput
          label="Current Password"
          type="password"
          placeholder=""
          className="h-12 rounded-xl border-white/15 bg-transparent! py-0"
        />

        <UiInput
          label="New Password"
          type="password"
          placeholder=""
          className="h-12 rounded-xl border-white/15 bg-transparent! py-0"
        />

        <UiInput
          label="Confirm New Password"
          type="password"
          placeholder=""
          className="h-12 rounded-xl border-white/15 bg-transparent! py-0"
        />

        <div className="flex items-center justify-end gap-4">
          <CommonBtn
            size="lg"
            variant="outline"
            text="Cancel"
            className="h-12 px-10 w-fit hover:text-brand rounded-xl border border-brand bg-transparent text-base font-semibold text-brand hover:bg-brand/10"
          />

          <CommonBtn
            size="lg"
            variant="default"
            text="Save"
            className="h-12 px-10 w-fit rounded-xl bg-brand text-base font-semibold text-primary hover:bg-brand/90"
          />
        </div>
      </form>
    </div>
  )
}
