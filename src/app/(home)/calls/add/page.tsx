"use client"

import FormAddButton from "@/components/forms/form-add-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DateTimePicker } from "@/components/ui/custom/date-time-picker/date-time-picker"
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

export default function AddCallPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")

  const add = () => {
    console.log("Added");
  }

  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Add Call" text="Enter call details"></DashboardHeader>
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
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Customer 1">
                        <span className="font-medium">Mohamed Abdelghany</span>
                      </SelectItem>
                      <SelectItem value="Customer 2">
                        <span className="font-medium">Soha El Hadary</span>
                      </SelectItem>
                      <SelectItem value="Customer 3">
                        <span className="font-medium">Khaled Afify</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="other" forceMount={true} hidden={activeTab !== "other"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
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
                  <Label htmlFor="dateTimePicker">Call Date</Label>
                  <DateTimePicker granularity={"minute"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">
                        <span className="font-medium">Scheduled</span>
                      </SelectItem>
                      <SelectItem value="done">
                        <span className="font-medium">Done</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noted">Notes</Label>
                  <Textarea id="notes" placeholder="Enter notes..." />
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
