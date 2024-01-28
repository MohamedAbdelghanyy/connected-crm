import { leadsTableColumns, leadsTableToolbar, leadsTableToolbarSearchList } from "@/app/(home)/leads/config"
import ImportLeads from "@/components/forms/import-leads"
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

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    setLeads([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Leads" text="Manage your leads">
          <div>
            <ImportLeads />
            <Link to="/leads/add" className={cn(buttonVariants({})) + " ml-2"}><Icons.add className="mr-2 h-4 w-4" />Add Lead</Link>
          </div>
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
          <Link to="/leads/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Lead</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}