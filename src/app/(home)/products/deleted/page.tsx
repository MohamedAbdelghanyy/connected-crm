import DashboardLayout from "@/components/layouts/dashboard-layout"
import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { DashboardHeader } from "@/components/other/header"
import { DashboardShell } from "@/components/other/shell"
import { DataTable } from "@/components/table/data-table"
import { useEffect, useState } from "react"
import { deletedProductsTableColumns, deletedProductsTableToolbar, deletedProductsTableToolbarSearchList } from "./config"

export default function DeletedProductsPage() {
  const [deletedProducts, setDeletedProducts] = useState([]);

  useEffect(() => {
    setDeletedProducts([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Deleted Products" text="Manage your deleted products"></DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {deletedProducts.length > 0 ? (
          <DataTable data={deletedProducts} columns={deletedProductsTableColumns} toolbar={deletedProductsTableToolbar} toolbarSearchList={deletedProductsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Deleted Products</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any deleted products yet.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}