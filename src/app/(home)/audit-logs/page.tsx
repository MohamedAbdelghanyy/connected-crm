import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { auditLogsTableColumns, auditLogsTableToolbar, auditLogsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Audit Logs",
}

async function getAuditLogs() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/audit_logs_data.json")
  )
  const logs = JSON.parse(data.toString())
  return logs
}

export default async function AuditLogsPage() {
  const logs = await getAuditLogs()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Audit Logs" text="Manage audit logs"></DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {logs.length > 0 ? (
          <DataTable data={logs} columns={auditLogsTableColumns} toolbar={auditLogsTableToolbar} toolbarSearchList={auditLogsTableToolbarSearchList} />
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