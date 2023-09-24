import { promises as fs } from "fs"
import path from "path"

import { DashboardHeader } from "@/components/header"
import OrganizationData from "@/components/organization-data"
import OrganizationTree from "@/components/organization-tree"
import { DashboardShell } from "@/components/shell"
import { Grid } from "@mui/material"

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

export default async function unitsPage() {
  const units = await getUnits()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Organization Units" text="Manage your organization units"></DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        <Grid container spacing={2}>
          <Grid item md={5} sm={12}>
            <OrganizationTree units={units} />
          </Grid>
          <Grid item md={7} sm={12}>
            <OrganizationData />
          </Grid>
        </Grid>
      </div>
    </>
  )
}