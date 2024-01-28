import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { DashboardHeader } from "@/components/other/header"
import { Icons } from "@/components/other/icons"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { DashboardShell } from "@/components/other/shell"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { notificationsTableColumns, notificationsTableToolbar, notificationsTableToolbarSearchList } from "./config"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(()=>{
    setNotifications([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Notifications" text="Manage your notifications">
          <Link to="/notifications/send" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Send Notification</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {notifications.length > 0 ? (
          <DataTable data={notifications} columns={notificationsTableColumns} toolbar={notificationsTableToolbar} toolbarSearchList={notificationsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Notifications</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any notifications yet.
          </EmptyPlaceholder.Description>
          <Link to="/notifications/send" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Send Notification</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}