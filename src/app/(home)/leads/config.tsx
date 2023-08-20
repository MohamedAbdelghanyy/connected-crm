"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const leadsActionList : ActionListProps[] = [
  {
    type: "dropdown",
    label: "Set Priority",
    subActions: [
      {
        type: "button",
        label: "High",
        action: (id: string) => {
          console.log('High: ' + id)
        }
      },
      {
        type: "button",
        label: "Medium",
        action: (id: string) => {
          console.log('Medium: ' + id)
        }
      },
      {
        type: "button",
        label: "Low",
        action: (id: string) => {
          console.log('Low: ' + id)
        }
      }
    ]
  },
  {
    type: "dropdown",
    label: "Change Status",
    subActions: [
      {
        type: "button",
        label: "Active",
        action: (id: string) => {
          console.log('Active: ' + id)
        }
      },
      {
        type: "button",
        label: "Qualified",
        action: (id: string) => {
          console.log('Qualified: ' + id)
        }
      },
      {
        type: "button",
        label: "Unqualified",
        action: (id: string) => {
          console.log('Unqualified: ' + id)
        }
      }
    ]
  },
  {
    type: "button",
    label: "Convert Into User",
    action: (id: string) => {
      console.log('Convert: ' + id)
    }
  },
  {
    type: "button",
    label: "View",
    action: (id: string) => {
      console.log('View: ' + id)
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

// Options
const statuses = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "qualified",
    label: "Qualified",
  },
  {
    value: "unqualified",
    label: "Unqualified",
  },
]

// Options
const priorities = [
  {
    value: "high",
    label: "High",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "low",
    label: "Low",
  },
]

export const leadsTableToolbar : ToolbarProps[] = [
  {
    key: "status",
    title: "Status",
    options: statuses,
  },
  {
    key: "priority",
    title: "Priority",
    options: priorities,
  }
]

export const leadsTableToolbarSearchList : ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'mobile',
    title: 'Mobile'
  },
  {
    key: 'email',
    title: 'Email'
  },
  {
    key: 'interests',
    title: 'Interests'
  },
  {
    key: 'buy',
    title: 'Buy'
  },
  {
    key: 'sell',
    title: 'Sell'
  },
  {
    key: 'status',
    title: 'Status'
  },
  {
    key: 'rating',
    title: 'Rating'
  },
  {
    key: 'notes',
    title: 'Notes'
  },
  {
    key: 'priority',
    title: 'Priority'
  },
]

interface LeadsProps {
  id: string
  name: string
  mobile: string
  email: string
  interests: string
  buy: string
  sell: string
  status: string
  rating: number
  notes: string
  priority: string
}

export const leadsTableColumns: ColumnDef<LeadsProps>[] = [
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
    accessorKey: "mobile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("mobile")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "interests",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Interests" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("interests")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "buy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buy" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("buy")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "sell",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sell" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("sell")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status: { value: unknown }) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {/*status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )*/}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("rating")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("notes")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority: { value: unknown }) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={leadsActionList}  />,
  },
]
