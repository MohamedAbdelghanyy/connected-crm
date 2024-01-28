import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"

export const wishlistsTableToolbar: ToolbarProps[] = []

export const wishlistsTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'itemName',
    title: 'Item Name'
  },
  {
    key: 'customerName',
    title: 'Customer Name'
  },
  {
    key: 'addingDate',
    title: 'Adding Date'
  },
]

interface WishlistsProps {
  id: string
  itemID: string
  itemName: string
  customerID: string
  customerName: string
  addingDate: string
}

export const wishlistsTableColumns: ColumnDef<WishlistsProps>[] = [
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
    accessorKey: "itemName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link to={"/products/" + row.original.itemID}>{row.getValue("itemName")}</Link>
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link to={"/customers/" + row.original.customerID}>{row.getValue("customerName")}</Link>
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "addingDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Adding Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("addingDate")}
          </span>
        </div>
      )
    },
  }
]
