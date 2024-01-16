"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

const attributesActionList: ActionListProps[] = [
  {
    type: "button",
    label: "View",
    action: (id: string) => {
      window.location.href += "/attributes/" + id;
    }
  },
  {
    type: "button",
    label: "Edit",
    action: (id: string) => {
      window.location.href += "/attributes/" + id + "/edit";
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

export const attributesTableToolbar: ToolbarProps[] = []

export const attributesTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'isRequired',
    title: 'Required'
  },
  {
    key: 'allowFiltering',
    title: 'Allow Filtering'
  },
  {
    key: 'showOnProductPage',
    title: 'Show On Product Page'
  },
  {
    key: 'displayOrder',
    title: 'Display Order'
  }
]

interface AttributesProps {
  id: string
  name: string
  isRequired: boolean
  allowFiltering: boolean
  showOnProductPage: boolean
  displayOrder: number
}

export const attributesTableColumns: ColumnDef<AttributesProps>[] = [
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
    accessorKey: "isRequired",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Required" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("isRequired") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "allowFiltering",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Allow Filtering" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("allowFiltering") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "showOnProductPage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Show On Product Page" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("showOnProductPage") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "displayOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Display Order" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("displayOrder")}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={attributesActionList} />,
  },
]
