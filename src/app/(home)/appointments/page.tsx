import DashboardLayout from "@/components/layouts/dashboard-layout"
import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { DashboardHeader } from "@/components/other/header"
import { Icons } from "@/components/other/icons"
import { DashboardShell } from "@/components/other/shell"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { appointmentsTableColumns, appointmentsTableToolbar, appointmentsTableToolbarSearchList } from "./config"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Appointments" text="Manage all appointments">
          <Link to="/appointments/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Appointment</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
        {appointments.length > 0 ? (
          <DataTable data={appointments} columns={appointmentsTableColumns} toolbar={appointmentsTableToolbar} toolbarSearchList={appointmentsTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Appointments</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any appointments yet.
          </EmptyPlaceholder.Description>
          <Link to="/appointments/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Appointment</Link>
        </EmptyPlaceholder>)}
      </div>
    </DashboardLayout>
  )
}