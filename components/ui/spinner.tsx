import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export function SpinnerBlock() {
  return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
  )
}

export { Spinner }
