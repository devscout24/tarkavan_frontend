

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TNotificationItem } from "@/types"

 
 

export default function NotificationSetting({ notifications, setNotifications }: { notifications: TNotificationItem[], setNotifications: (notifications: TNotificationItem[]) => void }) {
  

  const toggleItem = (id: string) => {
    setNotifications(notifications.map((item) =>
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ))
  }

  return (
    <Card className="mt-6 gap-0 rounded-2xl border border-white/12 bg-primary py-0 text-white ring-0">
      <CardHeader className="px-4 pt-4 pb-2 md:px-6 md:pt-6">
        <CardTitle className="text-xl font-semibold tracking-tight text-white">
          Notifications
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
        <div className="overflow-hidden rounded-xl border border-white/15">
          {notifications.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center justify-between gap-4 px-4 py-3 md:px-5 ${
                index !== notifications.length - 1 ? "border-b border-white/12" : ""
              }`}
            >
              <p className="text-base font-normal text-white">{item.label}</p>

              <button
                type="button"
                role="switch"
                aria-checked={item.enabled}
                aria-label={item.label}
                onClick={() => toggleItem(item.id)}
                className={`relative h-6 w-10 shrink-0 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none ${
                  item.enabled ? "bg-brand" : "bg-white/65"
                }`}
              >
                <span
                  className={`absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-white transition-all ${
                    item.enabled ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
