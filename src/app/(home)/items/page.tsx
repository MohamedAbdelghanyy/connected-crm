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
import { itemsTableColumns, itemsTableToolbar, itemsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Items",
}

async function getItems() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/items_data.json")
  )
  const items = JSON.parse(data.toString())
  return items
}


export default async function ItemsPage() {
  const items = await getItems()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Items" text="Manage your items">
          <Link href="/items/add" className={cn(buttonVariants({  }))}><Icons.add className="mr-2 h-4 w-4" />Add Item</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {items.length > 0 ? (
            <DataTable data={items} columns={itemsTableColumns} toolbar={itemsTableToolbar} toolbarSearchList={itemsTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Items</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any items yet.
            </EmptyPlaceholder.Description>
            <Link href="/items/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Item</Link>
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}