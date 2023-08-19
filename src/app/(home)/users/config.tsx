"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"

const usersActionList : ActionListProps[] = [
  {
    type: "dropdown",
    label: "Change Access",
    subActions: [
      {
        type: "button",
        label: "Admin",
        action: (id: string) => {
          console.log('Admin: ' + id)
        }
      },
      {
        type: "button",
        label: "Super Admin",
        action: (id: string) => {
          console.log('Super Admin: ' + id)
        }
      }
    ]
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
const accessNames = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Super Admin",
    label: "Super Admin",
  }
]

export const usersTableToolbar : ToolbarProps[] = [
  {
    key: "accessName",
    title: "Access",
    options: accessNames,
  }
]

export const usersTableToolbarSearchList : ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'email',
    title: 'Email'
  },
  {
    key: 'jobTitle',
    title: 'Job Title'
  },
  {
    key: 'dashboardType',
    title: 'Dashboard Type'
  },
  {
    key: 'accessName',
    title: 'Access Name'
  },
  {
    key: 'privileges',
    title: 'Privileges'
  }
]

interface UsersProps {
  id: string
  name: string
  email: string
  jobTitle: string
  dashboardType: string
  accessName: string
  privileges: string
}

export const usersTableColumns: ColumnDef<UsersProps>[] = [
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
    accessorKey: "jobTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("jobTitle")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "dashboardType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dashboard Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("dashboardType")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "accessName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Access Name" />
    ),
    cell: ({ row }) => {
      const accessName = accessNames.find(
        (accessName: { value: unknown }) => accessName.value === row.getValue("accessName")
      )

      if (!accessName) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{accessName.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "privileges",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Privileges" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("privileges")}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={usersActionList}  />,
  },
]
