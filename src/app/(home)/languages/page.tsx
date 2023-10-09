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
import { languagesTableColumns, languagesTableToolbar, languagesTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Languages",
}

async function getLanguages() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/languages_data.json")
  )
  const languages = JSON.parse(data.toString())
  return languages
}

export default async function LanguagesPage() {
  const languages = await getLanguages()
  return <>
    <DashboardShell className="mb-1">
      <DashboardHeader heading="Languages" text="Manage your languages">
        <Link href="/languages/add" className={cn(buttonVariants({}))} legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Language</div></Link>
      </DashboardHeader>
    </DashboardShell>
    <div className="m-2">
      {languages.length > 0 ? (
        <DataTable data={languages} columns={languagesTableColumns} toolbar={languagesTableToolbar} toolbarSearchList={languagesTableToolbarSearchList} />
      ) : (<EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="post" />
        <EmptyPlaceholder.Title>No Languages</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any languages yet.
        </EmptyPlaceholder.Description>
        <Link
          href="/languages/add"
          className={cn(buttonVariants({ variant: "outline" }))}
          legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Language</div></Link>
      </EmptyPlaceholder>)}
    </div>
  </>;
}