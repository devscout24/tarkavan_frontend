import type { ReactNode } from "react"

import CommonBtn from "@/components/common/common-btn"
import { Checkbox } from "@/components/ui/checkbox"

type AgreementCard = {
  number: string
  title: string
  description: ReactNode
  icon: ReactNode
  accent?: boolean
  titleClassName?: string
}

function ParentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 4C15.45 4 14.9792 3.80417 14.5875 3.4125C14.1958 3.02083 14 2.55 14 2C14 1.45 14.1958 0.979167 14.5875 0.5875C14.9792 0.195833 15.45 0 16 0C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2C18 2.55 17.8042 3.02083 17.4125 3.4125C17.0208 3.80417 16.55 4 16 4ZM15 20V12C15 11.3333 14.8292 10.7333 14.4875 10.2C14.1458 9.66667 13.7083 9.25 13.175 8.95L14.05 6.375C14.1833 5.95833 14.4292 5.625 14.7875 5.375C15.1458 5.125 15.55 5 16 5C16.45 5 16.8542 5.125 17.2125 5.375C17.5708 5.625 17.8167 5.95833 17.95 6.375L20.5 14H18V20H15ZM10.5 9.5C10.0833 9.5 9.72917 9.35417 9.4375 9.0625C9.14583 8.77083 9 8.41667 9 8C9 7.58333 9.14583 7.22917 9.4375 6.9375C9.72917 6.64583 10.0833 6.5 10.5 6.5C10.9167 6.5 11.2708 6.64583 11.5625 6.9375C11.8542 7.22917 12 7.58333 12 8C12 8.41667 11.8542 8.77083 11.5625 9.0625C11.2708 9.35417 10.9167 9.5 10.5 9.5ZM3.5 4C2.95 4 2.47917 3.80417 2.0875 3.4125C1.69583 3.02083 1.5 2.55 1.5 2C1.5 1.45 1.69583 0.979167 2.0875 0.5875C2.47917 0.195833 2.95 0 3.5 0C4.05 0 4.52083 0.195833 4.9125 0.5875C5.30417 0.979167 5.5 1.45 5.5 2C5.5 2.55 5.30417 3.02083 4.9125 3.4125C4.52083 3.80417 4.05 4 3.5 4ZM1.5 20V13H0V7C0 6.45 0.195833 5.97917 0.5875 5.5875C0.979167 5.19583 1.45 5 2 5H5C5.55 5 6.02083 5.19583 6.4125 5.5875C6.80417 5.97917 7 6.45 7 7V13H5.5V20H1.5ZM9 20V16H8V12C8 11.5833 8.14583 11.2292 8.4375 10.9375C8.72917 10.6458 9.08333 10.5 9.5 10.5H11.5C11.9167 10.5 12.2708 10.6458 12.5625 10.9375C12.8542 11.2292 13 11.5833 13 12V16H12V20H9Z"
        fill="#C6F57A"
      />
    </svg>
  )
}

function InteractionsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10.885 18C10.9517 18 11.0183 17.9833 11.085 17.95C11.1517 17.9167 11.2017 17.8833 11.235 17.85L19.435 9.65C19.635 9.45 19.7808 9.225 19.8725 8.975C19.9642 8.725 20.01 8.475 20.01 8.225C20.01 7.95833 19.9642 7.70417 19.8725 7.4625C19.7808 7.22083 19.635 7.00833 19.435 6.825L15.185 2.575C15.0017 2.375 14.7892 2.22917 14.5475 2.1375C14.3058 2.04583 14.0517 2 13.785 2C13.535 2 13.285 2.04583 13.035 2.1375C12.785 2.22917 12.56 2.375 12.36 2.575L12.085 2.85L13.935 4.725C14.185 4.95833 14.3683 5.225 14.485 5.525C14.6017 5.825 14.66 6.14167 14.66 6.475C14.66 7.175 14.4225 7.7625 13.9475 8.2375C13.4725 8.7125 12.885 8.95 12.185 8.95C11.8517 8.95 11.5308 8.89167 11.2225 8.775C10.9142 8.65833 10.6433 8.48333 10.41 8.25L8.535 6.4L4.16 10.775C4.11 10.825 4.0725 10.8792 4.0475 10.9375C4.0225 10.9958 4.01 11.0583 4.01 11.125C4.01 11.2583 4.06 11.3792 4.16 11.4875C4.26 11.5958 4.37667 11.65 4.51 11.65C4.57667 11.65 4.64333 11.6333 4.71 11.6C4.77667 11.5667 4.82667 11.5333 4.86 11.5L8.26 8.1L9.66 9.5L6.285 12.9C6.235 12.95 6.1975 13.0042 6.1725 13.0625C6.1475 13.1208 6.135 13.1833 6.135 13.25C6.135 13.3833 6.185 13.5 6.285 13.6C6.385 13.7 6.50167 13.75 6.635 13.75C6.70167 13.75 6.76833 13.7333 6.835 13.7C6.90167 13.6667 6.95167 13.6333 6.985 13.6L10.385 10.225L11.785 11.625L8.41 15.025C8.36 15.0583 8.3225 15.1083 8.2975 15.175C8.2725 15.2417 8.26 15.3083 8.26 15.375C8.26 15.5083 8.31 15.625 8.41 15.725C8.51 15.825 8.62667 15.875 8.76 15.875C8.82667 15.875 8.88917 15.8625 8.9475 15.8375C9.00583 15.8125 9.06 15.775 9.11 15.725L12.51 12.35L13.91 13.75L10.51 17.15C10.46 17.2 10.4225 17.2542 10.3975 17.3125C10.3725 17.3708 10.36 17.4333 10.36 17.5C10.36 17.6333 10.4142 17.75 10.5225 17.85C10.6308 17.95 10.7517 18 10.885 18ZM10.86 20C10.2433 20 9.6975 19.7958 9.2225 19.3875C8.7475 18.9792 8.46833 18.4667 8.385 17.85C7.81833 17.7667 7.34333 17.5333 6.96 17.15C6.57667 16.7667 6.34333 16.2917 6.26 15.725C5.69333 15.6417 5.2225 15.4042 4.8475 15.0125C4.4725 14.6208 4.24333 14.15 4.16 13.6C3.52667 13.5167 3.01 13.2417 2.61 12.775C2.21 12.3083 2.01 11.7583 2.01 11.125C2.01 10.7917 2.0725 10.4708 2.1975 10.1625C2.3225 9.85417 2.50167 9.58333 2.735 9.35L8.535 3.575L11.81 6.85C11.8433 6.9 11.8933 6.9375 11.96 6.9625C12.0267 6.9875 12.0933 7 12.16 7C12.31 7 12.435 6.95417 12.535 6.8625C12.635 6.77083 12.685 6.65 12.685 6.5C12.685 6.43333 12.6725 6.36667 12.6475 6.3C12.6225 6.23333 12.585 6.18333 12.535 6.15L8.96 2.575C8.77667 2.375 8.56417 2.22917 8.3225 2.1375C8.08083 2.04583 7.82667 2 7.56 2C7.31 2 7.06 2.04583 6.81 2.1375C6.56 2.22917 6.335 2.375 6.135 2.575L2.61 6.125C2.46 6.275 2.335 6.45 2.235 6.65C2.135 6.85 2.06833 7.05 2.035 7.25C2.00167 7.45 2.00167 7.65417 2.035 7.8625C2.06833 8.07083 2.135 8.26667 2.235 8.45L0.785 9.9C0.501667 9.51667 0.293333 9.09583 0.16 8.6375C0.0266667 8.17917 -0.0233333 7.71667 0.01 7.25C0.0433333 6.78333 0.16 6.32917 0.36 5.8875C0.56 5.44583 0.835 5.05 1.185 4.7L4.71 1.175C5.11 0.791667 5.55583 0.5 6.0475 0.3C6.53917 0.1 7.04333 0 7.56 0C8.07667 0 8.58083 0.1 9.0725 0.3C9.56417 0.5 10.0017 0.791667 10.385 1.175L10.66 1.45L10.935 1.175C11.335 0.791667 11.7808 0.5 12.2725 0.3C12.7642 0.1 13.2683 0 13.785 0C14.3017 0 14.8058 0.1 15.2975 0.3C15.7892 0.5 16.2267 0.791667 16.61 1.175L20.835 5.4C21.2183 5.78333 21.51 6.225 21.71 6.725C21.91 7.225 22.01 7.73333 22.01 8.25C22.01 8.76667 21.91 9.27083 21.71 9.7625C21.51 10.2542 21.2183 10.6917 20.835 11.075L12.635 19.25C12.4017 19.4833 12.1308 19.6667 11.8225 19.8C11.5142 19.9333 11.1933 20 10.86 20Z"
        fill="#C6F57A"
      />
    </svg>
  )
}

function ServiceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.95 13.55L12.6 7.9L11.175 6.475L6.95 10.7L4.85 8.6L3.425 10.025L6.95 13.55ZM8 20C5.68333 19.4167 3.77083 18.0875 2.2625 16.0125C0.754167 13.9375 0 11.6333 0 9.1V3L8 0L16 3V9.1C16 11.6333 15.2458 13.9375 13.7375 16.0125C12.2292 18.0875 10.3167 19.4167 8 20ZM8 17.9C9.73333 17.35 11.1667 16.25 12.3 14.6C13.4333 12.95 14 11.1167 14 9.1V4.375L8 2.125L2 4.375V9.1C2 11.1167 2.56667 12.95 3.7 14.6C4.83333 16.25 6.26667 17.35 8 17.9Z"
        fill="#C6F57A"
      />
    </svg>
  )
}

function PaymentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13 9C12.1667 9 11.4583 8.70833 10.875 8.125C10.2917 7.54167 10 6.83333 10 6C10 5.16667 10.2917 4.45833 10.875 3.875C11.4583 3.29167 12.1667 3 13 3C13.8333 3 14.5417 3.29167 15.125 3.875C15.7083 4.45833 16 5.16667 16 6C16 6.83333 15.7083 7.54167 15.125 8.125C14.5417 8.70833 13.8333 9 13 9ZM6 12C5.45 12 4.97917 11.8042 4.5875 11.4125C4.19583 11.0208 4 10.55 4 10V2C4 1.45 4.19583 0.979167 4.5875 0.5875C4.97917 0.195833 5.45 0 6 0H20C20.55 0 21.0208 0.195833 21.4125 0.5875C21.8042 0.979167 22 1.45 22 2V10C22 10.55 21.8042 11.0208 21.4125 11.4125C21.0208 11.8042 20.55 12 20 12H6ZM8 10H18C18 9.45 18.1958 8.97917 18.5875 8.5875C18.9792 8.19583 19.45 8 20 8V4C19.45 4 18.9792 3.80417 18.5875 3.4125C18.1958 3.02083 18 2.55 18 2H8C8 2.55 7.80417 3.02083 7.4125 3.4125C7.02083 3.80417 6.55 4 6 4V8C6.55 8 7.02083 8.19583 7.4125 8.5875C7.80417 8.97917 8 9.45 8 10ZM19 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V3H2V14H19V16ZM6 10V2V10Z"
        fill="#CAFD00"
      />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9L2.25 5.25L3.3 4.1625L5.25 6.1125V0H6.75V6.1125L8.7 4.1625L9.75 5.25L6 9ZM1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5V8.25H1.5V10.5H10.5V8.25H12V10.5C12 10.9125 11.8531 11.2656 11.5594 11.5594C11.2656 11.8531 10.9125 12 10.5 12H1.5Z"
        fill="#ADAAAA"
      />
    </svg>
  )
}

const leftCards: AgreementCard[] = [
  {
    number: "01.",
    title: "Parental Responsibility",
    description:
      "I confirm that I am the parent or legal guardian of any minor athlete whose account or profile is created under my supervision. I understand and accept full responsibility for the creation, management, and oversight of my child's account, including all content, communications, and activities conducted through the platform. I agree to actively monitor and manage my child's profile, interactions, and participation on GoElite.",
    icon: <ParentIcon />,
    accent: true,
  },
  {
    number: "02.",
    title: "Interactions",
    description: (
      <>
        <p>
          I understand that GoElite is a platform designed to connect athletes,
          coaches, mentors, teams, and clubs, and that interactions may occur
          between users of the platform. I acknowledge and accept full
          responsibility for:
        </p>
        <ul className="mt-2 space-y-1">
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>My own interactions on the platform</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              My child's interactions with other athletes, coaches, mentors,
              teams, or clubs
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              Any communication, training arrangements, or engagements initiated
              through the platform
            </span>
          </li>
        </ul>
        <p className="mt-2">
          GoElite does not supervise or control interactions between users, and
          all communication or engagement between parties occurs at the user's
          own discretion and responsibility.
        </p>
      </>
    ),
    icon: <InteractionsIcon />,
  },
  {
    number: "03.",
    title: "Independent Services",
    description: (
      <>
        <p>
          I understand that coaches, mentors, teams, clubs, and other service
          providers on GoElite may operate independently of GoElite and Elite
          Athlete Mindset (EAM). GoElite and Elite Athlete Mindset do not
          guarantee, endorse, or verify the quality, safety, or delivery of
          services offered by independent users of the platform, unless
          explicitly stated. I acknowledge that:
        </p>
        <ul className="mt-2 space-y-1">
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              Any training sessions, programs, camps, mentorship services, or
              opportunities arranged through the platform are private agreements
              between the involved parties
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              GoElite and Elite Athlete Mindset are not responsible for program
              quality, cancellations, disputes, or outcomes of services
            </span>
          </li>
        </ul>
      </>
    ),
    icon: <ServiceIcon />,
  },
  {
    number: "04.",
    title: "Payments & Subscriptions",
    description: (
      <>
        <p>
          I understand that any payments made to coaches, mentors, teams, clubs,
          or other service providers may be processed through third-party
          systems or direct arrangements between users. By using the platform, I
          acknowledge that:
        </p>
        <ul className="mt-2 space-y-1">
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              GoElite and Elite Athlete Mindset are not responsible for payment
              disputes, failed services, or financial loss
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              Users are responsible for performing their own due diligence
              before making payments or entering agreements with other users
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              GoElite and Elite Athlete Mindset shall not be liable for scams,
              fraud, misrepresentation, or non-delivery of services by
              independent users
            </span>
          </li>
        </ul>
      </>
    ),
    icon: <PaymentIcon />,
  },
]

const rightCards: AgreementCard[] = [
  {
    number: "05.",
    title: "Liability",
    description: (
      <>
        <p>
          I acknowledge that GoElite is a technology platform designed to
          facilitate connections within the sports community and does not
          control the conduct of its users. To the fullest extent permitted by
          law, I agree that GoElite and Elite Athlete Mindset (EAM), including
          its owners, employees, partners, and affiliates, shall not be held
          liable for:
        </p>
        <ul className="mt-2 space-y-1">
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>Any misconduct by platform users</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>Fraudulent activity or scams conducted by users</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              Injuries, damages, or disputes resulting from services arranged
              through the platform
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>Communications or relationships formed between users</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              Actions taken by athletes, coaches, mentors, teams, or clubs using
              the platform
            </span>
          </li>
        </ul>
      </>
    ),
    icon: <ParentIcon />,
    titleClassName: "text-brand text-[14px] leading-[142.857%]",
  },
  {
    number: "06.",
    title: "Content Ownership",
    description: (
      <>
        <p>
          I confirm that all information provided in my child's profile or my
          own profile is accurate and appropriate. I understand that I am
          responsible for any content uploaded to the platform, including:
        </p>
        <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <div className="size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>Photos</span>
          </li>
          <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <div className="size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>Videos</span>
          </li>
          <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <div className="size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>Statistics</span>
          </li>
          <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <div className="size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>Personal information</span>
          </li>
          <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <div className="size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>Communications</span>
          </li>
        </ul>
      </>
    ),
    icon: <InteractionsIcon />,
    titleClassName: "text-brand text-[14px] leading-[142.857%]",
  },
  {
    number: "07.",
    title: "Media & Video",
    description: (
      <>
        <p>
          I understand that athletes and parents may upload photos, highlight
          videos, game footage, statistics, or other media content to athlete
          profiles on the GoElite platform. By uploading any media or content, I
          confirm that:
        </p>
        <ul className="mt-2 space-y-1">
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              I have the legal right or permission to upload, share, and
              distribute the content
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              The content does not violate copyright, privacy rights, or
              intellectual property rights of any third party
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              Any media featuring my child or other individuals has been shared
              with appropriate consent where required
            </span>
          </li>
        </ul>
        <p className="mt-2">
          I acknowledge that highlight videos, game footage, and other content
          uploaded to GoElite may originate from third-party sources including
          clubs, leagues, teams, photographers, video platforms, or other media
          providers. By uploading such content, I confirm that I have the right
          or authorization to use and share that content. I understand that
          GoElite and Elite Athlete Mindset (EAM):
        </p>
        <ul className="mt-2 space-y-1">
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>Do not verify ownership of uploaded media</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>Do not monitor all uploaded content</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
            <span>
              Are not responsible for copyright violations or unauthorized
              uploads made by users
            </span>
          </li>
        </ul>
        <p className="mt-2">
          I accept full responsibility for any media or content uploaded to the
          platform and agree that GoElite and Elite Athlete Mindset shall not be
          held liable for any claims related to copyright infringement,
          intellectual property disputes, or unauthorized media use.
        </p>
      </>
    ),
    icon: <ServiceIcon />,
    titleClassName: "text-brand text-[14px] leading-[142.857%]",
  },
]

function AgreementCardView({ card }: { card: AgreementCard }) {
  return (
    <article
      className={[
        "bg-[#1A1A1A] p-8 text-white shadow-[0_0_0_1px_rgba(198,245,122,0.08)]",
        card.accent ? "border-l-2 border-brand" : "border border-transparent",
      ].join(" ")}
    >
      <div className="mb-4 flex items-start gap-1.5">
        <div className="mt-0.5 shrink-0">{card.icon}</div>
        <h3
          className={[
            "text-[14px] leading-[142.857%] font-bold text-white uppercase",
            card.titleClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {card.number} {card.title}
        </h3>
      </div>
      <div className="text-[14px] leading-[162.5%] font-normal text-[#ADAAAA]">
        {card.description}
      </div>
    </article>
  )
}

export default function Agreement() {
  return (
    <section className="relative overflow-hidden bg-primary pt-28 pb-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,245,122,0.08),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(198,245,122,0.05),transparent_25%)]" />

      <div className="relative mx-auto w-full max-w-310 px-6 sm:px-8 lg:px-10">
        <div>
          <p className="text-[12px] leading-[150%] font-normal tracking-[0.35em] text-brand uppercase">
            Legal Framework
          </p>
          <h1 className="mt-4 text-[40px] leading-[100%] font-bold tracking-[-0.04em] text-white uppercase lg:text-[48px]">
            Parental Consent & User Responsibility Agreement
          </h1>
          <p className="mt-6 mb-6 max-w-4xl text-[16px] leading-[162%] font-normal text-secondary sm:text-[18px]">
            By creating an account on{" "}
            <span className="font-medium">GoElite</span>, I acknowledge and
            agree to the following terms on behalf of myself and any minor child
            whose profile I create, manage, or supervise.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-6">
            {leftCards.map((card) => (
              <AgreementCardView key={card.number} card={card} />
            ))}
          </div>
          <div className="space-y-6">
            {rightCards.map((card) => (
              <AgreementCardView key={card.number} card={card} />
            ))}
          </div>
        </div>

        <div className="mt-6 border border-brand/20 bg-[#1A1A1A] p-6 sm:p-8">
          <div className="mb-3 flex items-start gap-3">
            <Checkbox className="mt-0.5 border-white/20 data-[state=checked]:border-brand data-[state=checked]:bg-brand data-[state=checked]:text-[#111111]" />
            <h2 className="text-[14px] leading-[142.857%] font-bold text-white uppercase">
              Acknowledgment and Consent
            </h2>
          </div>
          <p className="max-w-5xl text-[14px] leading-[162.5%] font-normal text-[#ADAAAA]">
            By checking the agreement box during account creation, I confirm
            that:
          </p>
          <ul className="mt-2 space-y-1 text-[14px] leading-[162.5%] font-normal text-[#ADAAAA]">
            <li className="flex items-start gap-2">
              <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
              <span>I have read and understood this agreement</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
              <span>
                I accept full responsibility for my account and any minor
                accounts under my supervision
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
              <span>
                I acknowledge that GoElite and Elite Athlete Mindset serve
                solely as a platform and are not responsible for the conduct,
                services, or transactions of independent users
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ADAAAA]" />
              <span>
                I agree to these terms and consent to the use of the GoElite
                platform under these conditions
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 text-[12px] leading-[150%] font-normal tracking-[0.32em] text-secondary uppercase transition-colors hover:text-white"
          >
            <DownloadIcon />
            Download PDF Version
          </button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="h-12 cursor-pointer border border-white/15 px-8 text-[12px] font-bold tracking-[0.18em] text-secondary uppercase transition-colors hover:border-white/30 hover:text-white"
            >
              Exit Flow
            </button>
            <CommonBtn
              variant="default"
              size="lg"
              text="Agree and Continue"
              className="h-12 w-72 cursor-pointer border border-brand/40 bg-brand px-12 py-4 text-[12px] font-bold tracking-[0.18em] text-[#111111] uppercase shadow-[0_0_28px_rgba(198,245,122,0.28)] hover:bg-brand/90"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
