import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { TagsProps } from "../../tags/(list)/config"
import { TopicTagsProps } from "../[topic]/(view)/topic-tags-config"

const topicsActionList: ActionListProps[] = [
  {
    type: "button",
    label: "View",
    redirect: (id: string) => {
      return "/topics/" + id;
    }
  },
  {
    type: "button",
    label: "Edit",
    redirect: (id: string) => {
      return "/topics/" + id + "/edit";
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

export const topicsTableToolbar: ToolbarProps[] = []

export const topicsTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'subscribersCount',
    title: 'Subscribers Count'
  },
  {
    key: 'tags',
    title: 'Tags'
  },
  {
    key: 'queries',
    title: 'Queries'
  }
]

export interface TopicsProps {
  id: string
  name: string
  subscribersCount: number
  tags: Array<TopicTagsProps>
  queries: Array<QuerieyProps>
}

interface QuerieyProps {
  id: number,
  topicId: number,
  keyword: string,
  count: number,
}

export const topicsTableColumns: ColumnDef<TopicsProps>[] = [
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
    accessorKey: "subscribersCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subscribers Count" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("subscribersCount")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("tags") as Array<{ tag: TagsProps }>).length > 0 ?
              (row.getValue("tags") as Array<{ tag: TagsProps }>).map(item => item.tag.displayName).join(', ')
              : "No Tags"
            }
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "queries",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Queries" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("queries") as Array<QuerieyProps>).length > 0 ?
              (row.getValue("queries") as Array<QuerieyProps>).map(item => item.keyword).join(', ')
              : "No Queries"
            }
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} actionList={topicsActionList} />,
  },
]
