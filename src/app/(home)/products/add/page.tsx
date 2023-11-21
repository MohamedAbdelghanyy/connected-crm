"use client"

import FormAddButton from "@/components/forms/form-add-button"
import { DashboardHeader } from "@/components/header"
import ImagesTable from "@/components/images-table/images-table"
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
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function AddItemPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")

  const itemNameRef = React.useRef<HTMLInputElement>(null);
  const [enableShowPrice, setEnableShowPrice] = React.useState(false)
  const [isSummerProduct, setIsSummerProduct] = React.useState(false)
  const [requestCamera, setRequestCamera] = React.useState(false)
  const [requestPricing, setRequestPricing] = React.useState(false)
  const [requestVIP, setRequestVIP] = React.useState(false)
  const [isSponsored, setIsSponsored] = React.useState(false)
  const [isSoldByConnected, setIsSoldByConnected] = React.useState(false)

  const add = () => {
    console.log("Added");
  }

  return (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Add Item" text="Enter item's details"></DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <div className="space-y-2"></div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={2}>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="media" className="w-full">Media</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="price" className="w-full">Price</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="location" className="w-full">Location</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="attributes" className="w-full">Attributes</TabsTrigger>
                </Grid>
                <Grid item sm={2} xs={6}>
                  <TabsTrigger value="settings" className="w-full">Settings</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="general" forceMount={true} hidden={activeTab !== "general"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter item name" ref={itemNameRef} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter item description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rolex">
                        <span className="font-medium">Rolex</span>
                      </SelectItem>
                      <SelectItem value="bmw">
                        <span className="font-medium">BMW</span>
                      </SelectItem>
                      <SelectItem value="Emaar">
                        <span className="font-medium">Emaar</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automotive">
                        <span className="font-medium">Automotive</span>
                      </SelectItem>
                      <SelectItem value="lifestyle">
                        <span className="font-medium">Lifestyle</span>
                      </SelectItem>
                      <SelectItem value="realestate">
                        <span className="font-medium">Realestate</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner">Owner</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select owner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mohamedabdelghany">
                        <span className="font-medium">Mohamed Abdelghany</span>
                      </SelectItem>
                      <SelectItem value="khaledafify">
                        <span className="font-medium">Khaled Afify</span>
                      </SelectItem>
                      <SelectItem value="sohaelhadary">
                        <span className="font-medium">Soha El Hadary</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">
                        <span className="font-medium">Approved</span>
                      </SelectItem>
                      <SelectItem value="pending">
                        <span className="font-medium">Pending</span>
                      </SelectItem>
                      <SelectItem value="rejected">
                        <span className="font-medium">Rejected</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="media" forceMount={true} hidden={activeTab !== "media"}>
              <ImagesTable showAddButton={true} />
            </TabsContent>
            <TabsContent value="price" forceMount={true} hidden={activeTab !== "price"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Enable Show Price</Label>
                  <Switch
                    id="enableShowPrice"
                    checked={enableShowPrice}
                    onCheckedChange={setEnableShowPrice}
                  />
                </div>
                {enableShowPrice && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input type="number" id="price" placeholder="Enter price" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="egp">
                            <span className="font-medium">EGP</span>
                          </SelectItem>
                          <SelectItem value="usd">
                            <span className="font-medium">USD</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                {!enableShowPrice && (
                  <div className="space-y-2">
                    <Label htmlFor="showPriceLabel">Show Price Label</Label>
                    <Input id="showPriceLabel" placeholder="Enter show price label" />
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="location" forceMount={true} hidden={activeTab !== "location"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="location1">
                        <span className="font-medium">Fifth Settlement</span>
                      </SelectItem>
                      <SelectItem value="location2">
                        <span className="font-medium">Maadi</span>
                      </SelectItem>
                      <SelectItem value="location3">
                        <span className="font-medium">New Capital</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input id="latitude" placeholder="Enter latitude" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input id="longitude" placeholder="Enter longitude" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="attributes" forceMount={true} hidden={activeTab !== "attributes"}></TabsContent>
            <TabsContent value="settings" forceMount={true} hidden={activeTab !== "settings"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="country1">
                        <span className="font-medium">Egypt</span>
                      </SelectItem>
                      <SelectItem value="country2">
                        <span className="font-medium">UAE</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tag1">
                        <span className="font-medium">#tag</span>
                      </SelectItem>
                      <SelectItem value="tag2">
                        <span className="font-medium">#tag-2</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pinnedIndex">Pinned Index</Label>
                  <Input type="number" id="pinnedIndex" placeholder="Enter index" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoryIndex">Category Index</Label>
                  <Input type="number" id="categoryIndex" placeholder="Enter index" />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Summer Product</Label>
                  <Switch
                    checked={isSummerProduct}
                    onCheckedChange={setIsSummerProduct}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Request Camera Professional</Label>
                  <Switch
                    checked={requestCamera}
                    onCheckedChange={setRequestCamera}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Request Pricing Consultancy</Label>
                  <Switch
                    checked={requestPricing}
                    onCheckedChange={setRequestPricing}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">VIP Services</Label>
                  <Switch
                    checked={requestVIP}
                    onCheckedChange={setRequestVIP}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Sponsored</Label>
                  <Switch
                    checked={isSponsored}
                    onCheckedChange={setIsSponsored}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Sold By Connected</Label>
                  <Switch
                    checked={isSoldByConnected}
                    onCheckedChange={setIsSoldByConnected}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaData">Metadata</Label>
                  <Textarea id="metaData" placeholder="Enter metadata" />
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
