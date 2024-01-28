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
import { adsTableColumns, adsTableToolbar, adsTableToolbarSearchList } from "./config"

export default function AdsPage() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    setAds([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Ads" text="Manage your ads">
          <Link to="/ads/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Ad.</Link>
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
          <Link to="/ads/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Ad.</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}