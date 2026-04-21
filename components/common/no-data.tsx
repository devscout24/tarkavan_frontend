// src/components/no-data.tsx

import { Inbox } from "lucide-react"

interface NoDataProps {
  title?: string
  description?: string
}

export default function NoData({
  title = "No Data Found",
  description = "There is nothing to display here yet.",
}: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4 shadow-sm">
        <Inbox className="h-8 w-8 text-muted-foreground" />
      </div>

      <h2 className="text-lg font-semibold text-foreground">{title}</h2>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
