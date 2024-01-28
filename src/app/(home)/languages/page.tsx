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
import { languagesTableColumns, languagesTableToolbar, languagesTableToolbarSearchList } from "./config"

export default function LanguagesPage() {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    setLanguages([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Languages" text="Manage your languages">
          <Link to="/languages/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Language</Link>
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
          <Link to="/languages/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Language</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}