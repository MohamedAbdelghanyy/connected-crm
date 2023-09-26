"use client"

import FormAddButton from "@/components/forms/form-add-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function AddLanguagePage() {
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
        <DashboardHeader heading="Add Language" text="Enter language details"></DashboardHeader>
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
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" placeholder="Enter display name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cultureName">Culture Name</Label>
                  <Input id="cultureName" placeholder="Enter culture name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uiCultureName">UI Culture Name</Label>
                  <Input id="uiCultureName" placeholder="Enter UI culture name" />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Enabled</Label>
                  <Switch
                    checked={enabled}
                    onCheckedChange={setEnabled}
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
