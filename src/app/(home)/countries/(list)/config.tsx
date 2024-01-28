import DynamicFlag from "@/components/other/dynamic-flag"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

const countriesActionList: ActionListProps[] = [
  {
    type: "button",
    label: "View",
    redirect: (id: string) => {
      return "/countries/" + id;
    }
  },
  {
    type: "button",
    label: "Edit",
    redirect: (id: string) => {
      return "/countries/" + id + "/edit";
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

export const countriesTableToolbar: ToolbarProps[] = []

export const countriesTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'code',
    title: 'Code'
  },
  {
    key: 'isoCode',
    title: 'ISO Code'
  },
  {
    key: 'isActive',
    title: 'Active'
  },
  {
    key: 'comingSoon',
    title: 'Coming Soon'
  },
  {
    key: 'isInMaintenanceMode',
    title: 'Maintenance Mode'
  }
]

export type CountriesProps = {
  id: string
  name: string
  code: string
  isoCode: string
  isActive: boolean
  comingSoon: boolean
  isInMaintenanceMode: boolean
  numberOfLocations: number
} | undefined

export const countriesTableColumns: ColumnDef<CountriesProps>[] = [
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
    accessorKey: "flag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Flag" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              <DynamicFlag isoCode={row.getValue("isoCode")} width={50} style={{ borderRadius: '5px' }} />
            </span>
          </div>
        </div>
      )
    },
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
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("code")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "isoCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ISO Code" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("isoCode")}
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
    accessorKey: "comingSoon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coming Soon" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("comingSoon") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "isInMaintenanceMode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Maintenance Mode" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("isInMaintenanceMode") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "numberOfLocations",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number Of Locations" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("numberOfLocations")}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={countriesActionList} />,
  },
]
