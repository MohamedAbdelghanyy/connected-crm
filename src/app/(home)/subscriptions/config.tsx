import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"
import { Link } from "react-router-dom"

const subscriptionsActionList: ActionListProps[] = [
  {
    type: "button",
    label: "Deactivate",
    action: (id: string) => {
      console.log('Deactivate: ' + id)
    }
  },
  {
    type: "button",
    label: "Refund",
    action: (id: string) => {
      console.log('Refund: ' + id)
    }
  }
]

export const subscriptionsTableToolbar: ToolbarProps[] = []

export const subscriptionsTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'customerName',
    title: 'Customer Name'
  },
  {
    key: 'subscriptionType',
    title: 'Subscription Type'
  },
  {
    key: 'subscriptionPrice',
    title: 'Subscription Price'
  },
  {
    key: 'from',
    title: 'From'
  },
  {
    key: 'to',
    title: 'To'
  },
  {
    key: 'isRefundAllowed',
    title: 'Is Refund Allowed'
  },
  {
    key: 'isActive',
    title: 'Is Active'
  },
  {
    key: 'isRefunded',
    title: 'Is Refunded'
  }
]

interface SubscriptionsProps {
  id: string
  customerID: string
  customerName: string
  subscriptionType: string
  subscriptionPrice: string
  from: string
  to: string
  isRefundAllowed: boolean
  isActive: boolean
  isRefunded: boolean
}

export const subscriptionsTableColumns: ColumnDef<SubscriptionsProps>[] = [
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
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link to={'/customers/' + row.original.customerID}>{row.getValue("customerName")}</Link>
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "subscriptionType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subscription Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link to={'#'}>{row.getValue("subscriptionType")}</Link>
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "subscriptionPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subscription Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("subscriptionPrice")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "from",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="From" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("from")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="To" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("to")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "isRefundAllowed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Refund Allowed" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("isRefundAllowed") ? (<Check color="green" />) : (<X color="red" />)}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Active" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("isActive") ? (<Check color="green" />) : (<X color="red" />)}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "isRefunded",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Refunded" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("isRefunded") ? (<Check color="green" />) : (<X color="red" />)}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={subscriptionsActionList} />,
  },
]
