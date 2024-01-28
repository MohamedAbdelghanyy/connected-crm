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
import { textTemplatesTableColumns, textTemplatesTableToolbar, textTemplatesTableToolbarSearchList } from "./config"

export default function TextTemplatesPage() {
  const [textTemplates, setTextTemplates] = useState([]);

  useEffect(() => {
    setTextTemplates([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Text Templates" text="Manage your text templates">
          <Link to="/text-templates/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Template</Link>
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
          <Link to="/text-templates/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Template</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}