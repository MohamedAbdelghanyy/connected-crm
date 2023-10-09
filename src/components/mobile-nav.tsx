import Link from "next/link"
import * as React from "react"

import { Icons } from "@/components/icons"
import { useLockBody } from "@/hooks/use-lock-body"
import { cn } from "@/lib/utils"
import { MainNavItem, SidebarNavItem } from "@/types"

interface MobileNavProps {
  items: MainNavItem[]
  sideItems: SidebarNavItem[]
  toggleMobileMenu: Function
  children?: React.ReactNode
}

export function MobileNav({ items, sideItems, toggleMobileMenu, children }: MobileNavProps) {
  useLockBody()

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover text-popover-foreground shadow-md" style={{ width: "100vw", paddingLeft: "60px", paddingTop: "20px", paddingBottom: "20px" }}>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
              legacyBehavior>
              {item.title}
            </Link>
          ))}
          {sideItems.map((sideItem, index) => {
            const Icon = Icons[sideItem.icon || "arrowRight"]
            return sideItem.href ? (
              <Link
                key={index}
                onClick={() => toggleMobileMenu()}
                href={sideItem.disabled ? "#" : String(sideItem.href)}
                className={cn(
                  "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                  sideItem.disabled && "cursor-not-allowed opacity-60"
                )}
                legacyBehavior>
                <div>
                  <Icon className="mr-2 h-4 w-4" />
                  {sideItem.title}
                </div>
              </Link>
            ) : (
              <span className="mt-5 ml-2">{sideItem.title}</span>
            );
          })}
        </nav>
        {children}
      </div>
    </div>
  );
}
