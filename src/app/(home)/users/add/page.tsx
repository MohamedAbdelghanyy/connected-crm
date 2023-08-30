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

export default function AddUserPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")

  const add = () => {
    console.log("Added");
  }
  
  return (
    <>       
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Add User" text="Enter user's details"></DashboardHeader>
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
                  <Input id="name" placeholder="Enter user's name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="example@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input type="text" id="jobTitle" placeholder="Enter user's job title" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="settings" forceMount={true} hidden={activeTab !== "settings"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="dashboardtype">Dashboard Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dashboard type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <span className="font-medium">Admin</span>
                      </SelectItem>
                      <SelectItem value="superAdmin">
                        <span className="font-medium">Super Admin</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accessName">Access Name</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <span className="font-medium">Admin</span>
                      </SelectItem>
                      <SelectItem value="superAdmin">
                        <span className="font-medium">Super Admin</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="privileges">Privileges</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select privileges" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <span className="font-medium">All</span>
                      </SelectItem>
                      <SelectItem value="some">
                        <span className="font-medium">Some</span>
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
