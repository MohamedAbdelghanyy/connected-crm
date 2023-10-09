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
import { callsTableColumns, callsTableToolbar, callsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Calls",
}

async function getCalls() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/calls_data.json")
  )
  const calls = JSON.parse(data.toString())
  return calls
}

export default async function CallsPage() {
  const calls = await getCalls()
  return <>
    <DashboardShell className="mb-1">
      <DashboardHeader heading="Calls" text="Manage all calls">
        <Link href="/calls/add" className={cn(buttonVariants({}))} legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Call</div></Link>
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
        <Link
          href="/calls/add"
          className={cn(buttonVariants({ variant: "outline" }))}
          legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Call</div></Link>
      </EmptyPlaceholder>)}
    </div>
  </>;
}