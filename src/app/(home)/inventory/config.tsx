import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"

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

export const productsTableToolbar: ToolbarProps[] = []

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
  views: number
  wishlisted: number
  interactions: number
  noOfRequests: number
  dateItemAdded: string
  dateItemReserved: string
  dateItemSold: string
  lastupdated: string
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
            <Link to={'#'}>{row.getValue("category")}</Link>
          </span>
        </div>
      )
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
            <Link to={'#'}>{row.getValue("brand")}</Link>
          </span>
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={productsActionList} />,
  },
]
