"use client"

import FormAddButton from "@/components/forms/form-add-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function AddHighlightPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")

  const add = () => {
    console.log("Added");
  }
  
  return (
    <>       
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Add Highlight" text="Enter highlight's details"></DashboardHeader>
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
                  <TabsTrigger value="media" className="w-full">Media</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="general" forceMount={true} hidden={activeTab !== "general"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Highlight Name</Label>
                  <Input id="name" placeholder="Enter highlight's name" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="media" forceMount={true} hidden={activeTab !== "media"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Input type="file" id="image" placeholder="Upload Highlight Image" />
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
