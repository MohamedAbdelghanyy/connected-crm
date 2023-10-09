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
import { topicsTableColumns, topicsTableToolbar, topicsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Topics",
}

async function getTopics() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/topics_data.json")
  )
  const topics = JSON.parse(data.toString())
  return topics
}

export default async function TopicsPage() {
  const topics = await getTopics()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Topics" text="Manage your topics">
          <Link href="/topics/add" className={cn(buttonVariants({  }))}><Icons.add className="mr-2 h-4 w-4" />Add Topic</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {topics.length > 0 ? (
            <DataTable data={topics} columns={topicsTableColumns} toolbar={topicsTableToolbar} toolbarSearchList={topicsTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Topics</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any topics yet.
            </EmptyPlaceholder.Description>
            <Link href="/topics/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Topic</Link>
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}