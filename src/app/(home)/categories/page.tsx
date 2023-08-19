import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import AddCategory from "@/components/forms/add-category"
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
          <AddCategory />
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
            <AddCategory variant="outline" />
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}