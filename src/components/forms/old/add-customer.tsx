"use client"

import * as React from "react"
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
import { useRouter } from 'next/navigation'

export default function AddCustomer({
  className,
  variant,
  ...props
}: ButtonProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showNewCustomerDialog, setShowNewCustomerDialog] = React.useState(false)
  const userNameRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function saveCustomer() {
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
        setShowNewCustomerDialog(false);
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
          router.push('/customers/add', { scroll: false })
          //setShowNewCustomerDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Customer
      </button>
      <Dialog open={showNewCustomerDialog} onOpenChange={setShowNewCustomerDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Customer</DialogTitle>
            <DialogDescription>
              Enter customer details
            </DialogDescription>
          </DialogHeader>
          <div style={{maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px",}}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="customertype">Customer Type</Label>
                <Select>
                  <SelectTrigger aria-label="cutomertype">
                    <SelectValue placeholder="Select customer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vip">
                      <span className="font-medium">VIP</span>
                    </SelectItem>
                    <SelectItem value="topvip">
                      <span className="font-medium">Top VIP</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" aria-label="name" placeholder="Enter customer's name" ref={userNameRef} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input type="number" aria-label="mobile" id="mobile" placeholder="+201XXXXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" aria-label="email" id="email" placeholder="example@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input type="number" aria-label="age" id="age" placeholder="Enter customer's age" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select>
                  <SelectTrigger aria-label="gender">
                    <SelectValue placeholder="Select customer's gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">
                      <span className="font-medium">Male</span>
                    </SelectItem>
                    <SelectItem value="female">
                      <span className="font-medium">Female</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger aria-label="country">
                    <SelectValue placeholder="Select customer's country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="egypt">
                      <span className="font-medium">Egypt</span>
                    </SelectItem>
                    <SelectItem value="uae">
                      <span className="font-medium">UAE</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input type="text" aria-label="address" id="address" placeholder="Enter customer's address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input type="text" aria-label="occupation" id="occupation" placeholder="Enter customer's occupation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input type="text" aria-label="company" id="company" placeholder="Enter customer's company" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Select>
                  <SelectTrigger aria-label="interests">
                    <SelectValue placeholder="Select customer's interests" />
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
            </div>
          </div>
          <DialogFooter className="mr-4 ml-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowNewCustomerDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={saveCustomer}
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
