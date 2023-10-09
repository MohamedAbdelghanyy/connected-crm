"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"
import Link from "next/link"

const productsActionList: ActionListProps[] = [
  {
    type: "button",
    label: "View",
    redirect: (id: string) => {
      return "/products/" + id;
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
    label: "Requests",
    subActions: [
      {
        type: "button",
        label: "Create Request",
        action: (id: string) => {
          console.log('Create Req.: ' + id)
        }
      },
      {
        type: "button",
        label: "View Requests",
        action: (id: string) => {
          console.log('View Req.: ' + id)
        }
      },
    ]
  },
  {
    type: "dropdown",
    label: "More",
    subActions: [
      {
        type: "button",
        label: "Highlights",
        action: (id: string) => {
          console.log('Highlights: ' + id)
        }
      }
    ]
  }
]

// Options
const statuses = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "inreview",
    label: "In Review",
  },
  {
    value: "approved",
    label: "Approved",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
  {
    value: "onhold",
    label: "On Hold",
  },
  {
    value: "reserved",
    label: "Reserved",
  },
  {
    value: "soldout",
    label: "Sold Out",
  },
]

export const productsTableToolbar: ToolbarProps[] = [
  {
    key: "status",
    title: "Status",
    options: statuses,
  }
]

export const productsTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'price',
    title: 'Price'
  },
  {
    key: 'category',
    title: 'Category'
  },
  {
    key: 'brand',
    title: 'Brand'
  },
  {
    key: 'owner',
    title: 'Owner'
  },
  {
    key: 'soldByConnected',
    title: 'Sold By Connected'
  },
  {
    key: 'views',
    title: 'Views'
  },
  {
    key: 'wishlisted',
    title: 'Wishlisted'
  },
  {
    key: 'interactions',
    title: 'Interactions'
  },
  {
    key: 'noOfRequests',
    title: 'No. Of Requests'
  },
  {
    key: 'dateItemAdded',
    title: 'Adding Date'
  },
  {
    key: 'dateItemReserved',
    title: 'Reservation Date'
  },
  {
    key: 'dateItemSold',
    title: 'Sold Out Date'
  },
  {
    key: 'lastupdated',
    title: 'Last Updated'
  }
]

interface ProductsProps {
  id: string
  image: string
  name: string
  price: number
  brand: string
  category: string
  ownerID: string
  owner: string
  soldByConnected: boolean
  views: number
  wishlisted: number
  interactions: number
  noOfRequests: number
  dateItemAdded: string
  dateItemReserved: string
  dateItemSold: string
  lastupdated: string
  status: string
}

export const productsTableColumns: ColumnDef<ProductsProps>[] = [
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
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar style={{ width: "150px", height: "100px", borderRadius: "5px" }}>
          <AvatarImage src={row.getValue("image")} alt="avatar" style={{ objectFit: "cover" }} />
          <AvatarFallback>{row.getValue("name")}</AvatarFallback>
        </Avatar>
      )
    },
    enableSorting: false,
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
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("price")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link href={'#'} legacyBehavior>{row.getValue("category")}</Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link href={'#'} legacyBehavior>{row.getValue("brand")}</Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link href={'/merchants/' + row.original.ownerID} legacyBehavior>{row.getValue("owner")}</Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "soldByConnected",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sold By Connected" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("soldByConnected") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "views",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Views" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("views")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "wishlisted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wishlisted" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("wishlisted")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "interactions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Interactions" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("interactions")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "noOfRequests",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requests" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("noOfRequests")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "dateItemAdded",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Adding Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("dateItemAdded")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "dateItemReserved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reservation Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("dateItemReserved")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "dateItemSold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sold Out Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("dateItemSold")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "lastupdated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("lastupdated")}
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
    cell: ({ row }) => <DataTableRowActions row={row} actionList={productsActionList} />,
  },
]
