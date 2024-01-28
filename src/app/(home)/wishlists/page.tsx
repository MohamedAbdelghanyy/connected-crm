import DashboardLayout from "@/components/layouts/dashboard-layout"
import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { DashboardHeader } from "@/components/other/header"
import { DashboardShell } from "@/components/other/shell"
import { DataTable } from "@/components/table/data-table"
import { useEffect, useState } from "react"
import { wishlistsTableColumns, wishlistsTableToolbar, wishlistsTableToolbarSearchList } from "./config"

export default function WishlistsPage() {
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    setWishlists([]);
  }, []);

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  )
}