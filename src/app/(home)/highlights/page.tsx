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
import { highlightsTableColumns, highlightsTableToolbar, highlightsTableToolbarSearchList } from "./config"

export default function HighlightsPage() {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    setHighlights([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Highlights" text="Manage your highlights">
          <Link to="/highlights/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Highlight</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {highlights.length > 0 ? (
          <DataTable data={highlights} columns={highlightsTableColumns} toolbar={highlightsTableToolbar} toolbarSearchList={highlightsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Highlights</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any highlight yet.
          </EmptyPlaceholder.Description>
          <Link to="/highlights/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Highlight</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}