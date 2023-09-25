"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const rolesWidgetTableToolbar: ToolbarProps[] = []

export const rolesWidgetTableToolbarSearchList: ToolbarSearchListProps[] = []

interface RolesWidgetProps {
  id: string
  name: string
}

export const rolesWidgetTableColumns: ColumnDef<RolesWidgetProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <Link href="#" className={cn(buttonVariants({}))}>Delete</Link>
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      )
    },
  }
]
