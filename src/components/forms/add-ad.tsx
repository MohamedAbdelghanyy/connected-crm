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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "../ui/switch"

export default function AddAd({
  className,
  variant,
  ...props
}: ButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showNewAdDialog, setShowNewAdDialog] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isExclusive, setIsExclusive] = React.useState(false)
  const userNameRef = React.useRef<HTMLInputElement>(null);

  async function saveAd() {
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
        setShowNewAdDialog(false);
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
          setShowNewAdDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Ad.
      </button>
      <Dialog open={showNewAdDialog} onOpenChange={setShowNewAdDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Advertisement</DialogTitle>
            <DialogDescription>
              Enter advertisement details
            </DialogDescription>
          </DialogHeader>
          <div style={{maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px",}}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="title">Ad Title</Label>
                <Input id="title" placeholder="Enter ad title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Advertiser Logo</Label>
                <Input type="file" id="logo" placeholder="Upload advertiser's Logo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Advertiser Name</Label>
                <Input id="name" placeholder="Enter advertiser's name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" placeholder="Upload ad. image" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <Input id="link" placeholder="Link" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkTitle">Link Title</Label>
                <Input id="linkTitle" placeholder="Link Title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter ad. description" />
              </div>
              <div className="space-y-2" style={{justifyContent: "space-between", display: "flex"}}>
                <Label style={{textAlign: "left"}} className="mt-3">Visible</Label>
                <Switch
                  checked={isVisible}
                  onCheckedChange={setIsVisible}
                />
              </div>
              <div className="space-y-2" style={{justifyContent: "space-between", display: "flex"}}>
                <Label style={{textAlign: "left"}} className="mt-3">Exclusive</Label>
                <Switch
                  checked={isExclusive}
                  onCheckedChange={setIsExclusive}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="mr-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowNewAdDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={saveAd}
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
