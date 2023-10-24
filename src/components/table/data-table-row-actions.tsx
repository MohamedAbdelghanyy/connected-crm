"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { SettingsIcon } from "lucide-react"
import { useRouter } from 'next/navigation'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  actionList: ActionListProps[]
}

export interface ActionListProps {
  type: string,
  label: string;
  redirect?: (id: string) => string;
  action?: (id: string) => void;
  subActions?: ActionListProps[];
}

export function DataTableRowActions<TData>({
  row,
  actionList
}: DataTableRowActionsProps<TData>) {

  const { push } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          //variant="ghost"
          style={{ width: "100%" }}
          className="flex h-8 w-8 p-3 data-[state=open]:bg-muted"
        >
          {/* <MoreHorizontalIcon className="h-4 w-4" />*/}
          <SettingsIcon className="h-4 w-4" />
          <p className="ml-1" style={{ fontSize: "12px" }}>Actions</p>
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {actionList.map((action, i) => {
          return (
            <>
              {
                action.action || action.redirect ?
                  (<DropdownMenuItem
                    key={action.label}
                    onClick={() => {
                      if (action.action) {
                        action.action(row.getValue('id'));
                      } else if (action.redirect) {
                        push(action.redirect(row.getValue('id')));
                      }
                    }}>{action.label}</DropdownMenuItem>)
                  : action.subActions ? (
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <span>{action.label}</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {
                            action.subActions.map((subAction) => (
                              subAction.subActions ? (
                                <DropdownMenuSub>
                                  <DropdownMenuSubTrigger>
                                    <span>{subAction.label}</span>
                                  </DropdownMenuSubTrigger>
                                  <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                      {
                                        subAction.subActions.map((subAction) => (
                                          <DropdownMenuItem
                                            key={subAction.label}
                                            onClick={() => {
                                              if (subAction.action) {
                                                subAction.action(row.getValue('id'));
                                              } else if (subAction.redirect) {
                                                push(subAction.redirect(row.getValue('id')));
                                              }
                                            }}>
                                            <span>{subAction.label}</span>
                                          </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                  </DropdownMenuPortal>
                                </DropdownMenuSub>) :
                                (<DropdownMenuItem
                                  key={subAction.label}
                                  onClick={() => {
                                    if (subAction.action) {
                                      subAction.action(row.getValue('id'));
                                    } else if (subAction.redirect) {
                                      push(subAction.redirect(row.getValue('id')));
                                    }
                                  }}>
                                  <span>{subAction.label}</span>
                                </DropdownMenuItem>)
                            ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>) : (<></>)
              }
              {i + 1 < actionList.length && <DropdownMenuSeparator />}
            </>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
