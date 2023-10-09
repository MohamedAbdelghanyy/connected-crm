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
import { merchantsTableColumns, merchantsTableToolbar, merchantsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Merchants",
}

async function getMerchants() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/merchants_data.json")
  )
  const merchants = JSON.parse(data.toString())
  return merchants
}

export default async function MerchantsPage() {
  const merchants = await getMerchants()
  return <>
    <DashboardShell className="mb-1">
      <DashboardHeader heading="Merchants" text="Manage your merchants">
        <Link href="/merchants/add" className={cn(buttonVariants({  }))} legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Merchant</div></Link>
      </DashboardHeader>
    </DashboardShell>
    <div className="m-2">
        {merchants.length > 0 ? (
          <DataTable data={merchants} columns={merchantsTableColumns} toolbar={merchantsTableToolbar} toolbarSearchList={merchantsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Merchants</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any merchants yet.
          </EmptyPlaceholder.Description>
          <Link
            href="/merchants/add"
            className={cn(buttonVariants({ variant: "outline" }))}
            legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Merchant</div></Link>
        </EmptyPlaceholder>)}
    </div>
  </>;
}