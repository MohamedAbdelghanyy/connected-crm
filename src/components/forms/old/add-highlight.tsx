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

export default function AddHighlight({
  className,
  variant,
  ...props
}: ButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showNewHighlightDialog, setShowNewHighlightDialog] = React.useState(false)
  const userNameRef = React.useRef<HTMLInputElement>(null);

  async function saveHighlight() {
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
        setShowNewHighlightDialog(false);
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
          setShowNewHighlightDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Highlight
      </button>
      <Dialog open={showNewHighlightDialog} onOpenChange={setShowNewHighlightDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Highlight</DialogTitle>
            <DialogDescription>
              Enter highlight details
            </DialogDescription>
          </DialogHeader>
          <div style={{maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px",}}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Highlight Name</Label>
                <Input id="name" aria-label="name" placeholder="Enter highlight's name" ref={userNameRef} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" aria-label="image" id="image" placeholder="Upload Highlight Image" />
              </div>
            </div>
          </div>
          <DialogFooter className="mr-4 ml-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowNewHighlightDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={saveHighlight}
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
