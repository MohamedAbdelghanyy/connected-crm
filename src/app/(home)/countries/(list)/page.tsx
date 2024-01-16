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
import { countriesTableColumns, countriesTableToolbar, countriesTableToolbarSearchList } from "./config"
import CountriesLoading from "./loading"

export default function CountriesPage() {
  const [countries, setCountries] = useState<Array<any> | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    axios.get('/app/country', {
      params: {
        SkipCount: (currentPageNumber - 1) * numberOfItemsPerPage,
        MaxResultCount: numberOfItemsPerPage
      },
    })
      .then(function (response) {
        setNumberOfPages(Math.ceil(response.data.result.totalCount / numberOfItemsPerPage));
        setCountries(response.data.result.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [currentPageNumber, numberOfItemsPerPage]);

  return (
    countries ?
      <>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Countries" text="Manage your countries">
            <Link href="/countries/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Country</Link>
          </DashboardHeader>
        </DashboardShell>
        <div className="m-2">
          {countries.length > 0 ? (
            <DynamicDataTable
              data={countries}
              columns={countriesTableColumns}
              toolbar={countriesTableToolbar}
              toolbarSearchList={countriesTableToolbarSearchList}
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
            <EmptyPlaceholder.Title>No Countries</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any countries yet.
            </EmptyPlaceholder.Description>
            <Link href="/countries/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Country</Link>
          </EmptyPlaceholder>)}
        </div>
      </>
      : <CountriesLoading />
  )
}