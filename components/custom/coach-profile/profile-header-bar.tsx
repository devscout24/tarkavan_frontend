import CommonBtn from "@/components/common/common-btn"
import { Card } from "@/components/ui/card"
import VisibilityEdit from "@/app/(dashboards)/player/components/visibility-edit"

export default function ProfileHeaderBar() {
  return (
    <Card className="mb-5 flex-col items-start gap-3 rounded-[12px] border border-secondary/60 bg-secondary/40 px-5 py-3 sm:flex-row sm:items-center sm:justify-between xl:mb-6 xl:px-6 xl:py-4 2xl:mb-7 2xl:px-7 2xl:py-4.5">
      <VisibilityEdit />
      <CommonBtn
        text="Edit Profile"
        className="h-10 w-fit rounded-[8px] bg-brand px-4 font-medium text-primary hover:bg-brand xl:h-11 xl:px-5 xl:text-base 2xl:h-12 2xl:px-6 2xl:text-lg"
        size="sm"
        variant="default"
      />
    </Card>
  )
}
