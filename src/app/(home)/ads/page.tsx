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
  return <>
    <DashboardShell className="mb-1">
      <DashboardHeader heading="Ads" text="Manage your ads">
        <Link href="/ads/add" className={cn(buttonVariants({  }))} legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Ad.</div></Link>
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
          <Link
            href="/ads/add"
            className={cn(buttonVariants({ variant: "outline" }))}
            legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Ad.</div></Link>
        </EmptyPlaceholder>)}
    </div>
  </>;
}