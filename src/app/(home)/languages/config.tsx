"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

const languagesActionList: ActionListProps[] = [
  {
    type: "button",
    label: "Set as default",
    action: (id: string) => {
      console.log('Set As Default: ' + id)
    }
  },
  {
    type: "button",
    label: "Edit",
    action: (id: string) => {
      console.log('Edit: ' + id)
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

export const languagesTableToolbar: ToolbarProps[] = []

export const languagesTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'displayName',
    title: 'Display Name'
  },
  {
    key: 'cultureName',
    title: 'Culture Name'
  },
  {
    key: 'uiCultureName',
    title: 'UI Culture Name'
  },
  {
    key: 'enabled',
    title: 'Enabled'
  }
]

interface LanguagesProps {
  id: string
  displayName: string
  cultureName: string
  uiCultureName: string
  enabled: boolean
}

export const languagesTableColumns: ColumnDef<LanguagesProps>[] = [
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
    cell: ({ row }) => <div style={{ width: "90px" }}><DataTableRowActions row={row} actionList={languagesActionList} /></div>
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Display Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("displayName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "cultureName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Culture Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("cultureName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "uiCultureName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UI Culture Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("uiCultureName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "enabled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Enabled" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("enabled") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  }
]
