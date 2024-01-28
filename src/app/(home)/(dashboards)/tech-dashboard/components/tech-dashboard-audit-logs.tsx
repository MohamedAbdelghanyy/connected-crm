import { auditLogsTableColumns, auditLogsTableToolbar, auditLogsTableToolbarSearchList } from "@/app/(home)/audit-logs/config";
import { EmptyPlaceholder } from "@/components/other/empty-placeholder";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const auditLogs = [
  {
    "id": "ALOG-123",
    "request": "200 POST /connect/token",
    "user": "admin",
    "ipAddress": "156.204.223.254",
    "date": "2/11/2023 5:30 PM",
    "duration": "34"
  },
  {
    "id": "ALOG-456",
    "request": "200 POST /connect/token",
    "user": "admin",
    "ipAddress": "25.124.199.12",
    "date": "2/11/2023 9:10 PM",
    "duration": "121"
  },
]

export function TechDashboardAuditLogs() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-md font-medium">{"Today's Audit Logs"}</CardTitle>
      </CardHeader>
      <CardContent>
        {auditLogs.length > 0 ? (
          <DataTable data={auditLogs} columns={auditLogsTableColumns} toolbar={auditLogsTableToolbar} toolbarSearchList={auditLogsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Audit Logs Today</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any audit logs today.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>)
        }
      </CardContent>
    </Card>
  );
}
