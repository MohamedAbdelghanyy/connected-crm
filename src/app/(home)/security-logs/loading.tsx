import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Skeleton } from "@/components/ui/skeleton"

function ItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-4" />
      </div>
    </div>
  )
}

export default function SecurityLogsLoading() {
  return (
    <DashboardShell className="mb-1">
      <DashboardHeader heading="Security Logs" text="Manage your security logs"></DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </div>
    </DashboardShell>
  )
}
