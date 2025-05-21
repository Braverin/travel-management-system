"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MapPin, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function DashboardNav({ className, items, ...props }: NavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex space-x-2 lg:space-x-4", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.icon}
          <span className="ml-2">{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}

export function MainNav() {
  const items = [
    {
      href: "/",
      title: "首页",
      icon: <Home className="h-4 w-4" />,
    },
    {
      href: "/applications",
      title: "申请管理",
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/tours",
      title: "旅游团管理",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      href: "/settings",
      title: "系统设置",
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  return <DashboardNav items={items} className="mx-6" />
}
