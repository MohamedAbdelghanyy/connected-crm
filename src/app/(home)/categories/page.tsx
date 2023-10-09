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
import { categoriesTableColumns, categoriesTableToolbar, categoriesTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Categories",
}

async function getCategories() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/categories_data.json")
  )
  const categories = JSON.parse(data.toString())
  return categories
}

export default async function CategoriesPage() {
  const categories = await getCategories()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Categories" text="Manage your categories">
          <Link href="/categories/add" className={cn(buttonVariants({  }))}><Icons.add className="mr-2 h-4 w-4" />Add Category</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {categories.length > 0 ? (
            <DataTable data={categories} columns={categoriesTableColumns} toolbar={categoriesTableToolbar} toolbarSearchList={categoriesTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Categories</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any categories yet.
            </EmptyPlaceholder.Description>
            <Link href="/categories/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Category</Link>
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}