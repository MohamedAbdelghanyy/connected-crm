import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { callsTableColumns, callsTableToolbar, callsTableToolbarSearchList } from "../../../calls/config";

const calls = [
  {
    "id": "CALL-123",
    "customerID": "USR-123",
    "customerName": "Mohamed Abdelghany",
    "assignedToID": "USR-789",
    "assignedTo": "Khaled Afify",
    "itemID": "ITM-1",
    "itemName": "BMW",
    "notes": "Customer was very satisfied",
    "status": "done",
    "callDate": "18/10/2022 12:10 PM"
  },
]

export function SalesDashboardCalls() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-md font-medium">{"Today's Calls"}</CardTitle>
      </CardHeader>
      <CardContent>
        {calls.length > 0 ? (
          <DataTable data={calls} columns={callsTableColumns} toolbar={callsTableToolbar} toolbarSearchList={callsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Calls Today</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any calls today.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>)
        }
      </CardContent>
    </Card>
  );
}
