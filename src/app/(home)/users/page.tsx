import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { usersTableColumns, usersTableToolbar, usersTableToolbarSearchList } from "./config"
import AddUser from "@/components/forms/add-user"

export const metadata = {
  title: "Users",
}

async function getUsers() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/users_data.json")
  )
  const users = JSON.parse(data.toString())
  return users
}

export default async function UsersPage() {
  const users = await getUsers()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Users" text="Manage your users">
          <AddUser />
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {users.length > 0 ? (
            <DataTable data={users} columns={usersTableColumns} toolbar={usersTableToolbar} toolbarSearchList={usersTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Users</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any user yet.
            </EmptyPlaceholder.Description>
            <AddUser variant="outline" />
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}