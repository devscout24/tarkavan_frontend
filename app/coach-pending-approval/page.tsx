"use client"

import CommonBtn from "@/components/common/common-btn"
import { Icon } from "@/components/custom/Icon"

function ProfileUnderReviewIcon() {
  return (
    <div className="mx-auto mt-2 mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#C6F57A]">
      <Icon width={28} height={28} viewBox="0 0 24 30" fill="none">
        <path
          d="M10.425 20.325L18.9 11.85L16.7625 9.7125L10.425 16.05L7.275 12.9L5.1375 15.0375L10.425 20.325ZM12 30C8.525 29.125 5.65625 27.1312 3.39375 24.0187C1.13125 20.9062 0 17.45 0 13.65V4.5L12 0L24 4.5V13.65C24 17.45 22.8688 20.9062 20.6063 24.0187C18.3438 27.1312 15.475 29.125 12 30ZM12 26.85C14.6 26.025 16.75 24.375 18.45 21.9C20.15 19.425 21 16.675 21 13.65V6.5625L12 3.1875L3 6.5625V13.65C3 16.675 3.85 19.425 5.55 21.9C7.25 24.375 9.4 26.025 12 26.85Z"
          fill="#060807"
        />
      </Icon>
    </div>
  )
}

function EstimatedTimeIcon() {
  return (
    <Icon width={20} height={20} viewBox="0 0 20 20" fill="none">
      <path
        d="M13.3 14.7L14.7 13.3L11 9.6V5H9V10.4L13.3 14.7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z"
        fill="#060807"
      />
    </Icon>
  )
}

function RefreshIcon() {
  return (
    <Icon width={16} height={16} viewBox="0 0 10 10" fill="none">
      <path
        d="M4.66667 9.33333C3.36389 9.33333 2.26042 8.88125 1.35625 7.97708C0.452083 7.07292 0 5.96944 0 4.66667C0 3.36389 0.452083 2.26042 1.35625 1.35625C2.26042 0.452083 3.36389 0 4.66667 0C5.3375 0 5.97917 0.138542 6.59167 0.415625C7.20417 0.692708 7.72917 1.08889 8.16667 1.60417V0H9.33333V4.08333H5.25V2.91667H7.7C7.38889 2.37222 6.96354 1.94444 6.42396 1.63333C5.88438 1.32222 5.29861 1.16667 4.66667 1.16667C3.69444 1.16667 2.86806 1.50694 2.1875 2.1875C1.50694 2.86806 1.16667 3.69444 1.16667 4.66667C1.16667 5.63889 1.50694 6.46528 2.1875 7.14583C2.86806 7.82639 3.69444 8.16667 4.66667 8.16667C5.41528 8.16667 6.09097 7.95278 6.69375 7.525C7.29653 7.09722 7.71944 6.53333 7.9625 5.83333H9.1875C8.91528 6.86389 8.36111 7.70486 7.525 8.35625C6.68889 9.00764 5.73611 9.33333 4.66667 9.33333Z"
        fill="#060807"
      />
    </Icon>
  )
}

export default function CoachPendingApprovalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#18191B]">
      <div className="w-full max-w-5xl rounded-2xl bg-[#232427] p-8">
        {/* Page header */}
        <h1
          className="mb-2 text-white"
          style={{ fontSize: "20px", fontWeight: 700, lineHeight: "150%" }}
        >
          Coach – Pending Approval
        </h1>
        <p className="mb-6 border-b border-b-[#35373B] pb-4 text-white/80">
          Start by defining the athlete&apos;s core identity profile.
        </p>

        {/* Body */}
        <div className="flex flex-col gap-6 md:flex-row">
          {/* ── Main column ── */}
          <div className="flex-1">
            {/* Review card */}
            <div className="overflow-hidden rounded-2xl shadow-md">
              <div className="bg-[#F1FDD7] py-16">
                <ProfileUnderReviewIcon />
                <h3 className="mb-2 text-center text-2xl font-semibold text-[#060807]">
                  Profile Under Review
                </h3>
                <p className="mx-auto mb-8 max-w-[366px] p-2 text-center text-[#060807]">
                  Your profile is under review by the GoElite admin team. You
                  will be notified via email once your account has been
                  approved.
                </p>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E9F7C7] bg-white px-6 py-4 md:flex-row md:px-8">
                <div className="flex items-center gap-2 text-[#060807]">
                  <EstimatedTimeIcon />
                  <span className="text-sm">Estimated time: 24–48 hours</span>
                </div>
                <CommonBtn
                  variant="default"
                  size="default"
                  className="flex w-48 items-center gap-2 rounded-md bg-[#C6F57A] px-5 py-2 font-semibold text-[#060807] hover:bg-[#b6e96a]"
                  icon={<RefreshIcon />}
                  text="Refresh Status"
                />
              </div>
            </div>

            {/* Update info card */}
            <div className="mt-6 flex items-start gap-4 rounded-2xl border border-[#35373B] bg-[#232427] p-5">
              <div className="flex shrink-0 items-center justify-center rounded-full bg-[#35373B] p-3">
                <Icon width={20} height={20} viewBox="0 0 18 16" fill="none">
                  <path
                    d="M0 10V8H7V10H0ZM0 6V4H11V6H0ZM0 2V0H11V2H0ZM9 16V12.925L14.525 7.425C14.675 7.275 14.8417 7.16667 15.025 7.1C15.2083 7.03333 15.3917 7 15.575 7C15.775 7 15.9667 7.0375 16.15 7.1125C16.3333 7.1875 16.5 7.3 16.65 7.45L17.575 8.375C17.7083 8.525 17.8125 8.69167 17.8875 8.875C17.9625 9.05833 18 9.24167 18 9.425C18 9.60833 17.9667 9.79583 17.9 9.9875C17.8333 10.1792 17.725 10.35 17.575 10.5L12.075 16H9ZM16.5 9.425L15.575 8.5L16.5 9.425ZM10.5 14.5H11.45L14.475 11.45L14.025 10.975L13.55 10.525L10.5 13.55V14.5ZM14.025 10.975L13.55 10.525L14.475 11.45L14.025 10.975Z"
                    fill="white"
                  />
                </Icon>
              </div>
              <div>
                <div className="font-semibold text-white">
                  Need to update your info?
                </div>
                <div className="mb-1 text-sm text-white/70">
                  You can still edit your profile details while the review is in
                  progress. Changes might reset the review clock.
                </div>
                <a href="#" className="text-sm font-semibold text-[#7CB518]">
                  Edit Profile Information &gt;
                </a>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="flex w-full flex-col gap-6 md:w-80">
            {/* Application Process */}
            <div className="rounded-2xl border border-[#35373B] bg-[#18191B] p-5">
              <div className="mb-4 font-semibold text-white">
                Application Process
              </div>
              <div className="relative flex flex-col items-start gap-8 pl-7">
                {/* Vertical connector line */}
                <div
                  className="absolute top-6 bottom-6 left-4 z-0 rounded-full bg-[#C6F57A]"
                  style={{ width: "2px" }}
                />

                {/* Step 1 – Profile Submitted */}
                <div className="relative z-10 flex items-center gap-3">
                  <span className="flex items-center justify-center rounded-full bg-[#C6F57A] p-1">
                    <Icon width={12} height={12} viewBox="0 0 10 8" fill="none">
                      <path
                        d="M3.325 7.01458L0 3.68958L0.83125 2.85833L3.325 5.35208L8.67708 0L9.50833 0.83125L3.325 7.01458Z"
                        fill="#060807"
                      />
                    </Icon>
                  </span>
                  <div>
                    <div className="font-medium text-white">
                      Profile Submitted
                    </div>
                    <div className="text-xs text-white/60">
                      Completed on Oct 24, 2023
                    </div>
                  </div>
                </div>

                {/* Step 2 – Admin Verification */}
                <div className="relative z-10 flex items-center gap-3">
                  <span className="flex items-center justify-center rounded-full bg-[#C6F57A] p-1">
                    <Icon
                      width={12}
                      height={14}
                      viewBox="0 0 10 12"
                      fill="none"
                    >
                      <path
                        d="M2.33333 10.5H7V8.75C7 8.10833 6.77153 7.55903 6.31458 7.10208C5.85764 6.64514 5.30833 6.41667 4.66667 6.41667C4.025 6.41667 3.47569 6.64514 3.01875 7.10208C2.56181 7.55903 2.33333 8.10833 2.33333 8.75V10.5ZM4.66667 5.25C5.30833 5.25 5.85764 5.02153 6.31458 4.56458C6.77153 4.10764 7 3.55833 7 2.91667V1.16667H2.33333V2.91667C2.33333 3.55833 2.56181 4.10764 3.01875 4.56458C3.47569 5.02153 4.025 5.25 4.66667 5.25ZM0 11.6667V10.5H1.16667V8.75C1.16667 8.15694 1.30521 7.60035 1.58229 7.08021C1.85938 6.56007 2.24583 6.14444 2.74167 5.83333C2.24583 5.52222 1.85938 5.1066 1.58229 4.58646C1.30521 4.06632 1.16667 3.50972 1.16667 2.91667V1.16667H0V0H9.33333V1.16667H8.16667V2.91667C8.16667 3.50972 8.02812 4.06632 7.75104 4.58646C7.47396 5.1066 7.0875 5.52222 6.59167 5.83333C7.0875 6.14444 7.47396 6.56007 7.75104 7.08021C8.02812 7.60035 8.16667 8.15694 8.16667 8.75V10.5H9.33333V11.6667H0Z"
                        fill="#060807"
                      />
                    </Icon>
                  </span>
                  <div>
                    <div className="font-medium text-white">
                      Admin Verification
                    </div>
                    <div className="text-xs text-[#7CB518]">In Progress</div>
                  </div>
                </div>

                {/* Step 3 – Account Activation */}
                <div className="relative z-10 flex items-center gap-3">
                  <span className="flex items-center justify-center rounded-full bg-[#C6F57A] p-1">
                    <Icon
                      width={12}
                      height={15}
                      viewBox="0 0 10 13"
                      fill="none"
                    >
                      <path
                        d="M1.16667 12.25C0.845833 12.25 0.571181 12.1358 0.342708 11.9073C0.114236 11.6788 0 11.4042 0 11.0833V5.25C0 4.92917 0.114236 4.65451 0.342708 4.42604C0.571181 4.19757 0.845833 4.08333 1.16667 4.08333H1.75V2.91667C1.75 2.10972 2.03438 1.42188 2.60313 0.853125C3.17188 0.284375 3.85972 0 4.66667 0C5.47361 0 6.16146 0.284375 6.73021 0.853125C7.29896 1.42188 7.58333 2.10972 7.58333 2.91667V4.08333H8.16667C8.4875 4.08333 8.76215 4.19757 8.99063 4.42604C9.2191 4.65451 9.33333 4.92917 9.33333 5.25V11.0833C9.33333 11.4042 9.2191 11.6788 8.99063 11.9073C8.76215 12.1358 8.4875 12.25 8.16667 12.25H1.16667ZM1.16667 11.0833H8.16667V5.25H1.16667V11.0833ZM4.66667 9.33333C4.9875 9.33333 5.26215 9.2191 5.49062 8.99063C5.7191 8.76215 5.83333 8.4875 5.83333 8.16667C5.83333 7.84583 5.7191 7.57118 5.49062 7.34271C5.26215 7.11424 4.9875 7 4.66667 7C4.34583 7 4.07118 7.11424 3.84271 7.34271C3.61424 7.57118 3.5 7.84583 3.5 8.16667C3.5 8.4875 3.61424 8.76215 3.84271 8.99063C4.07118 9.2191 4.34583 9.33333 4.66667 9.33333ZM2.91667 4.08333H6.41667V2.91667C6.41667 2.43056 6.24653 2.01736 5.90625 1.67708C5.56597 1.33681 5.15278 1.16667 4.66667 1.16667C4.18056 1.16667 3.76736 1.33681 3.42708 1.67708C3.08681 2.01736 2.91667 2.43056 2.91667 2.91667V4.08333ZM1.16667 11.0833V5.25V11.0833Z"
                        fill="#060807"
                        fillOpacity={0.7}
                      />
                    </Icon>
                  </span>
                  <div>
                    <div className="font-medium text-white">
                      Account Activation
                    </div>
                    <div className="text-xs text-white/60">
                      Awaiting Approval
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="flex flex-col gap-3 rounded-2xl border border-[#35373B] bg-[#18191B] p-5">
              <div className="font-semibold text-white">Have questions?</div>
              <div className="text-sm text-white/70">
                Our support team is available to help you with the onboarding
                process.
              </div>
              <CommonBtn
                variant="default"
                size="default"
                className="mt-2 w-40 bg-[#C6F57A] font-semibold text-[#060807] hover:bg-[#b6e96a]"
                text="Contact Support"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
