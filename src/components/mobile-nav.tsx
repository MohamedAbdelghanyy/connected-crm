import * as React from "react"
import Link from "next/link"

import { MainNavItem, SidebarNavItem } from "@/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useLockBody } from "@/hooks/use-lock-body"
import { Icons } from "@/components/icons"

interface MobileNavProps {
  items: MainNavItem[]
  sideItems: SidebarNavItem[]
  children?: React.ReactNode
}

export function MobileNav({ items, sideItems, children }: MobileNavProps) {
  useLockBody()

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo width="30px" height="30px"  />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
          {sideItems.map((sideItem, index) => (
            <Link
              key={index}
              href={sideItem.disabled ? "#" : String(sideItem.href)}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                sideItem.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {sideItem.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  )
}
