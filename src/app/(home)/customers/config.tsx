"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"

const customersActionList: ActionListProps[] = [
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
  },
  {
    type: "dropdown",
    label: "Change Status",
    subActions: [
      {
        type: "button",
        label: "Activate",
        action: (id: string) => {
          console.log('Activate: ' + id)
        }
      },
      {
        type: "button",
        label: "De-activate",
        action: (id: string) => {
          console.log('De-activate: ' + id)
        }
      },
      {
        type: "button",
        label: "Ban",
        action: (id: string) => {
          console.log('Ban: ' + id)
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
        label: "Items",
        action: (id: string) => {
          console.log('Items: ' + id)
        }
      },
      {
        type: "button",
        label: "Highlights",
        action: (id: string) => {
          console.log('Highlights: ' + id)
        }
      },
      {
        type: "button",
        label: "Activity Log",
        action: (id: string) => {
          console.log('Log: ' + id)
        }
      },
    ]
  }
]

// Options
const sources = [
  {
    value: "invitation",
    label: "Invitation",
  },
  {
    value: "leads",
    label: "Leads",
  },
  {
    value: "registration",
    label: "Registration",
  },
]

// Options
const statuses = [
  {
    value: "approved",
    label: "Approved",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
]

export const customersTableToolbar: ToolbarProps[] = [
  {
    key: "source",
    title: "Source",
    options: sources,
  },
  {
    key: "status",
    title: "Status",
    options: statuses,
  }
]

export const customersTableToolbarSearchList: ToolbarSearchListProps[] = [
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
    key: 'occupation',
    title: 'Occupation'
  },
  {
    key: 'noofposts',
    title: 'No. Of Posted Items'
  },
  {
    key: 'noofwishlist',
    title: 'No. Of Wishlist Items'
  },
  {
    key: 'lastseen',
    title: 'Last Seen'
  },
  {
    key: 'interests',
    title: 'Interests'
  },
  {
    key: 'source',
    title: 'Source'
  },
  {
    key: 'status',
    title: 'Status'
  },

]

interface CustomersProps {
  id: string
  avatar: string
  name: string
  mobile: string
  occupation: string
  noofposts: number
  noofwishlist: number
  lastseen: string
  interests: string
  source: string
  status: string
}

export const customersTableColumns: ColumnDef<CustomersProps>[] = [
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
    accessorKey: "avatar",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Avatar" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar style={{ width: "50px", height: "50px" }}>
          <AvatarImage src={row.getValue("avatar")} alt="avatar" style={{ objectFit: "cover" }} />
          <AvatarFallback>{String(row.getValue("name")).charAt(0)}</AvatarFallback>
        </Avatar>
      )
    },
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
    accessorKey: "occupation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Occupation" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("occupation")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "noofposts",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posted Items" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("noofposts")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "noofwishlist",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wishlist Items" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("noofwishlist")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "lastseen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Seen" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("lastseen")}
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
    accessorKey: "source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source" />
    ),
    cell: ({ row }) => {
      const source = sources.find(
        (source: { value: unknown }) => source.value === row.getValue("source")
      )

      if (!source) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{source.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={customersActionList} />,
  },
]
