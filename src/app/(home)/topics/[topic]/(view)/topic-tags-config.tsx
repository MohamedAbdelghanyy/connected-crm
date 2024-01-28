import { errorHandler } from "@/components/other/error-handler"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import axios from "@/services/axios"
import { ColumnDef } from "@tanstack/react-table"

export async function deleteTopicTag(topicId: number, tagId: number) {
  return await axios.delete(`/app/topic/${topicId}/tag`, {
    params: {
      TagId: tagId,
    },
  }).then(function () {
    toast({
      title: "Success",
      description: "Tag was successfully deleted.",
      variant: "success",
    });
    window.location.href = `/topics/${topicId}`;
  }).catch(function (error) {
    errorHandler(toast, error);
  });
}

export const topicTagsTableToolbar: ToolbarProps[] = []

export const topicTagsTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'key',
    title: 'Key'
  },
  {
    key: 'displayName',
    title: 'Display Name'
  },
  {
    key: 'description',
    title: 'Description'
  },
]

export interface TopicTagsProps {
  topicId: number
  tagId: number
  tag: {
    id: number
    key: string
    displayName: string
    description: string
  }
}

export const topicTagsTableColumns: ColumnDef<TopicTagsProps>[] = [
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
    cell: ({ row }) => <div className="w-[80px]">{row.original.tag.id}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "key",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Key" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.tag.key}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Display Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.tag.displayName}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.tag.description}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={
      [
        {
          type: "button",
          label: "Delete",
          action: () => {
            deleteTopicTag(row.original.topicId, row.original.tag.id);
          }
        }
      ]} />,
  },
]
