"use client"

import ClaimsDialog from "@/components/roles/claims-dialog/claims-dialog"
import PermissionsDialog from "@/components/roles/permissions-dialog/permissions-dialog"
import { DataTable } from "@/components/table/data-table"
import { useRouter } from "next/navigation"
import * as React from "react"
import { rolesActionList, rolesTableColumns, rolesTableToolbar, rolesTableToolbarSearchList } from "./config"

export default function RolesPageContent({ roles, permissions, claims }: any) {
    const router = useRouter()
    const [showPermissionsDialog, setShowPermissionsDialog] = React.useState<boolean>(false)
    const [showClaimsDialog, setShowClaimsDialog] = React.useState<boolean>(false)
    const [selectedRole, setSelectedRole] = React.useState<string>("")

    rolesActionList[0].action = (id: string) => {
        setShowPermissionsDialog(true);
        setSelectedRole(id);
    }

    rolesActionList[1].action = (id: string) => {
        setShowClaimsDialog(true);
        setSelectedRole(id);
    }

    return (
        <>
            <PermissionsDialog showDialog={showPermissionsDialog} setShowDialog={setShowPermissionsDialog} permissions={permissions} role={selectedRole} />
            <ClaimsDialog showDialog={showClaimsDialog} setShowDialog={setShowClaimsDialog} claims={claims} role={selectedRole} />
            <DataTable data={roles} columns={rolesTableColumns} toolbar={rolesTableToolbar} toolbarSearchList={rolesTableToolbarSearchList} />
        </>
    )
}