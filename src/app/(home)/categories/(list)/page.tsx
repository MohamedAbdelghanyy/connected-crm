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
import { categoriesTableColumns, categoriesTableToolbar, categoriesTableToolbarSearchList } from "./config"
import CategoriesLoading from "./loading"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Array<any> | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    axios.get('/app/category', {
      params: {
        SkipCount: (currentPageNumber - 1) * numberOfItemsPerPage,
        MaxResultCount: numberOfItemsPerPage
      },
    })
      .then(function (response) {
        setNumberOfPages(Math.ceil(response.data.result.totalCount / numberOfItemsPerPage));
        setCategories(response.data.result.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [currentPageNumber, numberOfItemsPerPage]);

  return (
    categories ?
      <>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Categories" text="Manage your categories">
            <Link href="/categories/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Category</Link>
          </DashboardHeader>
        </DashboardShell>
        <div className="m-2">
          {categories.length > 0 ?
            (
              <DynamicDataTable
                data={categories}
                columns={categoriesTableColumns}
                toolbar={categoriesTableToolbar}
                toolbarSearchList={categoriesTableToolbarSearchList}
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
              <EmptyPlaceholder.Title>No Categories</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any categories yet.
              </EmptyPlaceholder.Description>
              <Link href="/categories/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Category</Link>
            </EmptyPlaceholder>)}
        </div>
      </>
      : <CategoriesLoading />
  )
}