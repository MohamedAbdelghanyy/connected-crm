"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

export default function AddTag({
  className,
  variant,
  ...props
}: ButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showNewTagDialog, setShowNewTagDialog] = React.useState(false)
  const userNameRef = React.useRef<HTMLInputElement>(null);

  async function saveTag() {
    if(userNameRef.current && userNameRef.current.value){
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
      }else{
        setShowNewTagDialog(false);
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
      <button
        onClick={() =>{
          setShowNewTagDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Tag
      </button>
      <Dialog open={showNewTagDialog} onOpenChange={setShowNewTagDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Product Tag</DialogTitle>
            <DialogDescription>
              Enter Product Tag details
            </DialogDescription>
          </DialogHeader>
          <div style={{maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px",}}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tag</Label>
                <Input id="name" placeholder="Enter Tag" ref={userNameRef} />
              </div>
            </div>
          </div>
          <DialogFooter className="mr-4 ml-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowNewTagDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={saveTag}
              className={cn(
                buttonVariants({ variant }),
                {
                  "cursor-not-allowed opacity-60": isLoading,
                },
              ) + " mb-2"}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (<></>)}
              Continue
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
