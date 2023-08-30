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
import { Textarea } from "@/components/ui/textarea"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function AddLeadPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")

  const add = () => {
    console.log("Added");
  }
  
  return (
    <>       
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Add Lead" text="Enter lead's details"></DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <div className="space-y-2"></div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={2}>
                <Grid item sm={4} xs={6}>
                  <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                </Grid>
                <Grid item sm={4} xs={6}>
                  <TabsTrigger value="other" className="w-full">Other</TabsTrigger>
                </Grid>
                <Grid item sm={4} xs={6}>
                  <TabsTrigger value="settings" className="w-full">Settings</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="general" forceMount={true} hidden={activeTab !== "general"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter lead's name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input type="number" id="mobile" placeholder="+201XXXXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="example@example.com" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="other" forceMount={true} hidden={activeTab !== "other"}>
              <div className="space-y-4 py-2 pb-4">
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
              </div>
            </TabsContent>
            <TabsContent value="settings" forceMount={true} hidden={activeTab !== "settings"}>
              <div className="space-y-4 py-2 pb-4">
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">
                        <span className="font-medium">0</span>
                      </SelectItem>
                      <SelectItem value="1">
                        <span className="font-medium">1</span>
                      </SelectItem>
                      <SelectItem value="2">
                        <span className="font-medium">2</span>
                      </SelectItem>
                      <SelectItem value="4">
                        <span className="font-medium">3</span>
                      </SelectItem>
                      <SelectItem value="5">
                        <span className="font-medium">4</span>
                      </SelectItem>
                      <SelectItem value="6">
                        <span className="font-medium">5</span>
                      </SelectItem>
                      <SelectItem value="7">
                        <span className="font-medium">6</span>
                      </SelectItem>
                      <SelectItem value="8">
                        <span className="font-medium">7</span>
                      </SelectItem>
                      <SelectItem value="9">
                        <span className="font-medium">8</span>
                      </SelectItem>
                      <SelectItem value="10">
                        <span className="font-medium">9</span>
                      </SelectItem>
                      <SelectItem value="3">
                        <span className="font-medium">10</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Enter notes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moh">
                        <span className="font-medium">Mohamed Abdelghany</span>
                      </SelectItem>
                      <SelectItem value="khal">
                        <span className="font-medium">Khaled Afify</span>
                      </SelectItem>
                      <SelectItem value="soh">
                        <span className="font-medium">Soha El Hadary</span>
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
