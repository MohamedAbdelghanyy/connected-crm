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
import { claimTypesTableColumns, claimTypesTableToolbar, claimTypesTableToolbarSearchList } from "./config"

export default function ClaimTypesPage() {
  const [claimTypes, setClaimTypes] = useState([]);

  useEffect(() => {
    setClaimTypes([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Claim Types" text="Manage your claim types">
          <Link to="/claim-types/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Type</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {claimTypes.length > 0 ? (
          <DataTable data={claimTypes} columns={claimTypesTableColumns} toolbar={claimTypesTableToolbar} toolbarSearchList={claimTypesTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Types</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any types yet.
          </EmptyPlaceholder.Description>
          <Link to="/claim-types/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Type</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}