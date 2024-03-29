import AddRole from "@/components/forms/add-role"
import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { DashboardHeader } from "@/components/other/header"
import { DashboardShell } from "@/components/other/shell"
import { DataTable } from "@/components/table/data-table"
import { rolesWidgetTableColumns, rolesWidgetTableToolbar, rolesWidgetTableToolbarSearchList } from "./config"

export default function RolesWidget({ selectedUnit, roles }: any) {
  const selectedUnitName = selectedUnit == -1 ? "Select a Unit" : selectedUnit.name;
  return (
    selectedUnit != -1 ?
      (<>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={String(selectedUnitName)}>
            <AddRole roles={roles} />
          </DashboardHeader>
        </DashboardShell>
        <div className="m-2">
          {roles && roles.length > 0 ? (
            <DataTable data={roles} columns={rolesWidgetTableColumns} toolbar={rolesWidgetTableToolbar} toolbarSearchList={rolesWidgetTableToolbarSearchList} />
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Roles</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any roles yet.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>)}
        </div>
      </>) : (
        <p className="mt-6">Select an organization unit to see roles</p>
      )
  )
}