import { securityLogsTableColumns, securityLogsTableToolbar, securityLogsTableToolbarSearchList } from "@/app/(home)/security-logs/config";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const securityLogs = [
  {
    "id": "ROL-123",
    "date": "9/21/2023 2:23 PM",
    "action": "LoginSucceeded",
    "ipAddress": "156.204.223.254",
    "browser": "Chrome",
    "identity": "Identity",
    "fullName": "Mohamed Abdelghany"
  },
  {
    "id": "ROL-123",
    "date": "2/11/2023 5:30 PM",
    "action": "ErrorLoggingIn",
    "ipAddress": "129.291.11.34",
    "browser": "Microsoft Edge",
    "identity": "Identity",
    "fullName": "Khaled Afify"
  },
]

export function TechDashboardSecurityLogs() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-md font-medium">Today's Security Logs</CardTitle>
      </CardHeader>
      <CardContent>
        {securityLogs.length > 0 ? (
          <DataTable data={securityLogs} columns={securityLogsTableColumns} toolbar={securityLogsTableToolbar} toolbarSearchList={securityLogsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Security Logs Today</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any security logs today.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>)
        }
      </CardContent>
    </Card>
  );
}
