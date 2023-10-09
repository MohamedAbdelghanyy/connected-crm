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
import { attributesTableColumns, attributesTableToolbar, attributesTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Attributes",
}

async function getAttributes() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/attributes_data.json")
  )
  const attributes = JSON.parse(data.toString())
  return attributes
}

export default async function AttributesPage() {
  const attributes = await getAttributes()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Attributes" text="Manage your attributes">
          <Link href="/attributes/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Attribute</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {attributes.length > 0 ? (
          <DataTable data={attributes} columns={attributesTableColumns} toolbar={attributesTableToolbar} toolbarSearchList={attributesTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Attributes</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any attributes yet.
          </EmptyPlaceholder.Description>
          <Link href="/attributes/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Attribute</Link>
        </EmptyPlaceholder>)}
      </div>
    </>
  )
}