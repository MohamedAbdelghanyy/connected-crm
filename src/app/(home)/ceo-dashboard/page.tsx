import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent
} from "@/components/ui/tabs"
import Grid from '@mui/material/Grid'
import { DashboardCharts } from "./components/charts/dashboard-charts"
import { Top10ContactOwner } from "./components/top-10/top-10-contact-owner"
import { Top10Searched } from "./components/top-10/top-10-searched"
import { Top10Shared } from "./components/top-10/top-10-shared"
import { Top10Viewed } from "./components/top-10/top-10-viewed"

export const metadata = {
  title: "Dashboard",
}

export default function CEODashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-4xl mb-1">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4 mt-2">
        {/*<Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={5} lg={4}>
            <TabsList style={{ width: "100%", justifyContent: "space-between" }}>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
            </TabsList>
          </Grid>
          <Grid item xs={0} sm={0} md={2} lg={3}></Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <div className="flex items-center space-x-2" style={{ float: "right" }}>
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </Grid>
        </Grid>*/}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Installs
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
                <div className="text-2xl font-bold">12529</div>
                <p className="text-xs text-muted-foreground">
                  +1871 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
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
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">40%</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
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
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5273</div>
                <p className="text-xs text-muted-foreground">
                  +106 since yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Un-installs
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
                <div className="text-2xl font-bold">2350</div>
                <p className="text-xs text-muted-foreground">
                  +230 from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div //className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          >
            <Card className="col-span-4 mb-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <DashboardCharts />
              </CardContent>
            </Card>
            <Grid container spacing={2}>
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
        </TabsContent>
      </Tabs>
    </>
  )
}