import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { notificationsTableColumns, notificationsTableToolbar, notificationsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Notifications",
}

async function getNotifications() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/notifications_data.json")
  )
  const notifications = JSON.parse(data.toString())
  return notifications
}

export default async function NotificationsPage() {
  const notifications = await getNotifications()
  return <>
    <DashboardShell className="mb-1">
      <DashboardHeader heading="Notifications" text="Manage your notifications">
        <Link
          href="/notifications/send"
          className={cn(buttonVariants({}))}
          legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Send Notification</div></Link>
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
        <Link
          href="/notifications/send"
          className={cn(buttonVariants({ variant: "outline" }))}
          legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Send Notification</div></Link>
      </EmptyPlaceholder>)}
    </div>
  </>;
}