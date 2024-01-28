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
import { advertisersTableColumns, advertisersTableToolbar, advertisersTableToolbarSearchList } from "./config"

export default function AdvertisersPage() {
  const [advertisers, setAdvertisers] = useState([]);

  useEffect(() => {
    setAdvertisers([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Advertisers" text="Manage your advertisers">
          <Link to="/advertisers/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Advertiser</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {advertisers.length > 0 ? (
          <DataTable data={advertisers} columns={advertisersTableColumns} toolbar={advertisersTableToolbar} toolbarSearchList={advertisersTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Advertisers</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any advertisers yet.
          </EmptyPlaceholder.Description>
          <Link to="/advertisers/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Advertiser</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}