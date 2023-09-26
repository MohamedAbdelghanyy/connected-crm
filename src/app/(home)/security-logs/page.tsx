import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { securityLogsTableColumns, securityLogsTableToolbar, securityLogsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Security Logs",
}

async function getSecurityLogs() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/security_logs_data.json")
  )
  const logs = JSON.parse(data.toString())
  return logs
}

export default async function SecurityLogsPage() {
  const logs = await getSecurityLogs()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Security Logs" text="Manage security logs"></DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {logs.length > 0 ? (
            <DataTable data={logs} columns={securityLogsTableColumns} toolbar={securityLogsTableToolbar} toolbarSearchList={securityLogsTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Logs</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any logs yet.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}