import type React from "react"
import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface DashboardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  heading: string
  description?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, description, children, className, ...props }: DashboardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between px-2", className)} {...props}>
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {description && <p className="text-lg text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  )
}
