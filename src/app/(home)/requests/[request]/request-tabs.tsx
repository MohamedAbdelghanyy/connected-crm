"use client"

import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function RequestTabs({ request }: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("info")
  const { push } = useRouter();

  React.useEffect(() => {
    if (!request) {
      push("/requests");
    }
  }, [request, push])

  return request ? (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={request.itemName} text={request.id}></DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <div className="space-y-2"></div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={1}>
                <Grid item sm={12} xs={12}>
                  <TabsTrigger value="info" className="w-full">Info</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="info" forceMount={true} hidden={activeTab !== "info"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" aria-label="name" value={request.customerName} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input type="text" aria-label="mobile" id="mobile" value={request.customerMobile} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item">Item</Label>
                  <Input type="text" aria-label="item" id="item" value={request.itemName} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointment">Appointment</Label>
                  <Input id="appointment" aria-label="appointment" value={request.appointment ? request.appointment : "Not set"} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="createdBy">Created By</Label>
                  <Input id="createdBy" aria-label="createdBy" value={request.createdBy} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creationDate">Creation Date</Label>
                  <Input type="text" aria-label="creationDate" id="creationDate" value={request.creationDate} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input id="notes" aria-label="notes" value={request.notes} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Input id="status" aria-label="status" value={request.status} readOnly />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  ) : <></>
}