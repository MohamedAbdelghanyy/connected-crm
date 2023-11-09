import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import Grid from '@mui/material/Grid'
import { CircleSlash2Icon, DatabaseIcon, GitPullRequestDraftIcon, ServerCrashIcon } from "lucide-react"
import { TechDashboardMainChart } from "./components/charts/tech-dashboard-main-chart"
import { TechDashboardPlatformChart } from "./components/charts/tech-dashboard-platform-chart"
import { TechDashboardStorageChart } from "./components/charts/tech-dashboard-storage-chart"
import { TechDashboardAuditLogs } from "./components/tech-dashboard-audit-logs"
import { TechDashboardSecurityLogs } from "./components/tech-dashboard-security-logs"

export const metadata = {
  title: "Dashboard",
}

export default function TechDashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-4xl mb-1">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              API Requests
            </CardTitle>
            <GitPullRequestDraftIcon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(1238819).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +191 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downtime (minutes)</CardTitle>
            <CircleSlash2Icon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(19).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              -12 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Crashes
            </CardTitle>
            <ServerCrashIcon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(102).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +11 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Storage (GB)
            </CardTitle>
            <DatabaseIcon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(1238).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +43 from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <Grid container spacing={2}>
          <Grid item lg={12} xs={12}>
            <TechDashboardMainChart />
          </Grid>
          <Grid item lg={6} xs={12}>
            <TechDashboardStorageChart />
          </Grid>
          <Grid item lg={6} xs={12}>
            <TechDashboardPlatformChart />
          </Grid>
          <Grid item lg={12} xs={12}>
            <TechDashboardAuditLogs />
          </Grid>
          <Grid item lg={12} xs={12}>
            <TechDashboardSecurityLogs />
          </Grid>
        </Grid>
      </div>
    </>
  )
}