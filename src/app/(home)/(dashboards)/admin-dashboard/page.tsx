import DashboardLayout from "@/components/layouts/dashboard-layout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import Grid from '@mui/material/Grid'
import { CalendarClock, FileBoxIcon, ListIcon, PhoneIcon } from "lucide-react"
import { AdminDashboardCalls } from "./components/admin-dashboard-calls"
import { AdminDashboardRequests } from "./components/admin-dashboard-requests"
import { AdminDashboardItemsChart } from "./components/charts/admin-dashboard-items-chart"
import { AdminDashboardUsersChart } from "./components/charts/admin-dashboard-users-chart"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-4xl mb-1">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Waiting List
            </CardTitle>
            <ListIcon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(9961).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +43 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Requests
            </CardTitle>
            <FileBoxIcon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(1283).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +11 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <CalendarClock width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(112).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +9 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Calls
            </CardTitle>
            <PhoneIcon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(226).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +2121 since last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <AdminDashboardUsersChart />
          </Grid>
          <Grid item lg={6} xs={12}>
            <AdminDashboardItemsChart />
          </Grid>
          <Grid item lg={12} xs={12}>
            <AdminDashboardRequests />
          </Grid>
          <Grid item lg={12} xs={12}>
            <AdminDashboardCalls />
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  )
}