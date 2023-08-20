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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Textarea } from "../ui/textarea"

export default function AddLead({
  className,
  variant,
  ...props
}: ButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showNewLeadDialog, setShowNewLeadDialog] = React.useState(false)
  const userNameRef = React.useRef<HTMLInputElement>(null);

  async function saveLead() {
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
        setShowNewLeadDialog(false);
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
          setShowNewLeadDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Lead
      </button>
      <Dialog open={showNewLeadDialog} onOpenChange={setShowNewLeadDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Lead</DialogTitle>
            <DialogDescription>
              Enter lead details
            </DialogDescription>
          </DialogHeader>
          <div style={{maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px",}}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter lead's name" ref={userNameRef} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input type="number" id="mobile" placeholder="+201XXXXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="example@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automotive">
                      <span className="font-medium">Automotive</span>
                    </SelectItem>
                    <SelectItem value="lifestyle">
                      <span className="font-medium">Lifestyle</span>
                    </SelectItem>
                    <SelectItem value="realestate">
                      <span className="font-medium">Realestate</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buy">Buy</Label>
                <Input type="text" id="buy" placeholder="Enter buy" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sell">Sell</Label>
                <Input type="text" id="sell" placeholder="Enter sell" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">
                      <span className="font-medium">Active</span>
                    </SelectItem>
                    <SelectItem value="qualified">
                      <span className="font-medium">Qualified</span>
                    </SelectItem>
                    <SelectItem value="unqualified">
                      <span className="font-medium">Unqualified</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input type="number" id="rating" placeholder="Enter rating" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Enter notes" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">
                      <span className="font-medium">High</span>
                    </SelectItem>
                    <SelectItem value="medium">
                      <span className="font-medium">Medium</span>
                    </SelectItem>
                    <SelectItem value="low">
                      <span className="font-medium">Low</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="mr-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowNewLeadDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={saveLead}
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
