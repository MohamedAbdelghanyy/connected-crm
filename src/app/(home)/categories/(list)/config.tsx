"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

const categoriesActionList: ActionListProps[] = [
  {
    type: "button",
    label: "View",
    redirect: (id: string) => {
      return "/categories/" + id;
    }
  },
  {
    type: "button",
    label: "Edit",
    redirect: (id: string) => {
      return "/categories/" + id + "/edit";
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

export const categoriesTableToolbar: ToolbarProps[] = []

export const categoriesTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'orderNo',
    title: 'Order Number'
  },
  {
    key: 'active',
    title: 'Active'
  }
]

interface CategoriesProps {
  id: string
  image: string
  name: string
  orderNumber: number
  active: boolean
}

export const categoriesTableColumns: ColumnDef<CategoriesProps>[] = [
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
    enableSorting: true,
    enableHiding: false,
  },
  /*{
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar style={{ width: "150px", height: "100px", borderRadius: "5px", backgroundColor: "#FFF" }}>
          <AvatarImage src={row.getValue("image")} alt="avatar" style={{ objectFit: "cover" }} />
          <AvatarFallback>{row.getValue("name")}</AvatarFallback>
        </Avatar>
      )
    },
    enableSorting: false,
  },*/
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
    accessorKey: "orderNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Number" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("orderNo")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("active") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={categoriesActionList} />,
  },
]
