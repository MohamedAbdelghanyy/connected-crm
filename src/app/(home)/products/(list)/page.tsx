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

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Products" text="Manage your products">
          <div>
            <Link to="/products/add" className={cn(buttonVariants({})) + ' mr-2'}><Icons.add className="mr-2 h-4 w-4" />Add Product</Link>
            <Link to="/products/deleted" className={cn(buttonVariants({}))}><Icons.delete className="mr-2 h-4 w-4" />Deleted Products</Link>
          </div>
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
          <Link to="/products/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Product</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}