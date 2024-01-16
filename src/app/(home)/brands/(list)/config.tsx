"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

const brandsActionList: ActionListProps[] = [
  {
    type: "button",
    label: "View",
    redirect: (id: string) => {
      return "/brands/" + id;
    }
  },
  {
    type: "button",
    label: "Edit",
    redirect: (id: string) => {
      return "/brands/" + id + "/edit";
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

export const brandsTableToolbar: ToolbarProps[] = []

export const brandsTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'categories',
    title: 'Categories'
  },
  {
    key: 'slug',
    title: 'Slug'
  },
  {
    key: 'mediaId',
    title: 'Media'
  },
  {
    key: 'shortDescription',
    title: 'Short Description'
  },
  {
    key: 'allowedInSearch',
    title: 'Allowed In Search'
  },
  {
    key: 'allowedInFilters',
    title: 'Allowed In Filters'
  },
  {
    key: 'showOnHomePage',
    title: 'Show On Home Page'
  },
  {
    key: 'isPublished',
    title: 'Published'
  }
]

export interface BrandsProps {
  id: number,
  name: string,
  slug: string,
  mediaId: number,
  shortDescription: string,
  description: string,
  allowedInSearch: boolean,
  allowedInFilters: boolean,
  showOnHomePage: boolean,
  isPublished: boolean,
  categories: [
    {
      id: string,
      name: string,
    }
  ]
}

export const brandsTableColumns: ColumnDef<BrandsProps>[] = [
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
    enableHiding: false,
  },
  {
    accessorKey: "mediaId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Media" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar style={{ width: "150px", height: "100px", borderRadius: "5px", backgroundColor: "#FFF" }}>
          <AvatarImage src={row.getValue("mediaId")} alt="avatar" style={{ objectFit: "cover" }} />
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
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categories" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("categories") as Array<{id: number, name: string}>).length > 0 ?
              (row.getValue("categories") as Array<{id: number, name: string}>).map(item => item.name).join(', ')
              : "No Categories"
            }
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("slug")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "shortDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Short Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("shortDescription")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "allowedInSearch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Allowed In Search" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("allowedInSearch") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "allowedInFilters",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Allowed In Filters" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("allowedInFilters") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "showOnHomePage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Show On Home Page" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("showOnHomePage") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("isPublished") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={brandsActionList} />,
  },
]
