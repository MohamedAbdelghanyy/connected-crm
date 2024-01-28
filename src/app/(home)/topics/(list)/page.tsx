import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { DashboardHeader } from "@/components/other/header"
import { Icons } from "@/components/other/icons"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { DashboardShell } from "@/components/other/shell"
import { DynamicDataTable } from "@/components/table/dynamic-data-table"
import { buttonVariants } from "@/components/ui/button"
import { errorHandler } from "@/components/other/error-handler"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import axios from "@/services/axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { topicsTableColumns, topicsTableToolbar, topicsTableToolbarSearchList } from "./config"
import TopicsLoading from "./loading"

export default function TopicsPage() {
  const [topics, setTopics] = useState<Array<any> | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    axios.get('/app/topic', {
      params: {
        SkipCount: (currentPageNumber - 1) * numberOfItemsPerPage,
        MaxResultCount: numberOfItemsPerPage
      },
    })
      .then(function (response) {
        setNumberOfPages(Math.ceil(response.data.result.totalCount / numberOfItemsPerPage));
        setTopics(response.data.result.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [currentPageNumber, numberOfItemsPerPage]);

  return (
    topics ?
      <DashboardLayout>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Topics" text="Manage your topics">
            <Link to="/topics/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Topic</Link>
          </DashboardHeader>
        </DashboardShell>
        <div className="m-2">
          {topics.length > 0 ? (
            <DynamicDataTable
              data={topics}
              columns={topicsTableColumns}
              toolbar={topicsTableToolbar}
              toolbarSearchList={topicsTableToolbarSearchList}
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
            <EmptyPlaceholder.Title>No Topics</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any topics yet.
            </EmptyPlaceholder.Description>
            <Link to="/topics/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Topic</Link>
          </EmptyPlaceholder>)}
        </div>
      </DashboardLayout>
      : <TopicsLoading />
  )
}