import { customersTableColumns, customersTableToolbar, customersTableToolbarSearchList } from "@/app/(home)/customers/config"
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

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Customers" text="Manage your customers">
          <Link to="/customers/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Customer</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {customers.length > 0 ? (
          <DataTable data={customers} columns={customersTableColumns} toolbar={customersTableToolbar} toolbarSearchList={customersTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Customers</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any customer yet.
          </EmptyPlaceholder.Description>
          <Link to="/customers/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Customer</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}