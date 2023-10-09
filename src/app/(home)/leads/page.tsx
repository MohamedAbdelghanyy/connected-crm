import { promises as fs } from "fs"
import path from "path"

import { leadsTableColumns, leadsTableToolbar, leadsTableToolbarSearchList } from "@/app/(home)/leads/config"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const metadata = {
  title: "Leads",
}

async function getLeads() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/leads_data.json")
  )
  const leads = JSON.parse(data.toString())
  return leads
}

export default async function LeadsPage() {
  const leads = await getLeads()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Leads" text="Manage your leads">
          <Link href="/leads/add" className={cn(buttonVariants({  }))}><Icons.add className="mr-2 h-4 w-4" />Add Lead</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {leads.length > 0 ? (
            <DataTable data={leads} columns={leadsTableColumns} toolbar={leadsTableToolbar} toolbarSearchList={leadsTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Leads</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any lead yet.
            </EmptyPlaceholder.Description>
            <Link href="/leads/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Lead</Link>
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}