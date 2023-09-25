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
import { rolesTableColumns, rolesTableToolbar, rolesTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Roles",
}

async function getRoles() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/roles_data.json")
  )
  const roles = JSON.parse(data.toString())
  return roles
}

export default async function RolesPage() {
  const roles = await getRoles()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Roles" text="Manage your roles">
          <Link href="/roles/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Role</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {roles.length > 0 ? (
          <DataTable data={roles} columns={rolesTableColumns} toolbar={rolesTableToolbar} toolbarSearchList={rolesTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Roles</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any roles yet.
          </EmptyPlaceholder.Description>
          <Link href="/roles/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Role</Link>
        </EmptyPlaceholder>)}
      </div>
    </>
  )
}