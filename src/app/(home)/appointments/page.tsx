import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { appointmentsTableColumns, appointmentsTableToolbar, appointmentsTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Appointments",
}

async function getAppointments() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/appointments_data.json")
  )
  const appointments = JSON.parse(data.toString())
  return appointments
}

export default async function AppointmentsPage() {
  const appointments = await getAppointments()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Appointments" text="Manage all appointments">
          <Link href="/appointments/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Appointment</Link>
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
          <Link href="/appointments/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Appointment</Link>
        </EmptyPlaceholder>)}
      </div>
    </>
  )
}