import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"

export const securityLogsTableToolbar: ToolbarProps[] = []

export const securityLogsTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'date',
    title: 'Date'
  },
  {
    key: 'action',
    title: 'Action'
  },
  {
    key: 'ipAddress',
    title: 'IP Address'
  },
  {
    key: 'browser',
    title: 'Browser'
  },
  {
    key: 'identity',
    title: 'Identity'
  },
  {
    key: 'fullName',
    title: 'Full Name'
  }
]

interface SecurityLogsProps {
  id: string
  date: string
  action: string
  ipAddress: string
  browser: string
  identity: string
  fullName: string
}

export const securityLogsTableColumns: ColumnDef<SecurityLogsProps>[] = [
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
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("action")}
          </span>
        </div>
      )
    },
  }
  ,
  {
    accessorKey: "ipAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="IP Address" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("ipAddress")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "browser",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Browser" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("browser")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "identity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Identity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("identity")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("fullName")}
          </span>
        </div>
      )
    },
  }
]