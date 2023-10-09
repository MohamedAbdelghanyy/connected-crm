import { promises as fs } from "fs"
import path from "path"

import { customersTableColumns, customersTableToolbar, customersTableToolbarSearchList } from "@/app/(home)/customers/config"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const metadata = {
  title: "Customers",
}

async function getCustomers() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/customers_data.json")
  )
  const customers = JSON.parse(data.toString())
  return customers
}

export default async function CustomersPage() {
  const customers = await getCustomers()
  return <>
    <DashboardShell className="mb-1">
      <DashboardHeader heading="Customers" text="Manage your customers">
        <Link href="/customers/add" className={cn(buttonVariants({}))} legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Customer</div></Link>
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
        <Link
          href="/customers/add"
          className={cn(buttonVariants({ variant: "outline" }))}
          legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Customer</div></Link>
      </EmptyPlaceholder>)}
    </div>
  </>;
}