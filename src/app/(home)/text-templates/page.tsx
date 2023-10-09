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
import { textTemplatesTableColumns, textTemplatesTableToolbar, textTemplatesTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Text Templates",
}

async function getTextTemplates() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/text_templates_data.json")
  )
  const textTemplates = JSON.parse(data.toString())
  return textTemplates
}

export default async function TextTemplatesPage() {
  const textTemplates = await getTextTemplates()
  return <>
    <DashboardShell className="mb-1">
      <DashboardHeader heading="Text Templates" text="Manage your text templates">
        <Link
          href="/text-templates/add"
          className={cn(buttonVariants({}))}
          legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Template</div></Link>
      </DashboardHeader>
    </DashboardShell>
    <div className="m-2">
      {textTemplates.length > 0 ? (
        <DataTable data={textTemplates} columns={textTemplatesTableColumns} toolbar={textTemplatesTableToolbar} toolbarSearchList={textTemplatesTableToolbarSearchList} />
      ) : (<EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="post" />
        <EmptyPlaceholder.Title>No Templates</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any templates yet.
        </EmptyPlaceholder.Description>
        <Link
          href="/text-templates/add"
          className={cn(buttonVariants({ variant: "outline" }))}
          legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Template</div></Link>
      </EmptyPlaceholder>)}
    </div>
  </>;
}