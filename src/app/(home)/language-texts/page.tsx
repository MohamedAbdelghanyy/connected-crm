import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { DashboardHeader } from "@/components/other/header"
import { Icons } from "@/components/other/icons"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { DashboardShell } from "@/components/other/shell"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { languageTextsTableColumns, languageTextsTableToolbar, languageTextsTableToolbarSearchList } from "./config"

export default function LanguageTextsPage() {
  const [languageTexts, setLanguageTexts] = useState([]);

  useEffect(()=>{
    setLanguageTexts([]);
  }, [])

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Language Texts" text="Manage your language texts">
          <Link to="/language-texts/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Text</Link>
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
          <Link to="/language-texts/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Text</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}