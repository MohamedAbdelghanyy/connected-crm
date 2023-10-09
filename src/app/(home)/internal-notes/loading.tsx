import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import Link from "next/link"

function ItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-4" />
      </div>
    </div>
  )
}

export default function InternalNotesLoading() {
  return (
    <DashboardShell className="mb-1">
      <DashboardHeader heading="Internal Notes" text="Manage all notes">
        <Link
          href="/internal-notes/add"
          className={cn(buttonVariants({}))}
          legacyBehavior><div><Icons.add className="mr-2 h-4 w-4" />Add Note</div></Link>
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
  );
}
