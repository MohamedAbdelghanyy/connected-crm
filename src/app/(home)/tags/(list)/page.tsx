import DashboardLayout from "@/components/layouts/dashboard-layout"
import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { errorHandler } from "@/components/other/error-handler"
import { DashboardHeader } from "@/components/other/header"
import { Icons } from "@/components/other/icons"
import { DashboardShell } from "@/components/other/shell"
import { DynamicDataTable } from "@/components/table/dynamic-data-table"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import axios from "@/services/axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { tagsTableColumns, tagsTableToolbar, tagsTableToolbarSearchList } from "./config"
import TagsLoading from "./loading"

export default function TagsPage() {
  const [tags, setTags] = useState<Array<any> | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    axios.get('/app/tag', {
      params: {
        SkipCount: (currentPageNumber - 1) * numberOfItemsPerPage,
        MaxResultCount: numberOfItemsPerPage
      },
    })
      .then(function (response) {
        setNumberOfPages(Math.ceil(response.data.result.totalCount / numberOfItemsPerPage));
        setTags(response.data.result.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [currentPageNumber, numberOfItemsPerPage]);

  return (
    tags ?
      <DashboardLayout>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Tags" text="Manage your tags">
            <Link to="/tags/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Tag</Link>
          </DashboardHeader>
        </DashboardShell>
        <div className="m-2">
          {tags.length > 0 ? (
            <DynamicDataTable
              data={tags}
              columns={tagsTableColumns}
              toolbar={tagsTableToolbar}
              toolbarSearchList={tagsTableToolbarSearchList}
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
            <EmptyPlaceholder.Title>No Tags</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any tags yet.
            </EmptyPlaceholder.Description>
            <Link to="/tags/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Tag</Link>
          </EmptyPlaceholder>)}
        </div>
      </DashboardLayout>
      : <TagsLoading />
  )
}