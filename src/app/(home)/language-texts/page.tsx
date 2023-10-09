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
import { languageTextsTableColumns, languageTextsTableToolbar, languageTextsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Language Texts",
}

async function getLanguageTexts() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/language_texts_data.json")
  )
  const languageTexts = JSON.parse(data.toString())
  return languageTexts
}

export default async function LanguageTextsPage() {
  const languageTexts = await getLanguageTexts()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Language Texts" text="Manage your language texts">
          <Link href="/language-texts/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Text</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {languageTexts.length > 0 ? (
          <DataTable data={languageTexts} columns={languageTextsTableColumns} toolbar={languageTextsTableToolbar} toolbarSearchList={languageTextsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Texts</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any language texts yet.
          </EmptyPlaceholder.Description>
          <Link href="/language-texts/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Text</Link>
        </EmptyPlaceholder>)}
      </div>
    </>
  )
}