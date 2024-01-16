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
import { Textarea } from "@/components/ui/textarea"

export default function AddTopic({
  className,
  variant,
  ...props
}: ButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showNewTopicDialog, setShowNewTopicDialog] = React.useState(false)
  const userNameRef = React.useRef<HTMLInputElement>(null);

  async function saveTopic() {
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
        setShowNewTopicDialog(false);
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
          setShowNewTopicDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Topic
      </button>
      <Dialog open={showNewTopicDialog} onOpenChange={setShowNewTopicDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Topic</DialogTitle>
            <DialogDescription>
              Enter topic details
            </DialogDescription>
          </DialogHeader>
          <div style={{maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px",}}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Topic Name</Label>
                <Input id="name" aria-label="name" placeholder="Enter topic's name" ref={userNameRef} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" aria-label="image" id="image" placeholder="Upload Topic Image" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details">Details</Label>
                <Textarea id="details" aria-label="details" placeholder="Enter topic's details" />
              </div>
            </div>
          </div>
          <DialogFooter className="mr-4 ml-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowNewTopicDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={saveTopic}
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
