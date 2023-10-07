import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { wishlistsTableColumns, wishlistsTableToolbar, wishlistsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Wishlists",
}

async function getWishlists() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/wishlists_data.json")
  )
  const wishlists = JSON.parse(data.toString())
  return wishlists
}

export default async function WishlistsPage() {
  const wishlists = await getWishlists()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Wishlists" text="Manage all wishlists"></DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {wishlists.length > 0 ? (
          <DataTable data={wishlists} columns={wishlistsTableColumns} toolbar={wishlistsTableToolbar} toolbarSearchList={wishlistsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Wishlists</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any wishlists yet.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>)}
      </div>
    </>
  )
}