'use client'

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import ClaimsDialog from "@/components/roles/claims-dialog/claims-dialog"
import PermissionsDialog from "@/components/roles/permissions-dialog/permissions-dialog"
import { DashboardShell } from "@/components/shell"
import { DynamicDataTable } from "@/components/table/dynamic-data-table"
import { buttonVariants } from "@/components/ui/button"
import { errorHandler } from "@/components/ui/custom/error-handler"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import axios from "@/services/axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import RoleLoading from "../[role]/(view)/loading"
import { rolesActionList, rolesTableColumns, rolesTableToolbar, rolesTableToolbarSearchList } from "./config"

export default function RolesPage() {
  const [roles, setRoles] = useState<Array<any> | null>(null);
  const [permissions, setPermissions] = useState<Array<any> | null>(null);
  const [claims, setClaims] = useState<Array<any> | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState<boolean>(false);
  const [showClaimsDialog, setShowClaimsDialog] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    axios.get('/identity/roles', {
      params: {
        SkipCount: (currentPageNumber - 1) * numberOfItemsPerPage,
        MaxResultCount: numberOfItemsPerPage
      },
    })
      .then(function (response) {
        setNumberOfPages(Math.ceil(response.data.totalCount / numberOfItemsPerPage));
        setRoles(response.data.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [currentPageNumber, numberOfItemsPerPage]);

  useEffect(() => {
    // Load Permissins & Claims
    setPermissions([]);
    setClaims([]);
    rolesActionList[0].action = (id: string) => {
      setShowPermissionsDialog(true);
      setSelectedRole(id);
    }

    rolesActionList[1].action = (id: string) => {
      setShowClaimsDialog(true);
      setSelectedRole(id);
    }
  }, []);


  return (
    roles ?
      <>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Roles" text="Manage your roles">
            <Link href="/roles/add" className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Role</Link>
          </DashboardHeader>
        </DashboardShell>
        <div className="m-2">
          {roles.length > 0 ? (
            <>
              {permissions &&
                PermissionStatus.length > 0 &&
                <PermissionsDialog showDialog={showPermissionsDialog} setShowDialog={setShowPermissionsDialog} permissions={permissions} role={selectedRole} />}
              {claims &&
                claims.length > 0 &&
                < ClaimsDialog showDialog={showClaimsDialog} setShowDialog={setShowClaimsDialog} claims={claims} role={selectedRole} />}
              <DynamicDataTable
                data={roles}
                columns={rolesTableColumns}
                toolbar={rolesTableToolbar}
                toolbarSearchList={rolesTableToolbarSearchList}
                pagination={{
                  numberOfItemsPerPage,
                  currentPageNumber,
                  numberOfPages,
                  setNumberOfItemsPerPage,
                  setCurrentPageNumber,
                }}
              />
            </>
          ) : (<EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Roles</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any roles yet.
            </EmptyPlaceholder.Description>
            <Link href="/roles/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Role</Link>
          </EmptyPlaceholder>)}
        </div>
      </>
      : <RoleLoading />
  )
}