import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import AddBrand from "@/components/forms/add-brand"
import { brandsTableColumns, brandsTableToolbar, brandsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Brands",
}

async function getBrands() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/brands_data.json")
  )
  const brands = JSON.parse(data.toString())
  return brands
}

export default async function BrandsPage() {
  const brands = await getBrands()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Brands" text="Manage your brands">
          <AddBrand />
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {brands.length > 0 ? (
            <DataTable data={brands} columns={brandsTableColumns} toolbar={brandsTableToolbar} toolbarSearchList={brandsTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Brands</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any brands yet.
            </EmptyPlaceholder.Description>
            <AddBrand variant="outline" />
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}