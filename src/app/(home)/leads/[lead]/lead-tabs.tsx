import DashboardLayout from "@/components/layouts/dashboard-layout"
import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { DashboardHeader } from "@/components/other/header"
import { DashboardShell } from "@/components/other/shell"
import { DataTable } from "@/components/table/data-table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid } from "@mui/material"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import { requestsTableColumns, requestsTableToolbar, requestsTableToolbarSearchList } from "../../requests/config"
import LeadLoading from "../loading"

export default function LeadTabs({ lead, requests }: any) {
  const [activeTab, setActiveTab] = React.useState("info");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!lead) {
      navigate("/leads");
    }
  }, [lead, navigate])

  return lead ? (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={lead.name} text={lead.id}></DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <div className="space-y-2"></div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={1}>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="info" className="w-full">Info</TabsTrigger>
                </Grid>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="requests" className="w-full">Requests</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="info" forceMount={true} hidden={activeTab !== "info"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" aria-label="name" value={lead.name} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input type="text" aria-label="mobile" id="mobile" value={lead.mobile} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Interests</Label>
                  <Input type="email" aria-label="email" id="email" value={lead.interests} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buy">Buy</Label>
                  <Input id="buy" aria-label="buy" value={lead.buy} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sell">Sell</Label>
                  <Input id="sell" aria-label="sell" value={lead.sell} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Input id="status" aria-label="status" value={lead.status} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input id="rating" aria-label="rating" value={lead.rating} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input id="notes" aria-label="notes" value={lead.notes} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Input id="priority" aria-label="priority" value={lead.priority} readOnly />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="requests" forceMount={true} hidden={activeTab !== "requests"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {requests.length > 0 ? (
                    <DataTable data={requests} columns={requestsTableColumns} toolbar={requestsTableToolbar} toolbarSearchList={requestsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Requests'} customerName={lead.name} />)}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  ) : <LeadLoading />
}


function CustomEmptyPlaceHolder({ title, customerName }: any) {
  return (<EmptyPlaceholder>
    <EmptyPlaceholder.Icon name="post" />
    <EmptyPlaceholder.Title>No {title}</EmptyPlaceholder.Title>
    <EmptyPlaceholder.Description>
      {customerName} doesn&apos;t have any {title} yet.
    </EmptyPlaceholder.Description>
  </EmptyPlaceholder>);
}