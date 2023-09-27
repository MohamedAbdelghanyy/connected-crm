"use client"

import OrganizationTreeSelect from "@/components/dashboard-users/organization-tree-select"
import FormAddButton from "@/components/forms/form-add-button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function AddUserTabs({ units }: any) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")

  const add = () => {
    console.log("Added");
  }

  return (
    <div className="space-y-4 pb-4 px-2">
      <div className="space-y-2"></div>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
        <div>
          <TabsList className="w-full h-full">
            <Grid container spacing={2}>
              <Grid item sm={4} xs={6}>
                <TabsTrigger value="general" className="w-full">General</TabsTrigger>
              </Grid>
              <Grid item sm={4} xs={3}>
                <TabsTrigger value="roles" className="w-full">Roles</TabsTrigger>
              </Grid>
              <Grid item sm={4} xs={3}>
                <TabsTrigger value="units" className="w-full">Units</TabsTrigger>
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input type="number" id="phone" placeholder="Enter user's phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="example@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="Enter user's password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input type="text" id="jobTitle" placeholder="Enter user's job title" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="active" />
                <label
                  htmlFor="active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Active
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="shouldChangePassword" />
                <label
                  htmlFor="shouldChangePassword"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Should change password on next login
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="accountLockout" />
                <label
                  htmlFor="accountLockout"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Account Lockout
                </label>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="roles" forceMount={true} hidden={activeTab !== "roles"}>
            <div className="space-y-4 py-2 pb-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="manager" />
                <label
                  htmlFor="manager"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Manager
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="moderator" />
                <label
                  htmlFor="moderator"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Moderator
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="supporter" />
                <label
                  htmlFor="moderator"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Supporter
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="admin" />
                <label
                  htmlFor="admin"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Admin
                </label>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="units" forceMount={true} hidden={activeTab !== "units"}>
            <div className="space-y-4 py-2 pb-4">
              <OrganizationTreeSelect units={units} updateSelection={() => { }} />
            </div>
          </TabsContent>
          <FormAddButton isLoading={isLoading} callback={add} />
        </div>
      </Tabs>
    </div>
  )
}