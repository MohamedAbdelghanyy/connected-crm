import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import AddHighlight from "@/components/forms/add-highlight"
import { highlightsTableColumns, highlightsTableToolbar, highlightsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Highlights",
}

async function getHighlights() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/highlights_data.json")
  )
  const highlights = JSON.parse(data.toString())
  return highlights
}

export default async function HighlightsPage() {
  const highlights = await getHighlights()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Highlights" text="Manage your highlights">
          <AddHighlight />
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
            <AddHighlight variant="outline" />
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}