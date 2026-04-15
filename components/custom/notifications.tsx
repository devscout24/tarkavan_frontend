import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu"
import { BellRing } from "lucide-react" 
import { RotateCcw, ArrowUpRight } from "lucide-react"
import { motion, type Transition } from "motion/react"

export default function Notification() {
  const notifications = [
    {
      id: 1,
      title: "NPM Install Complete",
      subtitle: "1,227 packages added!",
      time: "just now",
      count: 2,
    },
    {
      id: 2,
      title: "Build Succeeded",
      subtitle: "Build finished in 12.34s",
      time: "1m 11s",
    },
    {
      id: 3,
      title: "Lint Passed",
      subtitle: "No problems found",
      time: "5m",
    },
  ]

  const transition: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 26,
  }

  const getCardVariants = (i: number) => ({
    collapsed: {
      marginTop: i === 0 ? 0 : -44,
      scaleX: 1 - i * 0.05,
    },
    expanded: {
      marginTop: i === 0 ? 0 : 4,
      scaleX: 1,
    },
  })

  const textSwitchTransition: Transition = {
    duration: 0.22,
    ease: "easeInOut",
  }

  const notificationTextVariants = {
    collapsed: { opacity: 1, y: 0, pointerEvents: "auto" },
    expanded: { opacity: 0, y: -16, pointerEvents: "none" },
  }

  const viewAllTextVariants = {
    collapsed: { opacity: 0, y: 16, pointerEvents: "none" },
    expanded: { opacity: 1, y: 0, pointerEvents: "auto" },
  }

  return (
    <DropdownMenu >
      <DropdownMenuTrigger>
        <div className="min-h-10 min-w-10 grid place-items-center rounded-[12px] border-2 border-secondary bg-transparent text-white">
          <BellRing className="max-w-5"/>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-2 border-secondary! bg-primary  ">
        <motion.div
          className="w-xs space-y-3 rounded-3xl bg-bg-primary p-3 shadow-md dark:bg-neutral-900"
          initial="collapsed"
          whileHover="expanded"
        >
          <div>
            {notifications.map((notification, i) => (
              <motion.div
                key={notification.id}
                className="relative rounded-xl bg-secondary px-4 py-2 shadow-sm transition-shadow duration-200 hover:shadow-lg dark:bg-neutral-800"
                variants={getCardVariants(i)}
                transition={transition}
                style={{
                  zIndex: notifications.length - i,
                }}
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-sm font-medium text-white ">{notification.title}</h1>
                  {notification.count && (
                    <div className="flex items-center gap-0.5 text-xs font-medium text-neutral-500 dark:text-neutral-300">
                      <RotateCcw className="size-3" />
                      <span>{notification.count}</span>
                    </div>
                  )}
                </div>
                <div className="text-xs font-medium text-neutral-500">
                  <span>{notification.time}</span>
                  &nbsp;•&nbsp;
                  <span>{notification.subtitle}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded-full bg-neutral-400 text-xs font-medium text-white">
              {notifications.length}
            </div>
            <span className="grid">
              <motion.span
                className="col-start-1 row-start-1 text-sm font-medium text-white dark:text-neutral-300"
                variants={notificationTextVariants}
                transition={textSwitchTransition}
              >
                Notifications
              </motion.span>
              <motion.span
                className="text-white col-start-1 row-start-1 flex cursor-pointer items-center gap-1 text-sm font-medium   select-none dark:text-neutral-300"
                variants={viewAllTextVariants}
                transition={textSwitchTransition}
              >
                View all <ArrowUpRight className="size-4" />
              </motion.span>
            </span>
          </div>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
