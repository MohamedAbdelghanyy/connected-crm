import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { leadsTableColumns, leadsTableToolbar, leadsTableToolbarSearchList } from "@/app/(home)/leads/config"
import AddLead from "@/components/forms/add-lead"

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
          <AddLead />
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
            <AddLead variant="outline" />
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}