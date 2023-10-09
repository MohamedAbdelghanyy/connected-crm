"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import * as React from "react"

import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MainNavItem, SidebarNavItem } from "@/types"
import { useTheme } from "next-themes";

interface MainNavProps {
  items?: MainNavItem[]
  sideItems?: SidebarNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, sideItems, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const { theme, setTheme } = useTheme();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  }

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex" legacyBehavior>
        <div>
          <Icons.logo width="30px" height="30px" color={theme === "light" ? "#000" : "#fff"} />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </div>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
              legacyBehavior>
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={toggleMobileMenu}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo width="30px" height="30px" color={theme === "light" ? "#000" : "#fff"} />}
        <span className="font-bold">{siteConfig.name}</span>
      </button>
      {showMobileMenu && items && sideItems && (
        <MobileNav items={items} sideItems={sideItems} toggleMobileMenu={toggleMobileMenu}>{children}</MobileNav>
      )}
    </div>
  );
}
