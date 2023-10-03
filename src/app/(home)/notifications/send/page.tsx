"use client"

import FormAddButton from "@/components/forms/form-add-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function AddNotificationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")
  const [isVisible, setIsVisible] = React.useState(false)
  const [isExclusive, setIsExclusive] = React.useState(false)

  const add = () => {
    console.log("Added");
  }

  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Send Notification" text="Enter notification details"></DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <div className="space-y-2"></div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                  <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="general" forceMount={true} hidden={activeTab !== "general"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter notification title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter notification description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="navigateTo">Navigate To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select navigate to" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        <span className="font-medium">None</span>
                      </SelectItem>
                      <SelectItem value="notificationCenter">
                        <span className="font-medium">Notification Center</span>
                      </SelectItem>
                      <SelectItem value="item">
                        <span className="font-medium">Item</span>
                      </SelectItem>
                      <SelectItem value="category">
                        <span className="font-medium">Category</span>
                      </SelectItem>
                      <SelectItem value="home">
                        <span className="font-medium">Home</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiver">Receiver</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select receiver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <span className="font-medium">All</span>
                      </SelectItem>
                      <SelectItem value="Mohamed Abdelghany">
                        <span className="font-medium">Mohamed Abdelghany</span>
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
