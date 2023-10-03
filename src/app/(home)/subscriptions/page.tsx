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
import { subscriptionsTableColumns, subscriptionsTableToolbar, subscriptionsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Subscriptions",
}

async function getSubscriptions() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/subscriptions_data.json")
  )
  const subscriptions = JSON.parse(data.toString())
  return subscriptions
}

export default async function AdsPage() {
  const subscriptions = await getSubscriptions()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Subscriptions" text="Manage your subscriptions">
          <Link href="/subscriptions/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Subscription</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {subscriptions.length > 0 ? (
          <DataTable data={subscriptions} columns={subscriptionsTableColumns} toolbar={subscriptionsTableToolbar} toolbarSearchList={subscriptionsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Subscriptions</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any subscriptions yet.
          </EmptyPlaceholder.Description>
          <Link href="/subscriptions/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Subscription</Link>
        </EmptyPlaceholder>)}
      </div>
    </>
  )
}