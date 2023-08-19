import * as React from "react"

import { cn } from "@/lib/utils"

import { Check, ChevronsUpDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ToolbarSearchListProps } from "./table/data-table-toolbar"
import { Table } from "@tanstack/react-table"

interface InputProps<TData>
  extends React.InputHTMLAttributes<HTMLInputElement> {
    table: Table<TData>,
    toolbarSearchList: ToolbarSearchListProps[]
  }

export function FilterInput<TData>({
  table,
  toolbarSearchList,
  className,
  type,
  ...props
}: InputProps<TData>){
  const [isOpenMenu, setIsOpenMenu] = React.useState(false)
  const [filterValue, setFilterValue] = React.useState(toolbarSearchList[0].key)

   const handleSearchFilterChanged = (newValue : string) => {
    table.getColumn(filterValue)?.setFilterValue('');
    setFilterValue(newValue);
    setIsOpenMenu(false);
   }

   console.log(toolbarSearchList)

  return (
    <>
      <Popover open={isOpenMenu} onOpenChange={setIsOpenMenu}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpenMenu}
            className="w-[200px] justify-between"
          >
            {filterValue
              ? toolbarSearchList.find((item) => item.key === filterValue)?.title
              : "Select filter..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search filters..." />
            <CommandEmpty>No filter found.</CommandEmpty>
            <CommandGroup>
              {toolbarSearchList.map((item) => (
                <CommandItem
                  key={item.key}
                  onSelect={()=>handleSearchFilterChanged(item.key)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      filterValue === item.key ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        placeholder={ "Filter By " + toolbarSearchList.find((item) => item.key === filterValue)?.title + "..." }
        value={(table.getColumn(filterValue)?.getFilterValue() as string) ?? ""}
        onChange={(event) => {
            table.getColumn(filterValue)?.setFilterValue(event.target.value)
          }
        }
        {...props}
      />
    </>
  )
}