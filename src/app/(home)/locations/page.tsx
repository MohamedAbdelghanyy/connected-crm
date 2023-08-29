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
import { locationsTableColumns, locationsTableToolbar, locationsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Locations",
}

async function getLocations() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/locations_data.json")
  )
  const locations = JSON.parse(data.toString())
  return locations
}

export default async function LocationsPage() {
  const locations = await getLocations()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Locations" text="Manage your locations">
          <Link href="/locations/add" className={cn(buttonVariants({  }))}><Icons.add className="mr-2 h-4 w-4" />Add Location</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {locations.length > 0 ? (
            <DataTable data={locations} columns={locationsTableColumns} toolbar={locationsTableToolbar} toolbarSearchList={locationsTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Locations</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any locations yet.
            </EmptyPlaceholder.Description>
            <Link href="/locations/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Location</Link>
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}