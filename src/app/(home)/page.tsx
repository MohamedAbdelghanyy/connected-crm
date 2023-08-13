import { redirect } from "next/navigation"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/buttons/post-create-button"
import { DashboardShell } from "@/components/shell"
import { CustomerAddButton } from "@/components/buttons/customer-add-button"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Customers" text="Manage your customers">
        <CustomerAddButton />
      </DashboardHeader>
      <div>
          {/*<div className="divide-y divide-border rounded-md border">
            <PostItem key={123} post={{title: "This is post sample", id: 1, createdAt: "", published: ""}} />
          </div>*/}
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Customers</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any customer yet.
            </EmptyPlaceholder.Description>
            <CustomerAddButton variant="outline" />
          </EmptyPlaceholder>
      </div>
    </DashboardShell>
  )
}