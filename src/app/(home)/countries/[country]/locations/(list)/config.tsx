"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

const locationsActionList: ActionListProps[] = [
  {
    type: "button",
    label: "View",
    action: (id: string) => {
      window.location.href += "/locations/" + id;
    }
  },
  {
    type: "button",
    label: "Edit",
    action: (id: string) => {
      window.location.href += "/locations/" + id + "/edit";
    }
  },
  {
    type: "button",
    label: "Delete",
    action: (id: string) => {
      console.log('Delete: ' + id)
    }
  }
]

export const locationsTableToolbar: ToolbarProps[] = []

export const locationsTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'isIncludedInApp',
    title: 'Included In App'
  },
]

export interface LocationsProps {
  id: string
  name: string
  isIncludedInApp: string
}

export const locationsTableColumns: ColumnDef<LocationsProps>[] = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: false,
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
  },
  {
    accessorKey: "isIncludedInApp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Included In App" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("isIncludedInApp") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={locationsActionList} />,
  },
]
