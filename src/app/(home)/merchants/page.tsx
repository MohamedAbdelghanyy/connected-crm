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
import { merchantsTableColumns, merchantsTableToolbar, merchantsTableToolbarSearchList } from "./config"

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    setMerchants([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Merchants" text="Manage your merchants">
          <Link to="/merchants/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Merchant</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {merchants.length > 0 ? (
          <DataTable data={merchants} columns={merchantsTableColumns} toolbar={merchantsTableToolbar} toolbarSearchList={merchantsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Merchants</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any merchants yet.
          </EmptyPlaceholder.Description>
          <Link to="/merchants/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Merchant</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}