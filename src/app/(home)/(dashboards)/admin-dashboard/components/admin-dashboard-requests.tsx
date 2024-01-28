import { requestsTableColumns, requestsTableToolbar, requestsTableToolbarSearchList } from "@/app/(home)/requests/config";
import { EmptyPlaceholder } from "@/components/other/empty-placeholder";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const requests = [
  {
    "id": "RQ-456",
    "requestorID": "USR-456",
    "requestorName": "Test Test",
    "requestorMobile": "+201115696965",
    "itemName": "Rolex",
    "appointment": "17/10/2023 12:10:00 PM",
    "createdBy": "Customer",
    "creationDate": "12/10/2023 09:10:00 AM",
    "notes": "None",
    "status": "scheduled"
  },
]

export function AdminDashboardRequests() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-md font-medium">{"Today's Requests"}</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length > 0 ? (
          <DataTable data={requests} columns={requestsTableColumns} toolbar={requestsTableToolbar} toolbarSearchList={requestsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Requests Today</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any requests today.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>)
        }
      </CardContent>
    </Card>
  );
}
