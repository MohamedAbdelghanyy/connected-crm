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
import { requestsTableColumns, requestsTableToolbar, requestsTableToolbarSearchList } from "./config"

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Requests" text="Manage all requests">
          <Link to="/requests/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Request</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {requests.length > 0 ? (
          <DataTable data={requests} columns={requestsTableColumns} toolbar={requestsTableToolbar} toolbarSearchList={requestsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Requests</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any request yet.
          </EmptyPlaceholder.Description>
          <Link to="/requests/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Request</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}