"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const adsActionList : ActionListProps[] = [
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

export const adsTableToolbar : ToolbarProps[] = []

export const adsTableToolbarSearchList : ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'title',
    title: 'Title'
  },
  {
    key: 'advertiser',
    title: 'Advertiser'
  },
  {
    key: 'date',
    title: 'Date'
  }
]

interface AdsProps {
  id: string
  logo: string
  title: string
  advertiser: string
  date: string
}

export const adsTableColumns: ColumnDef<AdsProps>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "logo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Logo" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar style={{width: "150px", height: "100px", borderRadius: "5px"}}>
          <AvatarImage src={row.getValue("logo")} alt="avatar" style={{objectFit: "cover"}} />
          <AvatarFallback>{row.getValue("name")}</AvatarFallback>
        </Avatar>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "advertiser",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Advertiser" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("advertiser")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("date")}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={adsActionList}  />,
  },
]
