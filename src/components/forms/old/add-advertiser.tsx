import { Icons } from "@/components/other/icons";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import * as React from "react";

export default function AddAdvertiser({
  variant,
}: ButtonProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showNewAdvertiserDialog, setShowNewAdvertiserDialog] = React.useState(false)
  const userNameRef = React.useRef<HTMLInputElement>(null);

  async function saveAdvertiser() {
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
        setShowNewAdvertiserDialog(false);
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
        onClick={() => {
          setShowNewAdvertiserDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Advertiser
      </button>
      <Dialog open={showNewAdvertiserDialog} onOpenChange={setShowNewAdvertiserDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Advertiser</DialogTitle>
            <DialogDescription>
              Enter advertiser details
            </DialogDescription>
          </DialogHeader>
          <div style={{ maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px", }}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Advertiser Logo</Label>
                <Input type="file" aria-label="logo" id="logo" placeholder="Upload advertiser's Logo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Advertiser Name</Label>
                <Input id="name" aria-label="name" placeholder="Enter advertiser's name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <Input id="link" aria-label="link" placeholder="Link" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkTitle">Link Title</Label>
                <Input id="linkTitle" aria-label="linkTitle" placeholder="Link Title" />
              </div>
            </div>
          </div>
          <DialogFooter className="mr-4 ml-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowNewAdvertiserDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={saveAdvertiser}
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
