import PlayerAddModal from "./all-modals/player-add-modal"
import RecruitmentForm from "./all-modals/recruite-modal"
import TeamAddModal from "./all-modals/team-add-modal"
import useModal from "./useModal"
import { ScrollArea } from "@/components/ui/scroll-area"
import AddProgramPage from "@/components/common/add-program-modal"
import ReviewModal from "./all-modals/review-modal"
import ConfirmPayModal from "./all-modals/confirm-pay-modal"
import AddFriendlyMatch from "./all-modals/add-friendly-match"
import LogoutComfirmation from "./all-modals/logout-comfirmation"

export default function Modals() {
  const { Modal } = useModal()

  return (
    <>
      <Modal
        modalId="add-new"
        openId="player"
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <PlayerAddModal />
        </ScrollArea>
      </Modal>
      <Modal
        modalId="add-new"
        openId="team"
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <TeamAddModal />
        </ScrollArea>
      </Modal>

      <Modal
        modalId="add-new"
        openId="program"
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <AddProgramPage />
        </ScrollArea>
      </Modal>
      <Modal
        modalId="review"
        openId="program"
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <ReviewModal />
        </ScrollArea>
      </Modal>
      <Modal
        modalId="confirm-pay"
        openId="program"
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <ConfirmPayModal />
        </ScrollArea>
      </Modal>

      <Modal
        modalId="add-new"
        openId="recruitment"
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <RecruitmentForm />
        </ScrollArea>
      </Modal>
      <Modal
        modalId="add-new"
        openId="friendly-match"
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <AddFriendlyMatch />
        </ScrollArea>
      </Modal>
      <Modal
        modalId="logout-confirmation"
        openId="confirm"
        className="max-w-full overflow-hidden! border-0! p-0! sm:max-w-[92vw] md:max-w-lg"
      >
        <LogoutComfirmation />
      </Modal>
    </>
  )
}
