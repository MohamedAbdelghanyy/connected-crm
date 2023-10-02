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
import { requestsTableColumns, requestsTableToolbar, requestsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Requests",
}

async function getRequests() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/requests_data.json")
  )
  const requests = JSON.parse(data.toString())
  return requests
}

export default async function RequestsPage() {
  const requests = await getRequests()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Requests" text="Manage all requests">
          <Link href="/requests/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Request</Link>
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
          <Link href="/requests/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Request</Link>
        </EmptyPlaceholder>)}
      </div>
    </>
  )
}