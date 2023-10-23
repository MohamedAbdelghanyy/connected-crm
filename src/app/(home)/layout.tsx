
import ChangeCountrySelect from "@/components/change-country"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { NotificationsNav } from "@/components/notifications-nav"
import { SiteFooter } from "@/components/site-footer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserAccountNav } from "@/components/user-account-nav"
import { dashboardConfig } from "@/config/dashboard"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {

  return (
    <div className="border-b">
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav items={dashboardConfig.mainNav} sideItems={dashboardConfig.sidebarNav} />
            <div className="flex h-16 items-center py-4">
              <ChangeCountrySelect />
              <NotificationsNav />
              <UserAccountNav
                user={{
                  name: "Mohamed Abdelghany",
                  image: "",
                  email: "mohamedabdelghanyy@gmail.com",
                }}
              />
            </div>
          </div>
        </header>
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6">
          <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <ScrollArea className="h-full py-6 pr-6">
              <DashboardNav items={dashboardConfig.sidebarNav} />
            </ScrollArea>
          </aside>
          <main className="relative py-6">
            {children}
          </main>
        </div>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
