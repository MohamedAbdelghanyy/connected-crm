import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import AddCustomer from "@/components/forms/add-customer"
import { Skeleton } from "@/components/ui/skeleton"

function ItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}

export default function CustomersLoading() {
  return (
    <DashboardShell className="mb-1">
      <DashboardHeader heading="Customers" text="Manage your customers">
        <AddCustomer />
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
