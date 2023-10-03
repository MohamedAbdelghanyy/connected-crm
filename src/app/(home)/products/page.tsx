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
import { productsTableColumns, productsTableToolbar, productsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Products",
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
        <DashboardHeader heading="Products" text="Manage your products">
          <Link href="/products/add" className={cn(buttonVariants({  }))}><Icons.add className="mr-2 h-4 w-4" />Add Product</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {products.length > 0 ? (
            <DataTable data={products} columns={productsTableColumns} toolbar={productsTableToolbar} toolbarSearchList={productsTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Products</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any products yet.
            </EmptyPlaceholder.Description>
            <Link href="/products/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Product</Link>
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}