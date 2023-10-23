"use client"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"
import { appointmentsTableColumns, appointmentsTableToolbar, appointmentsTableToolbarSearchList } from "../../appointments/config"
import { callsTableColumns, callsTableToolbar, callsTableToolbarSearchList } from "../../calls/config"
import { internalNotesTableColumns, internalNotesTableToolbar, internalNotesTableToolbarSearchList } from "../../internal-notes/config"
import { notificationsTableColumns, notificationsTableToolbar, notificationsTableToolbarSearchList } from "../../notifications/config"
import { productsTableColumns, productsTableToolbar, productsTableToolbarSearchList } from "../../products/config"
import { subscriptionsTableColumns, subscriptionsTableToolbar, subscriptionsTableToolbarSearchList } from "../../subscriptions/config"
import { wishlistsTableColumns, wishlistsTableToolbar, wishlistsTableToolbarSearchList } from "../../wishlists/config"
import { requestsTableColumns, requestsTableToolbar, requestsTableToolbarSearchList } from "../../requests/config"

export default function CustomerTabs({ customer, products, wishlist, calls, subscriptions, notifications, requests, appointments, internalNotes, stats, history }: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("info")
  const { push } = useRouter();

  React.useEffect(() => {
    if (!customer) {
      push("/customers");
    }
  }, [])

  return customer ? (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={customer.name} text={customer.id}></DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <div className="space-y-2"></div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={1}>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="info" className="w-full">Info</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="products" className="w-full">Products</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="wishlist" className="w-full">Wishlist</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="requests" className="w-full">Requests</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="calls" className="w-full">Calls</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="subscriptions" className="w-full">Subscriptions</TabsTrigger>
                </Grid>
                <Grid item sm={2.4} xs={6}>
                  <TabsTrigger value="notifications" className="w-full">Notifications</TabsTrigger>
                </Grid>
                <Grid item sm={2.4} xs={6}>
                  <TabsTrigger value="appointments" className="w-full">Appointments</TabsTrigger>
                </Grid>
                <Grid item sm={2.4} xs={6}>
                  <TabsTrigger value="internalNotes" className="w-full">Internal Notes</TabsTrigger>
                </Grid>
                <Grid item sm={2.4} xs={6}>
                  <TabsTrigger value="stats" className="w-full">Stats</TabsTrigger>
                </Grid>
                <Grid item sm={2.4} xs={6}>
                  <TabsTrigger value="history" className="w-full">History</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="info" forceMount={true} hidden={activeTab !== "info"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <center>
                    <Avatar className="mt-2" style={{ width: "200px", height: "200px" }}>
                      <AvatarImage src={customer.avatar} alt="avatar" style={{ objectFit: "cover" }} />
                      <AvatarFallback>{String(customer.name).charAt(0)}</AvatarFallback>
                    </Avatar>
                  </center>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={customer.name} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input type="text" id="mobile" value={customer.mobile} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" value={customer.email} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Birthdate</Label>
                  <Input id="birthdate" value={customer.birthdate} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input id="gender" value={customer.gender} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input type="text" id="address" value={customer.address} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value={customer.country} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerType">Customer Type</Label>
                  <Input id="customerType" value={customer.customerType} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" value={customer.occupation} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" value={customer.company} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" value={customer.company} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interests">Interests</Label>
                  <Textarea id="interests" value={customer.interests} readOnly />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="products" forceMount={true} hidden={activeTab !== "products"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {products.length > 0 ? (
                    <DataTable data={products} columns={productsTableColumns} toolbar={productsTableToolbar} toolbarSearchList={productsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Products'} customerName={customer.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="wishlist" forceMount={true} hidden={activeTab !== "wishlist"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {wishlist.length > 0 ? (
                    <DataTable data={wishlist} columns={wishlistsTableColumns} toolbar={wishlistsTableToolbar} toolbarSearchList={wishlistsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Wishlist'} customerName={customer.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="calls" forceMount={true} hidden={activeTab !== "calls"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {calls.length > 0 ? (
                    <DataTable data={calls} columns={callsTableColumns} toolbar={callsTableToolbar} toolbarSearchList={callsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Calls'} customerName={customer.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notifications" forceMount={true} hidden={activeTab !== "notifications"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {notifications.length > 0 ? (
                    <DataTable data={notifications} columns={notificationsTableColumns} toolbar={notificationsTableToolbar} toolbarSearchList={notificationsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Notifications'} customerName={customer.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="subscriptions" forceMount={true} hidden={activeTab !== "subscriptions"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {subscriptions.length > 0 ? (
                    <DataTable data={subscriptions} columns={subscriptionsTableColumns} toolbar={subscriptionsTableToolbar} toolbarSearchList={subscriptionsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Subscriptions'} customerName={customer.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="requests" forceMount={true} hidden={activeTab !== "requests"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {requests.length > 0 ? (
                    <DataTable data={requests} columns={requestsTableColumns} toolbar={requestsTableToolbar} toolbarSearchList={requestsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Requests'} customerName={customer.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="appointments" forceMount={true} hidden={activeTab !== "appointments"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {appointments.length > 0 ? (
                    <DataTable data={appointments} columns={appointmentsTableColumns} toolbar={appointmentsTableToolbar} toolbarSearchList={appointmentsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Appointments'} customerName={customer.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="internalNotes" forceMount={true} hidden={activeTab !== "internalNotes"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {internalNotes.length > 0 ? (
                    <DataTable data={internalNotes} columns={internalNotesTableColumns} toolbar={internalNotesTableToolbar} toolbarSearchList={internalNotesTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Internal Notes'} customerName={customer.name} />)}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  ) : <></>
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