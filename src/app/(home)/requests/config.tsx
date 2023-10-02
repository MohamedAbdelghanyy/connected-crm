"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

const requestsActionList: ActionListProps[] = [

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
        label: "In Process",
        action: (id: string) => {
          console.log('In Process: ' + id)
        }
      },
      {
        type: "button",
        label: "Scheduled",
        action: (id: string) => {
          console.log('Scheduled: ' + id)
        }
      },
      {
        type: "button",
        label: "Deal Closed",
        action: (id: string) => {
          console.log('Deal Closed: ' + id)
        }
      }
    ]
  },
  {
    type: "dropdown",
    label: "Assign To",
    subActions: [
      {
        type: "button",
        label: "Mohamed Abdelghany",
        action: (id: string) => {
          console.log('Moh: ' + id)
        }
      },
      {
        type: "button",
        label: "Khaled Afify",
        action: (id: string) => {
          console.log('Khal: ' + id)
        }
      },
      {
        type: "button",
        label: "Soha El Hadary",
        action: (id: string) => {
          console.log('Soh: ' + id)
        }
      }
    ]
  }
]

// Options
const statuses = [
  {
    value: "inProcess",
    label: "In Process",
  },
  {
    value: "scheduled",
    label: "Scheduled",
  },
  {
    value: "dealClosed",
    label: "Deal Closed",
  },
]

export const requestsTableToolbar: ToolbarProps[] = [
  {
    key: "status",
    title: "Status",
    options: statuses,
  }
]

export const requestsTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'customerName',
    title: 'Customer Name'
  },
  {
    key: 'customerMobile',
    title: 'Customer Mobile'
  },
  {
    key: 'itemName',
    title: 'Item Name'
  },
  {
    key: 'appointment',
    title: 'Appointment'
  },
  {
    key: 'createdBy',
    title: 'Created By'
  },
  {
    key: 'creationDate',
    title: 'Creation Date'
  },
  {
    key: 'notes',
    title: 'Notes'
  },
  {
    key: 'status',
    title: 'Status'
  }
]

interface RequestsProps {
  id: string
  customerName: string
  customerMobile: string
  itemName: string
  appointment: string
  createdBy: string
  creationDate: string
  notes: string
  status: string
}

export const requestsTableColumns: ColumnDef<RequestsProps>[] = [
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
            <Link href={"#"}>{row.getValue("customerName")}</Link>
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "customerMobile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Mobile" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("customerMobile")}
          </span>
        </div>
      )
    },
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
            <Link href={"#"}>{row.getValue("itemName")}</Link>
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "appointment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appointment" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("appointment") ? row.getValue("appointment") : "Not set"}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("createdBy")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "creationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creation Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("creationDate")}
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
    cell: ({ row }) => <DataTableRowActions row={row} actionList={requestsActionList} />,
  },
]
