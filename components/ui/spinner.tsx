import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader  role="status" aria-label="Loading" className={cn("size-6 animate-spin", className)} {...props} />
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
