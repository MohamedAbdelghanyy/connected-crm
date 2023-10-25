"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

const imagesActionList: ActionListProps[] = [
  {
    type: "button",
    label: "Set As Tumbnail",
    action: (id: string) => {
      console.log('Thumbnail: ' + id)
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
  }
]

export const imagesTableToolbar: ToolbarProps[] = []

export const imagesTableToolbarSearchList: ToolbarSearchListProps[] = [
]

interface ImagesProps {
  id: string
  displayOrder: number
  low: string
  medium: string
  high: string
  isThumbnail: boolean
}

export const imagesTableColumns: ColumnDef<ImagesProps>[] = [
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
    accessorKey: "displayOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Display Order" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("displayOrder")}
            </span>
          </center>
        </div>
      )
    },
  },
  {
    accessorKey: "low",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Low" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar style={{ width: "150px", height: "100px", borderRadius: "5px", backgroundColor: "#FFF" }}>
          <AvatarImage src={row.getValue("low")} alt="avatar" style={{ objectFit: "cover" }} />
          <AvatarFallback>Low</AvatarFallback>
        </Avatar>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "medium",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Medium" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar style={{ width: "150px", height: "100px", borderRadius: "5px", backgroundColor: "#FFF" }}>
          <AvatarImage src={row.getValue("medium")} alt="avatar" style={{ objectFit: "cover" }} />
          <AvatarFallback>Medium</AvatarFallback>
        </Avatar>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "high",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="High" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar style={{ width: "150px", height: "100px", borderRadius: "5px", backgroundColor: "#FFF" }}>
          <AvatarImage src={row.getValue("high")} alt="avatar" style={{ objectFit: "cover" }} />
          <AvatarFallback>High</AvatarFallback>
        </Avatar>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "isThumbnail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thumbnail" />
    ),
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <center>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("isThumbnail") ? (<Check color="green" />) : (<X color="red" />)}
            </span>
          </center>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={imagesActionList} />,
  },
]
