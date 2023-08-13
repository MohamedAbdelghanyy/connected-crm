"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import { MoreHorizontalIcon } from "lucide-react"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  actionList: ActionListProps[]
}

export interface ActionListProps {
  label: string;
  action: (id: string) => void;
}

export function DataTableRowActions<TData>({
  row,
  actionList
}: DataTableRowActionsProps<TData>) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {actionList.map((action, i) => {
          return (
            <>
              <DropdownMenuItem onClick={() => {action.action(row.getValue('id'))}}>{action.label}</DropdownMenuItem>
              {i+1 < actionList.length && <DropdownMenuSeparator />}
            </>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
