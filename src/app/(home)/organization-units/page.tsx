import { promises as fs } from "fs"
import path from "path"

import { DashboardHeader } from "@/components/header"
import UnitsPageMain from "@/components/organization-units/units-page-main"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Organization Units",
}

async function getUnits() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/units_data.json")
  )
  const units = JSON.parse(data.toString())
  return units
}

async function getMembers() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/users_data.json")
  )
  const members = JSON.parse(data.toString())
  return members
}

async function getRoles() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/roles_data.json")
  )
  const roles = JSON.parse(data.toString())
  return roles
}

export default async function UnitsPage() {
  const units = await getUnits()
  const members = await getMembers()
  const roles = await getRoles()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Organization Units" text="Manage your organization units"></DashboardHeader>
      </DashboardShell>
      <UnitsPageMain units={units} members={members} roles={roles} />
    </>
  )
}