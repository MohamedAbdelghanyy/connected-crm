"use client"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatToDateTime } from "@/lib/dateFormats"
import { Grid } from "@mui/material"
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import * as React from "react"
import { deleteUser } from "../../(list)/config"
import { appointmentsTableColumns, appointmentsTableToolbar, appointmentsTableToolbarSearchList } from "../../../appointments/config"
import { callsTableColumns, callsTableToolbar, callsTableToolbarSearchList } from "../../../calls/config"
import { internalNotesTableColumns, internalNotesTableToolbar, internalNotesTableToolbarSearchList } from "../../../internal-notes/config"
import { notificationsTableColumns, notificationsTableToolbar, notificationsTableToolbarSearchList } from "../../../notifications/config"
import { productsTableColumns, productsTableToolbar, productsTableToolbarSearchList } from "../../../products/(list)/config"
import { requestsTableColumns, requestsTableToolbar, requestsTableToolbarSearchList } from "../../../requests/config"
import { subscriptionsTableColumns, subscriptionsTableToolbar, subscriptionsTableToolbarSearchList } from "../../../subscriptions/config"
import { wishlistsTableColumns, wishlistsTableToolbar, wishlistsTableToolbarSearchList } from "../../../wishlists/config"

export default function UserTabs({ user, products, wishlist, calls, subscriptions, notifications, requests, appointments, internalNotes, stats, history }: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("info")
  const { push } = useRouter();

  React.useEffect(() => {
    if (!user) {
      push("/users");
    }
  }, [user, push]);

  return user ? (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={user.name} text={user.id}>
          <div style={{ display: 'flex', flexDirection: 'row' }} className="space-x-2">
            <FormButton
              label="Edit"
              isLoading={false}
              callback={() => {
                push("/users/" + user.id + "/edit");
              }}
              isEnabled={true}
            />
            <FormButton
              label="Delete"
              isLoading={false}
              callback={() => {
                deleteUser(user.id);
              }}
              isEnabled={true}
            />
          </div>
        </DashboardHeader>
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
                      <AvatarImage src={user.avatar} alt="avatar" style={{ objectFit: "cover" }} />
                      <AvatarFallback>{String(user.name).charAt(0)}</AvatarFallback>
                    </Avatar>
                  </center>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" aria-label="name" value={user.name} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input id="surname" aria-label="surname" value={user.surname} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userName">User Name</Label>
                  <Input id="userName" aria-label="userName" value={user.userName} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" aria-label="email" id="email" value={user.email} readOnly />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Email Confirmed</Label>
                  {user.emailConfirmed ? (<Check color="green" />) : (<X color="red" />)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input type="text" aria-label="phoneNumber" id="phoneNumber" value={user.phoneNumber} readOnly />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Phone Number Confirmed</Label>
                  {user.phoneNumberConfirmed ? (<Check color="green" />) : (<X color="red" />)}
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Active</Label>
                  {user.isActive ? (<Check color="green" />) : (<X color="red" />)}
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Lockout Enabled</Label>
                  {user.lockoutEnabled ? (<Check color="green" />) : (<X color="red" />)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastPasswordChangeTime">Last Password Change Time</Label>
                  <Input id="lastPasswordChangeTime" aria-label="lastPasswordChangeTime" value={formatToDateTime(user.lastPasswordChangeTime)} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creationTime">Creation Time</Label>
                  <Input id="creationTime" aria-label="creationTime" value={formatToDateTime(user.creationTime)} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastModificationTime">Last Modification Time</Label>
                  <Input id="lastModificationTime" aria-label="lastModificationTime" value={formatToDateTime(user.lastModificationTime)} readOnly />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="products" forceMount={true} hidden={activeTab !== "products"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {products.length > 0 ? (
                    <DataTable data={products} columns={productsTableColumns} toolbar={productsTableToolbar} toolbarSearchList={productsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Products'} userName={user.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="wishlist" forceMount={true} hidden={activeTab !== "wishlist"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {wishlist.length > 0 ? (
                    <DataTable data={wishlist} columns={wishlistsTableColumns} toolbar={wishlistsTableToolbar} toolbarSearchList={wishlistsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Wishlist'} userName={user.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="calls" forceMount={true} hidden={activeTab !== "calls"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {calls.length > 0 ? (
                    <DataTable data={calls} columns={callsTableColumns} toolbar={callsTableToolbar} toolbarSearchList={callsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Calls'} userName={user.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notifications" forceMount={true} hidden={activeTab !== "notifications"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {notifications.length > 0 ? (
                    <DataTable data={notifications} columns={notificationsTableColumns} toolbar={notificationsTableToolbar} toolbarSearchList={notificationsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Notifications'} userName={user.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="subscriptions" forceMount={true} hidden={activeTab !== "subscriptions"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {subscriptions.length > 0 ? (
                    <DataTable data={subscriptions} columns={subscriptionsTableColumns} toolbar={subscriptionsTableToolbar} toolbarSearchList={subscriptionsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Subscriptions'} userName={user.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="requests" forceMount={true} hidden={activeTab !== "requests"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {requests.length > 0 ? (
                    <DataTable data={requests} columns={requestsTableColumns} toolbar={requestsTableToolbar} toolbarSearchList={requestsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Requests'} userName={user.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="appointments" forceMount={true} hidden={activeTab !== "appointments"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {appointments.length > 0 ? (
                    <DataTable data={appointments} columns={appointmentsTableColumns} toolbar={appointmentsTableToolbar} toolbarSearchList={appointmentsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Appointments'} userName={user.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="internalNotes" forceMount={true} hidden={activeTab !== "internalNotes"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  {internalNotes.length > 0 ? (
                    <DataTable data={internalNotes} columns={internalNotesTableColumns} toolbar={internalNotesTableToolbar} toolbarSearchList={internalNotesTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Internal Notes'} userName={user.name} />)}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  ) : <></>
}


function CustomEmptyPlaceHolder({ title, userName }: any) {
  return (<EmptyPlaceholder>
    <EmptyPlaceholder.Icon name="post" />
    <EmptyPlaceholder.Title>No {title}</EmptyPlaceholder.Title>
    <EmptyPlaceholder.Description>
      {userName} doesn&apos;t have any {title} yet.
    </EmptyPlaceholder.Description>
  </EmptyPlaceholder>);
}