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
import { callsTableColumns, callsTableToolbar, callsTableToolbarSearchList } from "./config"

export default function CallsPage() {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    setCalls([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Calls" text="Manage all calls">
          <Link to="/calls/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Call</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {calls.length > 0 ? (
          <DataTable data={calls} columns={callsTableColumns} toolbar={callsTableToolbar} toolbarSearchList={callsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Calls</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any calls yet.
          </EmptyPlaceholder.Description>
          <Link to="/calls/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Call</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}