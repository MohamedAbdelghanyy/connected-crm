"use client"

import FormAddButton from "@/components/forms/form-add-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function AddAdPage() {
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
        <DashboardHeader heading="Add Ad." text="Enter ad's details"></DashboardHeader>
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
                  <TabsTrigger value="media" className="w-full">Media</TabsTrigger>
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
                  <Label htmlFor="title">Ad Title</Label>
                  <Input id="title" placeholder="Enter ad title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Ad Description</Label>
                  <Textarea id="description" placeholder="Enter ad. description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Advertiser Name</Label>
                  <Input id="name" placeholder="Enter advertiser's name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Link</Label>
                  <Input id="link" placeholder="Link" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkTitle">Link Title</Label>
                  <Input id="linkTitle" placeholder="Link Title" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="media" forceMount={true} hidden={activeTab !== "media"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="logo">Advertiser Logo</Label>
                  <Input type="file" id="logo" placeholder="Upload advertiser's Logo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Ad. Image</Label>
                  <Input type="file" id="image" placeholder="Upload ad. image" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="settings" forceMount={true} hidden={activeTab !== "settings"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2" style={{justifyContent: "space-between", display: "flex"}}>
                  <Label style={{textAlign: "left"}} className="mt-3">Visible</Label>
                  <Switch
                    checked={isVisible}
                    onCheckedChange={setIsVisible}
                  />
                </div>
                <div className="space-y-2" style={{justifyContent: "space-between", display: "flex"}}>
                  <Label style={{textAlign: "left"}} className="mt-3">Exclusive</Label>
                  <Switch
                    checked={isExclusive}
                    onCheckedChange={setIsExclusive}
                  />
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
