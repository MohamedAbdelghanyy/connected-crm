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
import { internalNotesTableColumns, internalNotesTableToolbar, internalNotesTableToolbarSearchList } from "./config"

export default function InternalNotesPage() {
  const [internalNotes, setInternalNotes] = useState([]);

  useEffect(() => {
    setInternalNotes([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Internal Notes" text="Manage all notes">
          <Link to="/internal-notes/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Note</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {internalNotes.length > 0 ? (
          <DataTable data={internalNotes} columns={internalNotesTableColumns} toolbar={internalNotesTableToolbar} toolbarSearchList={internalNotesTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Notes</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any notes yet.
          </EmptyPlaceholder.Description>
          <Link to="/internal-notes/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Note</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}