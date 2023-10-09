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
import { claimTypesTableColumns, claimTypesTableToolbar, claimTypesTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Claim Types",
}

async function getClaimTypes() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/claim_types_data.json")
  )
  const claimTypes = JSON.parse(data.toString())
  return claimTypes
}

export default async function ClaimTypesPage() {
  const claimTypes = await getClaimTypes()
  return <>
    <DashboardShell className="mb-1">
      <DashboardHeader heading="Claim Types" text="Manage your claim types">
        <Link href="/claim-types/add" className={cn(buttonVariants({}))} legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Type</div></Link>
      </DashboardHeader>
    </DashboardShell>
    <div className="m-2">
      {claimTypes.length > 0 ? (
        <DataTable data={claimTypes} columns={claimTypesTableColumns} toolbar={claimTypesTableToolbar} toolbarSearchList={claimTypesTableToolbarSearchList} />
      ) : (<EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="post" />
        <EmptyPlaceholder.Title>No Types</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any types yet.
        </EmptyPlaceholder.Description>
        <Link
          href="/claim-types/add"
          className={cn(buttonVariants({ variant: "outline" }))}
          legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Type</div></Link>
      </EmptyPlaceholder>)}
    </div>
  </>;
}