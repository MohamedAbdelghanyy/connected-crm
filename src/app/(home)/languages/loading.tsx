import DashboardLayout from "@/components/layouts/dashboard-layout"
import { DashboardHeader } from "@/components/other/header"
import { Icons } from "@/components/other/icons"
import { DashboardShell } from "@/components/other/shell"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

function ItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-4" />
      </div>
    </div>
  )
}

export default function LanguagesLoading() {
  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Languages" text="Manage your languages">
          <Link to="/languages/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Languages</Link>
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
    </DashboardLayout>
  )
}
