"use client"

import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Checkbox } from "../../ui/checkbox"

export default function PermissionsDialog({ showDialog, setShowDialog, permissions, role }: any) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")
  const userNameRef = React.useRef<HTMLInputElement>(null);

  async function save() {
    if (userNameRef.current && userNameRef.current.value) {
      setIsLoading(true)

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Untitled Post",
        }),
      })

      setIsLoading(false)

      if (!response?.ok) {
        return toast({
          title: "Something went wrong.",
          description: "An error occurred while adding " + userNameRef.current.value + ", Please try again.",
          variant: "destructive",
        })
      } else {
        setShowDialog(false);
        return toast({
          title: "Success",
          description: userNameRef.current.value + " was successfully added.",
        })
      }

      // This forces a cache invalidation.
      router.refresh()
    }
  }

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Permissions - {role}</DialogTitle>
            <DialogDescription>
              Select permissions
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <div className="ml-4 mr-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general" >General</TabsTrigger>
                <TabsTrigger value="language">Language</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
            </div>
            <div style={{ maxHeight: "50vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px", }}>
              <TabsContent value="general" forceMount={true} hidden={activeTab !== "general"}>
                <div className="space-y-4 py-2 pb-4">
                  {
                    permissions.general.map((permission: any) => {
                      return (
                        generatePermissionsTree(permission, 0)
                      )
                    })
                  }
                </div>
              </TabsContent>
              <TabsContent value="language" forceMount={true} hidden={activeTab !== "language"}>
                <div className="space-y-4 py-2 pb-4">
                  {
                    permissions.language.map((permission: any) => {
                      return (
                        generatePermissionsTree(permission, 0)
                      )
                    })
                  }
                </div>
              </TabsContent>
              <TabsContent value="other" forceMount={true} hidden={activeTab !== "other"}>
                <div className="space-y-4 py-2 pb-4">
                  {
                    permissions.other.map((permission: any) => {
                      return (
                        generatePermissionsTree(permission, 0)
                      )
                    })
                  }
                </div>
              </TabsContent>
            </div>
          </Tabs>
          <DialogFooter className="mr-4 ml-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={save}
              className={cn(
                buttonVariants(),
                {
                  "cursor-not-allowed opacity-60": isLoading,
                },
              ) + " mb-2"}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (<></>)}
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}


function generatePermissionsTree(permission: any, marginSize: number) {
  return (<>
    <div className="flex items-center space-x-2" style={{ paddingLeft: marginSize * 6 + "px" }}>
      <Checkbox id={permission.id} />
      <label
        htmlFor={permission.id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {permission.name}
      </label>
    </div>
    {permission.subPermissions ?
      permission.subPermissions.map((subPermission: any) => {
        return generatePermissionsTree(subPermission, marginSize + 4)
      })
      : <></>}
  </>)
}
