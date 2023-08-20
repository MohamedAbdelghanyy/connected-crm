"use client"

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Box, LucideIcon, XCircleIcon } from "lucide-react"
import { FilterInput } from "../filter-input"

import Grid from '@mui/material/Grid';

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  toolbar: ToolbarProps[]
  toolbarSearchList: ToolbarSearchListProps[]
}

export interface ToolbarSearchListProps {
  key: string
  title: string
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
  toolbarSearchList
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  let searchInputGridSize = 11;
  if(toolbar.length > 2){
    searchInputGridSize = 8;
  }else if(toolbar.length > 1){
    searchInputGridSize = 9;
  }else if(toolbar.length > 0){
    searchInputGridSize = 10;
  }

  if(isFiltered){
    searchInputGridSize-= 2;
  }

  return (
    <div className="flex items-center justify-between">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={searchInputGridSize} lg={searchInputGridSize}>
          <FilterInput
            toolbarSearchList={toolbarSearchList}
            table={table}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12-searchInputGridSize} lg={12-searchInputGridSize}>
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
              onClick={() => {table.resetColumnFilters(); searchInputGridSize++;}}
              className="h-10 px-2 lg:px-3"
            >
              Reset
              <XCircleIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </Grid>
      </Grid>
      <DataTableViewOptions table={table} />
    </div>
  )
}
