"use client"

import FormAddButton from "@/components/forms/form-add-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DateTimePicker } from "@/components/ui/custom/date-time-picker/date-time-picker"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function AddSubscriptionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")
  const [isRefundAllowed, setIsRefundAllowed] = React.useState(false)
  const [isActive, setIsActive] = React.useState(false)
  const [isRefunded, setIsRefunded] = React.useState(false)

  const add = () => {
    console.log("Added");
  }

  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Add Subscription" text="Enter subscription details"></DashboardHeader>
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
                  <Label htmlFor="assignedTo">Customer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mohamedAbdelghany">
                        <span className="font-medium">Mohamed Abdelghany</span>
                      </SelectItem>
                      <SelectItem value="khaledAfify">
                        <span className="font-medium">Khaled Afify</span>
                      </SelectItem>
                      <SelectItem value="sohaElHadary">
                        <span className="font-medium">Soha El Hadary</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subscription">Subscription</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subscription" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gold">
                        <span className="font-medium">Gold</span>
                      </SelectItem>
                      <SelectItem value="platinum">
                        <span className="font-medium">Platinum</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <DateTimePicker granularity={"minute"} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <DateTimePicker granularity={"minute"} />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Refund Allowed</Label>
                  <Switch
                    checked={isRefundAllowed}
                    onCheckedChange={setIsRefundAllowed}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Active</Label>
                  <Switch
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Refunded</Label>
                  <Switch
                    checked={isRefunded}
                    onCheckedChange={setIsRefunded}
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
