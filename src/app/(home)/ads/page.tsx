import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import AddAd from "@/components/forms/add-ad"
import { adsTableColumns, adsTableToolbar, adsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Ads",
}

async function getAds() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/ads_data.json")
  )
  const ads = JSON.parse(data.toString())
  return ads
}

export default async function AdsPage() {
  const ads = await getAds()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Ads" text="Manage your ads">
          <AddAd />
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {ads.length > 0 ? (
            <DataTable data={ads} columns={adsTableColumns} toolbar={adsTableToolbar} toolbarSearchList={adsTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Ads</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any ads yet.
            </EmptyPlaceholder.Description>
            <AddAd variant="outline" />
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}