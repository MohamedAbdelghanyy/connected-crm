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
import { internalNotesTableColumns, internalNotesTableToolbar, internalNotesTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Internal Notes",
}

async function getInternalNotes() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/internal_notes_data.json")
  )
  const internalNotes = JSON.parse(data.toString())
  return internalNotes
}

export default async function InternalNotesPage() {
  const internalNotes = await getInternalNotes()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Internal Notes" text="Manage all notes">
          <Link href="/internal-notes/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Note</Link>
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
          <Link href="/internal-notes/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Note</Link>
        </EmptyPlaceholder>)}
      </div>
    </>
  )
}