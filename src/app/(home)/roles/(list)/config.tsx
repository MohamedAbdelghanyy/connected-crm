"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { errorHandler } from "@/components/ui/custom/error-handler"
import { toast } from "@/components/ui/use-toast"
import axios from "@/services/axios"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

export async function deleteRole(roleID: string) {
  return await axios.delete('/identity/roles/' + roleID)
    .then(function (response) {
      toast({
        title: "Success",
        description: "Role was successfully deleted.",
        variant: "success",
      });
      window.location.href = "/roles";
    })
    .catch(function (error) {
      errorHandler(toast, error);
      return null;
    });
}

export let rolesActionList: ActionListProps[] = [
  {
    type: "button",
    label: "Permissions",
    action: (id: string) => {
      console.log('Permissions: ' + id)
    }
  }, {
    type: "button",
    label: "Claims",
    action: (id: string) => {
      console.log('Claims: ' + id)
    }
  },
  {
    type: "button",
    label: "View",
    redirect: (id: string) => {
      return "/roles/" + id;
    }
  },
  {
    type: "button",
    label: "Edit",
    redirect: (id: string) => {
      return "/roles/" + id + "/edit";
    }
  },
  {
    type: "button",
    label: "Delete",
    action: (id: string) => {
      deleteRole(id);
    }
  }
]

export const rolesTableToolbar: ToolbarProps[] = []

export const rolesTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'isDefault',
    title: 'Default'
  },
  {
    key: 'isPublic',
    title: 'Public'
  }
]

interface RolesProps {
  id: string
  name: string
  isDefault: boolean
  isPublic: boolean
}

export const rolesTableColumns: ColumnDef<RolesProps>[] = [
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
    accessorKey: "isDefault",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Default" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("isDefault") ? (<Check color="green" />) : (<X color="red" />)}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "isPublic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Public" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("isPublic") ? (<Check color="green" />) : (<X color="red" />)}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <div style={{ width: "90px" }}><DataTableRowActions row={row} actionList={rolesActionList} /></div>,
  }
]
