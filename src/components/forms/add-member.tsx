import { Icons } from "@/components/other/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import * as React from "react"
import { membersTableColumns, membersTableToolbar, membersTableToolbarSearchList } from "../organization-units/members/config"
import { DataTable } from "../table/data-table"

export default function AddMember({ users }: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showDialog, setShowDialog] = React.useState(false)
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

    }
  }

  return (
    <>
      <button
        style={{ float: "right" }}
        onClick={() => {
          setShowDialog(true);
        }}
        className={cn(
          buttonVariants(),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Member
      </button>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent style={{ minWidth: "70%" }}>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Member</DialogTitle>
            <DialogDescription>
              Select users to add
            </DialogDescription>
          </DialogHeader>
          <div style={{ maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px", }}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <DataTable data={users} columns={membersTableColumns} toolbar={membersTableToolbar} toolbarSearchList={membersTableToolbarSearchList} />
              </div>
            </div>
          </div>
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
              Add
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
