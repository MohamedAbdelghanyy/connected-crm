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
import { currenciesTableColumns, currenciesTableToolbar, currenciesTableToolbarSearchList } from "./config"
import CurrenciesLoading from "./loading"

export default function CurrenciesPage() {
  const [currencies, setCurrencies] = useState<Array<any> | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    axios.get('/app/currency', {
      params: {
        SkipCount: (currentPageNumber - 1) * numberOfItemsPerPage,
        MaxResultCount: numberOfItemsPerPage
      },
    })
      .then(function (response) {
        setNumberOfPages(Math.ceil(response.data.result.totalCount / numberOfItemsPerPage));
        setCurrencies(response.data.result.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [currentPageNumber, numberOfItemsPerPage]);

  return (
    currencies ?
      <DashboardLayout>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Currencies" text="Manage your currencies">
            <Link to="/currencies/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Currency</Link>
          </DashboardHeader>
        </DashboardShell>
        <div className="m-2">
          {currencies.length > 0 ? (
            <DynamicDataTable
              data={currencies}
              columns={currenciesTableColumns}
              toolbar={currenciesTableToolbar}
              toolbarSearchList={currenciesTableToolbarSearchList}
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
            <EmptyPlaceholder.Title>No Currencies</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any currencies yet.
            </EmptyPlaceholder.Description>
            <Link to="/currencies/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Currency</Link>
          </EmptyPlaceholder>)}
        </div>
      </DashboardLayout>
      : <CurrenciesLoading />
  )
}