"use client"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { ActionListProps, DataTableRowActions } from "@/components/table/data-table-row-actions"
import { ToolbarProps, ToolbarSearchListProps } from "@/components/table/data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import { errorHandler } from "@/components/ui/custom/error-handler"
import { toast } from "@/components/ui/use-toast"
import axios from "@/services/axios"
import { ColumnDef } from "@tanstack/react-table"

export async function deleteTopicQuery(topicId: number, keyword: string) {
  return await axios.delete(`/app/topic/${topicId}/query`, {
    params: {
      Keyword: keyword,
    },
  }).then(function (response) {
    toast({
      title: "Success",
      description: "Query was successfully deleted.",
      variant: "success",
    });
    window.location.href = `/topics/${topicId}`;
  }).catch(function (error) {
    console.log(error);
    errorHandler(toast, error);
  });
}

const topicQueriesActionList: ActionListProps[] = [];

export const topicQueriesTableToolbar: ToolbarProps[] = []

export const topicQueriesTableToolbarSearchList: ToolbarSearchListProps[] = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'keyword',
    title: 'Keyword'
  },
  {
    key: 'count',
    title: 'Count'
  },
]

export interface TopicQueriesProps {
  id: number
  topicId: number
  keyword: string
  count: number
}

export const topicQueriesTableColumns: ColumnDef<TopicQueriesProps>[] = [
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
    accessorKey: "keyword",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keyword" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("keyword")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Count" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("count")}
          </span>
        </div>
      );
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
            deleteTopicQuery(row.original.topicId, row.original.keyword);
          }
        }
      ]
    } />,
  },
]
