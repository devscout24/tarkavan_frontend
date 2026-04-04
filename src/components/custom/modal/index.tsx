import Agreement from "@/pages/parent-pages/Agreement"
import { ADD_ATHLETE_MODAL_CLEANUP_KEYS } from "@/pages/parent-pages/modal_common"

import useModal from "./useModal"
import { ScrollArea } from "@/components/ui/scroll-area"
import CoreIdentity from "@/pages/parent-pages/modals/CoreIdentity"
import PositionMap from "@/pages/parent-pages/modals/PositionMap"
import SeasonStats from "@/pages/parent-pages/modals/SeasonStats"
import Strengths from "@/pages/parent-pages/modals/Strengths"
import Biography from "@/pages/parent-pages/modals/Biography"
// import ImageCropModal from "../Cropper/CropImage";

export default function Modals() {
  const { Modal } = useModal()

  return (
    <div className="overflow-scroll">
      <Modal
        modalId="test"
        openId="oikire"
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-1/2! 2xl:max-w-[40%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <Agreement />
        </ScrollArea>
      </Modal>

      <Modal
        modalId="addNewChildren"
        openId="coreIdentity"
        cleanupQueryKeys={ADD_ATHLETE_MODAL_CLEANUP_KEYS}
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <CoreIdentity />
        </ScrollArea>
      </Modal>

      <Modal
        modalId="addNewChildren"
        openId="positionMap"
        cleanupQueryKeys={ADD_ATHLETE_MODAL_CLEANUP_KEYS}
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <PositionMap />
        </ScrollArea>
      </Modal>

      <Modal
        modalId="addNewChildren"
        openId="seasonStats"
        cleanupQueryKeys={ADD_ATHLETE_MODAL_CLEANUP_KEYS}
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <SeasonStats />
        </ScrollArea>
      </Modal>

      <Modal
        modalId="addNewChildren"
        openId="strengths"
        cleanupQueryKeys={ADD_ATHLETE_MODAL_CLEANUP_KEYS}
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <Strengths />
        </ScrollArea>
      </Modal>

      <Modal
        modalId="addNewChildren"
        openId="biography"
        cleanupQueryKeys={ADD_ATHLETE_MODAL_CLEANUP_KEYS}
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <Biography />
        </ScrollArea>
      </Modal>
    </div>
  )
}
