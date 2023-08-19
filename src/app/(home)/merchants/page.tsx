import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { merchantsTableColumns, merchantsTableToolbar, merchantsTableToolbarSearchList } from "./config"
import AddMerchant from "@/components/forms/add-merchant"

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
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Merchants" text="Manage your merchants">
          <AddMerchant />
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
            <AddMerchant variant="outline" />
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}