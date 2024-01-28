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
      <DashboardLayout>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Categories" text="Manage your categories">
            <Link to="/categories/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Category</Link>
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
              <Link to="/categories/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Category</Link>
            </EmptyPlaceholder>)}
        </div>
      </DashboardLayout>
      : <CategoriesLoading />
  )
}