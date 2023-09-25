"use client"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import AddMember from "@/components/forms/add-member"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { membersTableColumns, membersTableToolbar, membersTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Members",
}

export default function MembersPage({ selectedUnit, members }: any) {
  const selectedUnitName = selectedUnit == -1 ? "Select a Unit" : selectedUnit.name;
  return (
    selectedUnit != -1 ?
      (<>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={String(selectedUnitName)}>
            <AddMember users={members} />
          </DashboardHeader>
        </DashboardShell>
        <div className="m-2">
          {members && members.length > 0 ? (
            <DataTable data={members} columns={membersTableColumns} toolbar={membersTableToolbar} toolbarSearchList={membersTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Members</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any members yet.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>)}
        </div>
      </>) : (
        <p className="mt-6">Select an organization unit to see members</p>
      )
  )
}