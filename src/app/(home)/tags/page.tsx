import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import AddTag from "@/components/forms/add-tag"
import { tagsTableColumns, tagsTableToolbar, tagsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Product Tags",
}

async function getTags() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/tags_data.json")
  )
  const tags = JSON.parse(data.toString())
  return tags
}

export default async function TagsPage() {
  const tags = await getTags()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Tags" text="Manage your tags">
          <AddTag />
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {tags.length > 0 ? (
            <DataTable data={tags} columns={tagsTableColumns} toolbar={tagsTableToolbar} toolbarSearchList={tagsTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Tags</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any tags yet.
            </EmptyPlaceholder.Description>
            <AddTag variant="outline" />
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}