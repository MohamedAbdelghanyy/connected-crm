import DashboardLayout from "@/components/layouts/dashboard-layout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import Grid from '@mui/material/Grid'
import { BoxIcon, BoxesIcon, DollarSignIcon, FileBox } from "lucide-react"
import { SalesDashboardItemsChart } from "./components/charts/sales-dashboard-items-chart"
import { SalesDashboardMainChart } from "./components/charts/sales-dashboard-main-chart"
import { SalesDashboardRequestsChart } from "./components/charts/sales-dashboard-requests-chart"
import { SalesDashboardTargetChart } from "./components/charts/sales-dashboard-target-chart"
import { SalesDashboardAppointments } from "./components/sales-dashboard-appointments"
import { SalesDashboardCalls } from "./components/sales-dashboard-calls"

export default function SalesDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-4xl mb-1">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Items
            </CardTitle>
            <BoxIcon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(4493).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +71 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Requests</CardTitle>
            <FileBox width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(2273).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +127 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sold Items
            </CardTitle>
            <DollarSignIcon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(9238).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +106 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Items
            </CardTitle>
            <BoxesIcon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(182736).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +4493 from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <SalesDashboardMainChart />
          </Grid>
          <Grid item lg={6} xs={12}>
            <SalesDashboardTargetChart />
          </Grid>
          <Grid item lg={6} xs={12}>
            <SalesDashboardItemsChart />
          </Grid>
          <Grid item lg={6} xs={12}>
            <SalesDashboardRequestsChart />
          </Grid>
          <Grid item lg={12} xs={12}>
            <SalesDashboardAppointments />
          </Grid>
          <Grid item lg={12} xs={12}>
            <SalesDashboardCalls />
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  )
}