import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import Grid from '@mui/material/Grid'
import { DownloadIcon, PlusIcon, ThumbsUpIcon } from "lucide-react"
import { MarketingDashboardApplicationChart } from "./components/charts/marketing-dashboard-application-chart"
import { MarketingDashboardMainChart } from "./components/charts/marketing-dashboard-main-chart"
import { MarketingDashboardRequestsChart } from "./components/charts/marketing-dashboard-requests-chart"
import { MarketingDashboardUsersChart } from "./components/charts/marketing-dashboard-users-chart"
import { Top10ContactOwner } from "./top-10/top-10-contact-owner"
import { Top10Searched } from "./top-10/top-10-searched"
import { Top10Shared } from "./top-10/top-10-shared"
import { Top10Viewed } from "./top-10/top-10-viewed"

export const metadata = {
  title: "Marketing Dashboard",
}

export default function MarketingDashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-4xl mb-1">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Facebook Likes
            </CardTitle>
            <ThumbsUpIcon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(120019).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +2341 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instagram Followers</CardTitle>
            <PlusIcon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(2293384).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +5884 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Installs
            </CardTitle>
            <DownloadIcon width="16" height="16" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(5273).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +106 since yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Users
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(2350).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +230 from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <MarketingDashboardMainChart />
          </Grid>
          <Grid item lg={6} xs={12}>
            <MarketingDashboardRequestsChart />
          </Grid>
          <Grid item lg={6} xs={12}>
            <MarketingDashboardApplicationChart />
          </Grid>
          <Grid item lg={6} xs={12}>
            <MarketingDashboardUsersChart />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Top10Viewed />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Top10Shared />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Top10Searched />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Top10ContactOwner />
          </Grid>
        </Grid>
      </div>
    </>
  )
}