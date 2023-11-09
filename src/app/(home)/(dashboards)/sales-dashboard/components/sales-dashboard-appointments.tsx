import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appointmentsTableColumns, appointmentsTableToolbar, appointmentsTableToolbarSearchList } from "../../../appointments/config";

const appointments = [
  {
    "id": "APP-123",
    "customerID": "USR-123",
    "customerName": "Mohamed Abdelghany",
    "assignedToID": "USR-789",
    "assignedTo": "Khaled Afify",
    "itemID": "ITM-1",
    "item": "BMW X7",
    "slot": "3:00 PM - 6:00 PM",
    "date": "18/10/2022",
    "status": "scheduled"
  },
]

export function SalesDashboardAppointments() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-md font-medium">Today's Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length > 0 ? (
          <DataTable data={appointments} columns={appointmentsTableColumns} toolbar={appointmentsTableToolbar} toolbarSearchList={appointmentsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Appointments Today</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any appointments today.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>)
        }
      </CardContent>
    </Card>
  );
}
