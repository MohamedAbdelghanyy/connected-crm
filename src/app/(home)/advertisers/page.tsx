import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import AddAdvertiser from "@/components/forms/add-advertiser"
import { advertisersTableColumns, advertisersTableToolbar, advertisersTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Advertisers",
}

async function getAdvertisers() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/advertisers_data.json")
  )
  const advertisers = JSON.parse(data.toString())
  return advertisers
}

export default async function advertisersPage() {
  const advertisers = await getAdvertisers()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Ads" text="Manage your advertisers">
          <AddAdvertiser />
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {advertisers.length > 0 ? (
            <DataTable data={advertisers} columns={advertisersTableColumns} toolbar={advertisersTableToolbar} toolbarSearchList={advertisersTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Advertisers</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any advertisers yet.
            </EmptyPlaceholder.Description>
            <AddAdvertiser variant="outline" />
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}