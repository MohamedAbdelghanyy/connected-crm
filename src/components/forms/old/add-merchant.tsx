import { Icons } from "@/components/other/icons"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import * as React from "react"

export default function AddMerchant({
  variant,
}: ButtonProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showNewMerchantDialog, setShowNewMerchantDialog] = React.useState(false)
  const userNameRef = React.useRef<HTMLInputElement>(null);

  async function saveMerchant() {
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
        setShowNewMerchantDialog(false);
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
          setShowNewMerchantDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Merchant
      </button>
      <Dialog open={showNewMerchantDialog} onOpenChange={setShowNewMerchantDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Merchant</DialogTitle>
            <DialogDescription>
              Enter merchant details
            </DialogDescription>
          </DialogHeader>
          <div style={{ maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px", }}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" aria-label="name" placeholder="Enter merchant's name" ref={userNameRef} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger aria-label="category">
                    <SelectValue placeholder="Select merchant's category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category1">
                      <span className="font-medium">Category 1</span>
                    </SelectItem>
                    <SelectItem value="category2">
                      <span className="font-medium">Category 2</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input type="text" aria-label="location" id="location" placeholder="Enter merchant's location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName">Person Of Contact Name</Label>
                <Input type="text" aria-label="contactName" id="contactname" placeholder="Enter person of contact name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input type="text" aria-label="website" id="website" placeholder="Enter merchant's website" />
              </div>
            </div>
          </div>
          <DialogFooter className="mr-4 ml-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowNewMerchantDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={saveMerchant}
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
