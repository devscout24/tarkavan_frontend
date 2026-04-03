import type { UseFormRegisterReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SeasonStatFieldProps {
  title: string
  subtitle: string
  registerProps: UseFormRegisterReturn
  error?: string
}

export default function SeasonStatField({
  title,
  subtitle,
  registerProps,
  error,
}: SeasonStatFieldProps) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-start gap-4 border-t border-white/10 px-6 py-4">
      <div className="space-y-0.5">
        <p className="text-[14px] leading-[150%] font-medium text-white">
          {title}
        </p>
        <p className="text-[12px] leading-[150%] font-normal text-white/70">
          {subtitle}
        </p>
      </div>

      <div className="relative w-14 justify-self-end">
        <Input
          type="number"
          inputMode="numeric"
          min={0}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-9 w-14 rounded-md border border-white/10 bg-secondary px-2 text-center text-[14px] font-medium text-white placeholder:text-primary/40 focus-visible:border-brand focus-visible:ring-0",
            error && "border-red-500 focus-visible:border-red-500"
          )}
          {...registerProps}
        />
        {error && (
          <p className="absolute top-full right-0 mt-1 w-max text-right text-xs whitespace-nowrap text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
