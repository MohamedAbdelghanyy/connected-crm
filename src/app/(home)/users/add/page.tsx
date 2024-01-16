import { promises as fs } from "fs"
import path from "path"

import AddUserTabs from "@/app/(home)/users/add/add-user-tabs"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Add User",
}

async function getUnits() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/units_data.json")
  )
  const units = JSON.parse(data.toString())
  return units
}

export default async function AddUserPage() {
  const units = await getUnits()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Add User" text="Enter user's details"></DashboardHeader>
      </DashboardShell>
      <AddUserTabs units={units} />
    </>
  )
}
