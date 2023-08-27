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
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"

export default function AddCustomer({
  className,
  variant,
  ...props
}: ButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showNewCustomerDialog, setShowNewCustomerDialog] = React.useState(false)
  const userNameRef = React.useRef<HTMLInputElement>(null);

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
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Add Customer" text="Enter your customer details">
        </DashboardHeader>
      </DashboardShell>
      <div className="m-2"></div>
      <div className="ml-3">
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="customertype">Customer Type</Label>
            <Select>
              <SelectTrigger>
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
            <Input id="name" placeholder="Enter customer's name" ref={userNameRef} />
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
            <Label htmlFor="age">Age</Label>
            <Input type="number" id="age" placeholder="Enter customer's age" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select>
              <SelectTrigger>
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
              <SelectTrigger>
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
            <Input type="text" id="address" placeholder="Enter customer's address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input type="text" id="occupation" placeholder="Enter customer's occupation" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input type="text" id="company" placeholder="Enter customer's company" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interests">Interests</Label>
            <Select>
              <SelectTrigger>
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
          <div style={{width: "100%", textAlign: "center", marginTop: "20px"}}>
            <button
              onClick={saveCustomer}
              style={{width: "150px"}}
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
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
