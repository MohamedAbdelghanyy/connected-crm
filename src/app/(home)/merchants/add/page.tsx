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

export default function AddMerchantPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")

  const add = () => {
    console.log("Added");
  }
  
  return (
    <>       
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Add Merchant" text="Enter merchant's details"></DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <div className="space-y-2"></div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={2}>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                </Grid>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="other" className="w-full">Other</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="general" forceMount={true} hidden={activeTab !== "general"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter merchant's name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
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
                  <Label htmlFor="contactName">Person Of Contact Name</Label>
                  <Input type="text" id="contactname" placeholder="Enter person of contact name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Person Of Contact Number</Label>
                  <Input type="number" id="contactnumber" placeholder="Enter person of contact number" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="other" forceMount={true} hidden={activeTab !== "other"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input type="text" id="location" placeholder="Enter merchant's location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input type="text" id="website" placeholder="Enter merchant's website" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agreement">Signed Agreement</Label>
                  <Input type="file" id="agreement" placeholder="Upload Agreement File" />
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
