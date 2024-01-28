import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"

export const exchangeRatesTableToolbar: ToolbarProps[] = []

export const exchangeRatesTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'fromCurrencyName',
    title: 'From Currency'
  },
  {
    key: 'fromCurrencyIsoCode',
    title: 'From ISO Code'
  },
  {
    key: 'toCurrencyName',
    title: 'To Currency'
  },
  {
    key: 'toCurrencyIsoCode',
    title: 'To ISO Code'
  },
  {
    key: 'exchangeRate',
    title: 'Exchange Rate'
  }
]

export interface ExchangeRatesProps {
  id: number
  fromCurrencyName: string
  fromCurrencyIsoCode: string
  toCurrencyName: string
  toCurrencyIsoCode: string
  exchangeRate: number
}

export const exchangeratesTableColumns: ColumnDef<ExchangeRatesProps>[] = [
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
    enableHiding: false,
  },
  {
    accessorKey: "fromCurrencyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="From Currency" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("fromCurrencyName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "fromCurrencyIsoCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="From ISO Code" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("fromCurrencyIsoCode")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "toCurrencyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="To Currency" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("toCurrencyName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "toCurrencyIsoCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="To ISO Code" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("toCurrencyIsoCode")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "exchangeRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exchange Rate" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("exchangeRate")}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={[
      {
        type: "button",
        label: "Edit",
        action: (id: string) => {
          console.log(id);
          //window.location.href += "/exchangeRates/" + id + "/edit";
        }
      },
      {
        type: "button",
        label: "Delete",
        action: (id: string) => {
          console.log('Delete: ' + id)
        }
      }
    ]} />,
  },
]
