"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"

const tagsActionList : ActionListProps[] = [
  {
    type: "button",
    label: "View",
    redirect: (id: string) => {
      return "/tags/" + id;
    }
  },
  {
    type: "button",
    label: "Edit",
    redirect: (id: string) => {
      return "/tags/" + id + "/edit";
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

export const tagsTableToolbar : ToolbarProps[] = []

export const tagsTableToolbarSearchList : ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'key',
    title: 'Key'
  },
  {
    key: 'displayName',
    title: 'Display Name'
  },
  {
    key: 'description',
    title: 'Description'
  },
]

export interface TagsProps {
  id: string
  key: string
  displayName: string
  description: string
}

export const tagsTableColumns: ColumnDef<TagsProps>[] = [
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
    accessorKey: "key",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Key" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("key")}
          </span>
        </div>
      )
    },
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
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={tagsActionList}  />,
  },
]
