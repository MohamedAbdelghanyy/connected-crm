import DashboardLayout from "@/components/layouts/dashboard-layout"
import { DashboardHeader } from "@/components/other/header"
import { DashboardShell } from "@/components/other/shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Grid } from "@mui/material"

function ItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-4" />
      </div>
    </div>
  )
}

export default function UnitsLoading() {
  return (
    <DashboardLayout>
      <DashboardShell>
        <DashboardHeader heading="Organization Units" text="Manage your organization units"></DashboardHeader>
        <Grid container spacing={2}>
          <Grid item md={5} sm={12}>
            <div className="divide-border-200 divide-y rounded-md border">
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
            </div>
          </Grid>
          <Grid item md={7} sm={12}>
            <div className="divide-border-200 divide-y rounded-md border">
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
            </div>
          </Grid>
        </Grid>
      </DashboardShell>
    </DashboardLayout>
  )
}
