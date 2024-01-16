import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Grid from '@mui/material/Grid';
import { ArrowLeftIcon, ArrowLeftToLineIcon, ArrowRightIcon, ArrowRightToLineIcon } from "lucide-react";

interface DataTableDynamicPaginationProps<TData> {
  table: Table<TData>
  pagination: {
    numberOfItemsPerPage: number
    currentPageNumber: number
    numberOfPages: number
    setNumberOfItemsPerPage: Function
    setCurrentPageNumber: Function
  }
}

export function DataTableDynamicPagination<TData>({
  table,
  pagination
}: DataTableDynamicPaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${pagination.numberOfItemsPerPage}`}
                onValueChange={(value) => {
                  pagination.setNumberOfItemsPerPage(value);
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pagination.numberOfItemsPerPage} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <div className="flex items-center space-x-6 lg:space-x-8" style={{ float: "right" }}>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {pagination.currentPageNumber} of{" "}
              {pagination.numberOfPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => pagination.setCurrentPageNumber(1)}
                disabled={pagination.currentPageNumber == 1}
              >
                <span className="sr-only">Go to first page</span>
                <ArrowLeftToLineIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => pagination.setCurrentPageNumber(pagination.currentPageNumber - 1)}
                disabled={pagination.currentPageNumber == 1}
              >
                <span className="sr-only">Go to previous page</span>
                <ArrowLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => pagination.setCurrentPageNumber(pagination.currentPageNumber + 1)}
                disabled={pagination.currentPageNumber == pagination.numberOfPages}
              >
                <span className="sr-only">Go to next page</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => pagination.setCurrentPageNumber(pagination.numberOfPages)}
                disabled={pagination.currentPageNumber == pagination.numberOfPages}
              >
                <span className="sr-only">Go to last page</span>
                <ArrowRightToLineIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
