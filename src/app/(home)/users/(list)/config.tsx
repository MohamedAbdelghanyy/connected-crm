import { errorHandler } from "@/components/other/error-handler"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import axios from "@/services/axios"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

export async function deleteUser(userID: string) {
  return await axios.delete('/identity/users/' + userID)
    .then(function () {
      toast({
        title: "Success",
        description: "User was successfully deleted.",
        variant: "success",
      });
      window.location.href = "/users";
    })
    .catch(function (error) {
      errorHandler(toast, error);
      return null;
    });
}

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
    redirect: (id: string) => {
      return "/users/" + id + "/edit";
    }
  },
  {
    type: "button",
    label: "Delete",
    action: (id: string) => {
      deleteUser(id);
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
    key: 'surname',
    title: 'Surname'
  },
  {
    key: 'userName',
    title: 'User Name'
  },
  {
    key: 'email',
    title: 'Email'
  },
  {
    key: 'emailConfirmed',
    title: 'Email Confirmed'
  },
  {
    key: 'phoneNumber',
    title: 'Phone Number'
  },
  {
    key: 'phoneNumberConfirmed',
    title: 'Phone Number Confirmed'
  },
  {
    key: 'roleNames',
    title: 'Roles'
  },
  {
    key: 'isActive',
    title: 'Active'
  },
  {
    key: 'lockoutEnabled',
    title: 'Lockout Enabled'
  },
  {
    key: 'isDeleted',
    title: 'Deleted'
  },
]

interface UsersProps {
  id: string
  name: string
  surname: string
  userName: string
  email: string
  emailConfirmed: boolean
  phoneNumber: string
  phoneNumberConfirmed: boolean
  roleNames: string[]
  isActive: boolean
  lockoutEnabled: boolean
  isDeleted: boolean
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
    accessorKey: "surname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Surname" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("surname")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("userName")}
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
    accessorKey: "phoneNumberConfirmed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number Confirmed" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("phoneNumberConfirmed") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roles" />
    ),
    cell: () => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {/*(row.getValue("roleNames") as string[]).map((roleName)=>{
              return <p>{roleName}</p>
            })*/}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("isActive") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "lockoutEnabled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lockout Enabled" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("lockoutEnabled") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "isDeleted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deleted" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("isDeleted") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={usersActionList} />,
  },
]
