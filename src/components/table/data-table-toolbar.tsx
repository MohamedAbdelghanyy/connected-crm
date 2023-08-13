"use client"

import { Table } from "@tanstack/react-table"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { LucideIcon, XCircleIcon } from "lucide-react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  toolbar: ToolbarProps[]
}

export interface ToolbarProps {
  key: string
  title: string
  options: { 
    value: string 
    label: string
    icon?: LucideIcon
  }[];
}

export function DataTableToolbar<TData>({
  table,
  toolbar,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {toolbar.map((toolbarItem) => {
          table.getColumn(toolbarItem.key);
          return  (
            <DataTableFacetedFilter
              key={toolbarItem.key}
              column={table.getColumn(toolbarItem.key)}
              title={toolbarItem.title}
              options={toolbarItem.options}
            />
          )
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XCircleIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
