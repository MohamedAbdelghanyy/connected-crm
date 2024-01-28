import DashboardLayout from "@/components/layouts/dashboard-layout"
import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { DashboardHeader } from "@/components/other/header"
import { DashboardShell } from "@/components/other/shell"
import { DataTable } from "@/components/table/data-table"
import { useEffect, useState } from "react"
import { securityLogsTableColumns, securityLogsTableToolbar, securityLogsTableToolbarSearchList } from "./config"

export default function SecurityLogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs([]);
  }, []);

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  )
}