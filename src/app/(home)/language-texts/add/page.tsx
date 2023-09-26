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

export default function AddLanguageTextPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")
  const [enabled, setEnabled] = React.useState(false)

  const add = () => {
    console.log("Added");
  }

  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Add Language Text" text="Enter language text details"></DashboardHeader>
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
                  <Label htmlFor="key">Key</Label>
                  <Input id="key" placeholder="Enter key" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baseValue">Base Value</Label>
                  <Input id="baseValue" placeholder="Enter base value" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input id="value" placeholder="Enter value" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resourceName">Resource Name</Label>
                  <Input id="resourceName" placeholder="Enter resource name" />
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
