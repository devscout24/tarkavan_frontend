import PlayerAddModal from "./all-modals/player-add-modal"
import RecruitmentForm from "./all-modals/recruite-modal"
import TeamAddModal from "./all-modals/team-add-modal"
import useModal from "./useModal"
import { ScrollArea } from "@/components/ui/scroll-area"
// import CoreIdentity from "@/pages/parent-pages/modals/CoreIdentity"
// import PositionMap from "@/pages/parent-pages/modals/PositionMap"
// import SeasonStats from "@/pages/parent-pages/modals/SeasonStats"
// import Strengths from "@/pages/parent-pages/modals/Strengths"
// import Biography from "@/pages/parent-pages/modals/Biography"
// import Highlights from "@/pages/parent-pages/modals/Highlights"
// import ImageCropModal from "../Cropper/CropImage";

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
        openId="recruitment"
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <RecruitmentForm />
        </ScrollArea>
      </Modal>

    </>
  )
}
