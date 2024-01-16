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
      <>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Tags" text="Manage your tags">
            <Link href="/tags/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Tag</Link>
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
            <Link href="/tags/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Tag</Link>
          </EmptyPlaceholder>)}
        </div>
      </>
      : <TagsLoading />
  )
}