import Agreement from "@/app/(dashboards)/parent/component/aggrement"
import useModal from "./useModal"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Modals() {
  const { Modal } = useModal()

  return (
    <Modal
      modalId="test"
      openId="oikire"
      className="max-w-full overflow-hidden! border-0! p-0! lg:max-w-1/2! 2xl:max-w-[40%]!"
    >
      <ScrollArea className="max-h-[90vh]">
        <Agreement />
      </ScrollArea>
    </Modal>
  )
}
