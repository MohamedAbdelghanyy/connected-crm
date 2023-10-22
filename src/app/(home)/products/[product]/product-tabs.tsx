"use client"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"
import { appointmentsTableColumns, appointmentsTableToolbar, appointmentsTableToolbarSearchList } from "../../appointments/config"
import { attributesTableColumns, attributesTableToolbar, attributesTableToolbarSearchList } from "../../attributes/config"
import { callsTableColumns, callsTableToolbar, callsTableToolbarSearchList } from "../../calls/config"
import { internalNotesTableColumns, internalNotesTableToolbar, internalNotesTableToolbarSearchList } from "../../internal-notes/config"
import { notificationsTableColumns, notificationsTableToolbar, notificationsTableToolbarSearchList } from "../../notifications/config"
import { subscriptionsTableColumns, subscriptionsTableToolbar, subscriptionsTableToolbarSearchList } from "../../subscriptions/config"
import { wishlistsTableColumns, wishlistsTableToolbar, wishlistsTableToolbarSearchList } from "../../wishlists/config"
import StatisticsPage from "../../stats/page"

export default function ProductTabs({ product, attributes, wishlist, calls, subscriptions, notifications, appointments, internalNotes, stats, history }: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("basic")
  const { push } = useRouter();

  React.useEffect(() => {
    if (!product) {
      push("/product");
    }
  }, [])

  return product ? (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={product.name} text={product.id}></DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <div className="space-y-2"></div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={1}>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="basic" className="w-full">Basic</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="media" className="w-full">Media</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="location" className="w-full">Location</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="attributes" className="w-full">Attributes</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="wishlist" className="w-full">Wishlist</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="calls" className="w-full">Calls</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="subscriptions" className="w-full">Subscriptions</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="notifications" className="w-full">Notifications</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="appointments" className="w-full">Appointments</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="internalNotes" className="w-full">Internal Notes</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="stats" className="w-full">Stats</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="history" className="w-full">History</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="basic" forceMount={true} hidden={activeTab !== "basic"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" value={product.name} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={"No Description"} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" value={product.brand} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" value={product.category} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner">Owner</Label>
                  <Input id="owner" value={product.owner} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Input id="status" value={product.status} readOnly />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="location" forceMount={true} hidden={activeTab !== "location"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={product.location} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input id="latitude" value={product.latitude} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input id="longitude" value={product.longitude} readOnly />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="attributes" forceMount={true} hidden={activeTab !== "attributes"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {attributes.length > 0 ? (
                    <DataTable data={attributes} columns={attributesTableColumns} toolbar={attributesTableToolbar} toolbarSearchList={attributesTableToolbarSearchList} />
                  ) : (<ProductEmptyPlaceHolder title={'attributes'} productName={product.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="wishlist" forceMount={true} hidden={activeTab !== "wishlist"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {wishlist.length > 0 ? (
                    <DataTable data={wishlist} columns={wishlistsTableColumns} toolbar={wishlistsTableToolbar} toolbarSearchList={wishlistsTableToolbarSearchList} />
                  ) : (<ProductEmptyPlaceHolder title={'Wishlist'} productName={product.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="calls" forceMount={true} hidden={activeTab !== "calls"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {calls.length > 0 ? (
                    <DataTable data={calls} columns={callsTableColumns} toolbar={callsTableToolbar} toolbarSearchList={callsTableToolbarSearchList} />
                  ) : (<ProductEmptyPlaceHolder title={'Calls'} productName={product.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notifications" forceMount={true} hidden={activeTab !== "notifications"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {notifications.length > 0 ? (
                    <DataTable data={notifications} columns={notificationsTableColumns} toolbar={notificationsTableToolbar} toolbarSearchList={notificationsTableToolbarSearchList} />
                  ) : (<ProductEmptyPlaceHolder title={'Notifications'} productName={product.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="subscriptions" forceMount={true} hidden={activeTab !== "subscriptions"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {subscriptions.length > 0 ? (
                    <DataTable data={subscriptions} columns={subscriptionsTableColumns} toolbar={subscriptionsTableToolbar} toolbarSearchList={subscriptionsTableToolbarSearchList} />
                  ) : (<ProductEmptyPlaceHolder title={'Subscriptions'} productName={product.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="appointments" forceMount={true} hidden={activeTab !== "appointments"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {appointments.length > 0 ? (
                    <DataTable data={appointments} columns={appointmentsTableColumns} toolbar={appointmentsTableToolbar} toolbarSearchList={appointmentsTableToolbarSearchList} />
                  ) : (<ProductEmptyPlaceHolder title={'Appointments'} productName={product.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="internalNotes" forceMount={true} hidden={activeTab !== "internalNotes"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {internalNotes.length > 0 ? (
                    <DataTable data={internalNotes} columns={internalNotesTableColumns} toolbar={internalNotesTableToolbar} toolbarSearchList={internalNotesTableToolbarSearchList} />
                  ) : (<ProductEmptyPlaceHolder title={'Internal Notes'} productName={product.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="calls" forceMount={true} hidden={activeTab !== "stats"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <StatisticsPage />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  ) : <></>
}


function ProductEmptyPlaceHolder({ title, productName }: any) {
  return (<EmptyPlaceholder>
    <EmptyPlaceholder.Icon name="post" />
    <EmptyPlaceholder.Title>No {title}</EmptyPlaceholder.Title>
    <EmptyPlaceholder.Description>
      {productName} doesn&apos;t have any {title} yet.
    </EmptyPlaceholder.Description>
  </EmptyPlaceholder>);
}