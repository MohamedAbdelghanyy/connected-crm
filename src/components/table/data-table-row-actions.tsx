import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { SettingsIcon } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          style={{ width: "100%" }}
          className="flex h-8 w-8 p-3 data-[state=open]:bg-muted"
        >
          <SettingsIcon className="h-4 w-4" />
          <p className="ml-1" style={{ fontSize: "12px" }}>Actions</p>
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {actionList.map((action, i) => (
          <Fragment key={action.label}>
            {action.action || action.redirect ? (
              <DropdownMenuItem
                onClick={() => {
                  if (action.action) {
                    action.action(row.getValue('id'));
                  } else if (action.redirect) {
                    navigate(action.redirect(row.getValue('id')));
                  }
                }}
              >
                {action.label}
              </DropdownMenuItem>
            ) : action.subActions ? (
              <DropdownMenuSub key={action.label}>
                <DropdownMenuSubTrigger>
                  <span>{action.label}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {action.subActions.map((subAction) => (
                      <Fragment key={subAction.label}>
                        {subAction.subActions ? (
                          <DropdownMenuSub key={subAction.label}>
                            <DropdownMenuSubTrigger>
                              <span>{subAction.label}</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {subAction.subActions.map((subAction2) => (
                                  <DropdownMenuItem
                                    key={subAction2.label}
                                    onClick={() => {
                                      if (subAction2.action) {
                                        subAction2.action(row.getValue('id'));
                                      } else if (subAction2.redirect) {
                                        navigate(subAction2.redirect(row.getValue('id')));
                                      }
                                    }}
                                  >
                                    <span>{subAction2.label}</span>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        ) : (
                          <DropdownMenuItem
                            key={subAction.label}
                            onClick={() => {
                              if (subAction.action) {
                                subAction.action(row.getValue('id'));
                              } else if (subAction.redirect) {
                                navigate(subAction.redirect(row.getValue('id')));
                              }
                            }}
                          >
                            <span>{subAction.label}</span>
                          </DropdownMenuItem>
                        )}
                        {i + 1 < actionList.length && <DropdownMenuSeparator />}
                      </Fragment>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : null}
            {i + 1 < actionList.length && <DropdownMenuSeparator />}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
