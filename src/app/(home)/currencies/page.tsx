import { promises as fs } from "fs"
import path from "path"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { currenciesTableColumns, currenciesTableToolbar, currenciesTableToolbarSearchList } from "./config"

export const metadata = {
  title: "Currencies",
}

async function getCurrencies() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/currencies_data.json")
  )
  const currencies = JSON.parse(data.toString())
  return currencies
}

export default async function CurrenciesPage() {
  const currencies = await getCurrencies()
  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Currencies" text="Manage your currencies">
          <Link href="/currencies/add" className={cn(buttonVariants({  }))}><Icons.add className="mr-2 h-4 w-4" />Add Currency</Link>
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2">
          {currencies.length > 0 ? (
            <DataTable data={currencies} columns={currenciesTableColumns} toolbar={currenciesTableToolbar} toolbarSearchList={currenciesTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Currencies</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any currencies yet.
            </EmptyPlaceholder.Description>
            <Link href="/currencies/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Currency</Link>
          </EmptyPlaceholder>)}
      </div>
    </>
  )
}