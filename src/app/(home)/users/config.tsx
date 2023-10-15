"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

const usersActionList: ActionListProps[] = [
  {
    type: "button",
    label: "View",
    redirect: (id: string) => {
      return "/users/" + id;
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
  },
  {
    type: "dropdown",
    label: "Security",
    subActions: [
      {
        type: "button",
        label: "Permissions",
        action: (id: string) => {
          console.log('Permissions: ' + id)
        }
      },
      {
        type: "button",
        label: "Claims",
        action: (id: string) => {
          console.log('Claims: ' + id)
        }
      },
      {
        type: "button",
        label: "Lock",
        action: (id: string) => {
          console.log('Lock: ' + id)
        }
      }
    ]
  },
  {
    type: "dropdown",
    label: "More",
    subActions: [
      {
        type: "button",
        label: "Leads",
        action: (id: string) => {
          console.log('Leads: ' + id)
        }
      },
      {
        type: "button",
        label: "Customers",
        action: (id: string) => {
          console.log('Customers: ' + id)
        }
      },
      {
        type: "button",
        label: "Requests",
        action: (id: string) => {
          console.log('Requests: ' + id)
        }
      },
    ]
  }
]

// Options
const roleNames = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Super Admin",
    label: "Super Admin",
  }
]

export const usersTableToolbar: ToolbarProps[] = []

export const usersTableToolbarSearchList: ToolbarSearchListProps[] = [
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
    key: 'roles',
    title: 'Roles'
  },
  {
    key: 'phoneNumber',
    title: 'Phone Number'
  },
  {
    key: 'active',
    title: 'Active'
  },
  {
    key: 'lockout',
    title: 'Lock Out'
  },
  {
    key: 'emailConfirmed',
    title: 'Email Confirmed'
  },
  {
    key: 'twoFactorAuth',
    title: 'Two Factor Auth'
  },
  {
    key: 'accessFailed',
    title: 'Access Failed'
  },
  {
    key: 'creationTime',
    title: 'Creation Time'
  },
  {
    key: 'modificationTime',
    title: 'Modification Time'
  }
]

interface UsersProps {
  id: string
  name: string
  email: string
  jobTitle: string
  roles: string
  phoneNumber: string
  active: boolean
  lockout: boolean
  emailConfirmed: boolean
  twoFactorAuth: boolean
  accessFailed: number
  creationTime: string
  modificationTime: string
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={usersActionList} />,
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
    accessorKey: "roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roles" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("roles")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("phoneNumber")}
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
    accessorKey: "lockout",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lockout" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("lockout") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "emailConfirmed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Confirmed" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("emailConfirmed") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "twoFactorAuth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Two Factor Auth" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("twoFactorAuth") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "accessFailed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Access Failed" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("accessFailed")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "creationTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creation Time" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("creationTime")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "modificationTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modification Time" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("modificationTime")}
          </span>
        </div>
      )
    },
  },
]
