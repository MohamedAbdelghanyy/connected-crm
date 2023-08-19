import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import AddCustomer from "@/components/forms/add-customer"
import { Skeleton } from "@/components/ui/skeleton"
import AddHighlight from "@/components/forms/add-highlight"

function ItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-4" />
      </div>
    </div>
  )
}

export default function HighlightsLoading() {
  return (
    <DashboardShell className="mb-1">
      <DashboardHeader heading="Highlights" text="Manage your highlights">
        <AddHighlight />
      </DashboardHeader>
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
