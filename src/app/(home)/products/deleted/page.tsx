import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { deletedProductsTableColumns, deletedProductsTableToolbar, deletedProductsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Deleted Products",
}

async function getProducts() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/products_data.json")
  )
  const products = JSON.parse(data.toString())
  return products
}


export default async function ProductsPage() {
  const products = await getProducts()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Deleted Products" text="Manage your deleted products"></DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {products.length > 0 ? (
          <DataTable data={products} columns={deletedProductsTableColumns} toolbar={deletedProductsTableToolbar} toolbarSearchList={deletedProductsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Deleted Products</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any deleted products yet.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>)}
      </div>
    </>
  )
}