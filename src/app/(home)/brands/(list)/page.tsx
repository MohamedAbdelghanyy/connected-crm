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
import { brandsTableColumns, brandsTableToolbar, brandsTableToolbarSearchList } from "./config"
import BrandsLoading from "./loading"

export default function BrandsPage() {
  const [brands, setBrands] = useState<Array<any> | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    axios.get('/app/brands', {
      params: {
        SkipCount: (currentPageNumber - 1) * numberOfItemsPerPage,
        MaxResultCount: numberOfItemsPerPage
      },
    })
      .then(function (response) {
        setNumberOfPages(Math.ceil(response.data.result.totalCount / numberOfItemsPerPage));
        setBrands(response.data.result.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [currentPageNumber, numberOfItemsPerPage]);

  return (
    brands ?
      <DashboardLayout>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Brands" text="Manage your brands">
            <Link to="/brands/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Brand</Link>
          </DashboardHeader>
        </DashboardShell>
        <div className="m-2">
          {brands.length > 0 ? (
            <DynamicDataTable
              data={brands}
              columns={brandsTableColumns}
              toolbar={brandsTableToolbar}
              toolbarSearchList={brandsTableToolbarSearchList}
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
            <EmptyPlaceholder.Title>No Brands</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any brands yet.
            </EmptyPlaceholder.Description>
            <Link to="/brands/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Brand</Link>
          </EmptyPlaceholder>)}
        </div>
      </DashboardLayout>
      : <BrandsLoading />
  )
}