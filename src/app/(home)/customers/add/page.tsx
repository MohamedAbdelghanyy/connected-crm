"use client"

import FormAddButton from "@/components/forms/form-add-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function AddCustomerPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")

  const add = () => {
    console.log("Added");
  }
  
  return (
    <>       
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Add Customer" text="Enter customer's details"></DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <div className="space-y-2"></div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                  <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                </Grid>
                <Grid item sm={4} xs={6}>
                  <TabsTrigger value="location" className="w-full">Location</TabsTrigger>
                </Grid>
                <Grid item sm={4} xs={6}>
                  <TabsTrigger value="other" className="w-full">Other</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="general" forceMount={true} hidden={activeTab !== "general"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter customer's name" />
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
              </div>
            </TabsContent>
            <TabsContent value="location" forceMount={true} hidden={activeTab !== "location"}>
              <div className="space-y-4 py-2 pb-4">
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
              </div>
            </TabsContent>
            <TabsContent value="other" forceMount={true} hidden={activeTab !== "other"}>
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
              </div>
            </TabsContent>
            <FormAddButton isLoading={isLoading} callback={add} />
          </div>
        </Tabs>
      </div>
    </>
  )
}
