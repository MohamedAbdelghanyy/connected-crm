import DashboardLayout from "@/components/layouts/dashboard-layout"
import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { DashboardHeader } from "@/components/other/header"
import { Icons } from "@/components/other/icons"
import { DashboardShell } from "@/components/other/shell"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { subscriptionsTableColumns, subscriptionsTableToolbar, subscriptionsTableToolbarSearchList } from "./config"

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    setSubscriptions([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Subscriptions" text="Manage your subscriptions">
          <Link to="/subscriptions/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Subscription</Link>
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
          <Link to="/subscriptions/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Subscription</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}