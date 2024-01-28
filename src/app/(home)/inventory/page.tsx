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
import { productsTableColumns, productsTableToolbar, productsTableToolbarSearchList } from "./config"

export default function InventoryPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Inventory Products" text="Manage your inventory products">
          <Link to="/inventory/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Product</Link>
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
          <Link to="/inventory/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Product</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}