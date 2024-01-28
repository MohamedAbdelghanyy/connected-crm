import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"

const appointmentsActionList: ActionListProps[] = [

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
        label: "Scheduled",
        action: (id: string) => {
          console.log('Scheduled: ' + id)
        }
      },
      {
        type: "button",
        label: "Done",
        action: (id: string) => {
          console.log('Done: ' + id)
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
        label: "Test Test",
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
    value: "scheduled",
    label: "Scheduled",
  },
  {
    value: "done",
    label: "Done",
  },
]

export const appointmentsTableToolbar: ToolbarProps[] = [
  {
    key: "status",
    title: "Status",
    options: statuses,
  }
]

export const appointmentsTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'customerName',
    title: 'Customer Name'
  },
  {
    key: 'assignedTo',
    title: 'Assigned To'
  },
  {
    key: 'item',
    title: 'Item'
  },
  {
    key: 'slot',
    title: 'Slot'
  },
  {
    key: 'date',
    title: 'Date'
  }
]

interface AppointmentsProps {
  id: string
  customerID: string
  customerName: string
  assignedToID: string
  assignedTo: string
  itemID: string
  item: string
  slot: string
  date: string
}

export const appointmentsTableColumns: ColumnDef<AppointmentsProps>[] = [
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
            <Link to={"/customers/" + row.original.customerID}>{row.getValue("customerName")}</Link>
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "assignedTo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned To" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link to={"/users/" + row.original.assignedToID}>{row.getValue("assignedTo")}</Link>
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "item",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link to={"/products/" + row.original.itemID}>{row.getValue("item")}</Link>
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "slot",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slot" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("slot")}
          </span>
        </div>
      )
    },
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
    cell: ({ row }) => <DataTableRowActions row={row} actionList={appointmentsActionList} />,
  },
]
