import { Icons } from "@/components/other/icons"
import { MobileNav } from "@/components/other/mobile-nav"
import { siteConfig } from "@/config/site"
import { useTheme } from "@/lib/theme-provider"
import useSelectedLayoutSegment from "@/lib/useSelectedLayoutSegment"
import { cn } from "@/lib/utils"
import { MainNavItem, SidebarNavItem } from "@/types"
import * as React from "react"
import { Link } from "react-router-dom"

interface MainNavProps {
  items?: MainNavItem[]
  sideItems?: SidebarNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, sideItems, children }: MainNavProps) {
  const { selectedLayoutSegment } = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const { theme } = useTheme();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  }

  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo width="30px" height="30px" color={theme === "light" ? "#000" : "#fff"} />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              to={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${selectedLayoutSegment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
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
  )
}
