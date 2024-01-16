'use client'

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { DynamicDataTable } from "@/components/table/dynamic-data-table"
import { buttonVariants } from "@/components/ui/button"
import { errorHandler } from "@/components/ui/custom/error-handler"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import axios from "@/services/axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usersTableColumns, usersTableToolbar, usersTableToolbarSearchList } from "./config"
import UsersLoading from "./loading"

export default function UsersPage() {
  const [users, setUsers] = useState<Array<any> | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    axios.get('/identity/users', {
      params: {
        SkipCount: (currentPageNumber - 1) * numberOfItemsPerPage,
        MaxResultCount: numberOfItemsPerPage
      },
    })
      .then(function (response) {
        setNumberOfPages(Math.ceil(response.data.totalCount / numberOfItemsPerPage));
        setUsers(response.data.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [currentPageNumber, numberOfItemsPerPage]);

  return (
    users ?
      <>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Users" text="Manage your users">
            <Link href="/users/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add User</Link>
          </DashboardHeader>
        </DashboardShell>
        <div className="m-2">
          {users.length > 0 ? (
            <DynamicDataTable
              data={users}
              columns={usersTableColumns}
              toolbar={usersTableToolbar}
              toolbarSearchList={usersTableToolbarSearchList}
              pagination={{
                numberOfItemsPerPage,
                currentPageNumber,
                numberOfPages,
                setNumberOfItemsPerPage,
                setCurrentPageNumber,
              }}
            />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Users</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any user yet.
            </EmptyPlaceholder.Description>
            <Link href="/users/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add User</Link>
          </EmptyPlaceholder>)}
        </div>
      </>
      : <UsersLoading />
  )
}