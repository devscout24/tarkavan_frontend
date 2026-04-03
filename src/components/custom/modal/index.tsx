import Agreement from "@/pages/parent-pages/Agreement"
import AddNewChildren from "@/pages/parent-pages/modals/AddNewChildren"
import useModal from "./useModal"
import { ScrollArea } from "@/components/ui/scroll-area"
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
        modalId="parentModal"
        openId="addNewChildren"
        className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-[62%]! 2xl:max-w-[56%]!"
      >
        <ScrollArea className="max-h-[90vh]">
          <AddNewChildren />
        </ScrollArea>
      </Modal>
    </div>
  )
}
