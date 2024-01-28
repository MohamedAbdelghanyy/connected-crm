import { Icons } from "@/components/other/icons";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types";
import { Link, useLocation } from "react-router-dom";

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const location = useLocation();
  const path = location.pathname;

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href ? (
            <Link key={index} to={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          ) : (
            <div key={index}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-3 text-xs font-medium"
                )}
              >
                {/*<Icon className="mr-2 h-4 w-4" />*/}
                <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>{item.title}</span>
              </span>
            </div>
          )
        )
      })}
    </nav>
  )
}
