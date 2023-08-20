"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"


export default function AddItem({
  className,
  variant,
  ...props
}: ButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showNewItemDialog, setShowNewItemDialog] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("general")

  const itemNameRef = React.useRef<HTMLInputElement>(null);

  const [enableShowPrice, setEnableShowPrice] = React.useState(false)

  const [isSummerProduct, setIsSummerProduct] = React.useState(false)
  const [requestCamera, setRequestCamera] = React.useState(false)
  const [requestPricing, setRequestPricing] = React.useState(false)
  const [requestVIP, setRequestVIP] = React.useState(false)
  const [isSponsored, setIsSponsored] = React.useState(false)

  async function saveItem() {
    if(itemNameRef.current && itemNameRef.current.value){
      setIsLoading(true)

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Untitled Post",
        }),
      })

      setIsLoading(false)

      if (!response?.ok) {
        return toast({
          title: "Something went wrong.",
          description: "An error occurred while adding " + itemNameRef.current.value + ", Please try again.",
          variant: "destructive",
        })
      }else{
        setShowNewItemDialog(false);
        return toast({
          title: "Success",
          description: itemNameRef.current.value + " was successfully added.",
        })
      }

      // This forces a cache invalidation.
      router.refresh()
    }
  }
  
  return (
    <>
      <button
        onClick={() =>{
          setShowNewItemDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Item
      </button>
      <Dialog open={showNewItemDialog} onOpenChange={setShowNewItemDialog}>
        <DialogContent style={{maxWidth: "45rem"}}>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Item</DialogTitle>
            <DialogDescription>
              Enter item details
            </DialogDescription>
          </DialogHeader>            
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <div className="ml-4 mr-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="general" >General</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="price">Price</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="attributes">Attributes</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>
            <div style={{maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px",}}>
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
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail</Label>
                    <Input type="file" id="thumbnail" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mediaLow">Media Low</Label>
                    <Input type="file" id="mediaLow" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mediaMid">MediaHigh</Label>
                    <Input type="file" id="mediaMid" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mediaHigh">MediaHigh</Label>
                    <Input type="file" id="mediaHigh" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="price" forceMount={true} hidden={activeTab !== "price"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2" style={{justifyContent: "space-between", display: "flex"}}>
                    <Label style={{textAlign: "left"}} className="mt-3">Enable Show Price</Label>
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
                  <div className="space-y-2" style={{justifyContent: "space-between", display: "flex"}}>
                    <Label style={{textAlign: "left"}} className="mt-3">Summer Product</Label>
                    <Switch
                      checked={isSummerProduct}
                      onCheckedChange={setIsSummerProduct}
                    />
                  </div>
                  <div className="space-y-2" style={{justifyContent: "space-between", display: "flex"}}>
                    <Label style={{textAlign: "left"}} className="mt-3">Request Camera Professional</Label>
                    <Switch
                      checked={requestCamera}
                      onCheckedChange={setRequestCamera}
                    />
                  </div>
                  <div className="space-y-2" style={{justifyContent: "space-between", display: "flex"}}>
                    <Label style={{textAlign: "left"}} className="mt-3">Request Pricing Consultancy</Label>
                    <Switch
                      checked={requestPricing}
                      onCheckedChange={setRequestPricing}
                    />
                  </div>
                  <div className="space-y-2" style={{justifyContent: "space-between", display: "flex"}}>
                    <Label style={{textAlign: "left"}} className="mt-3">VIP Services</Label>
                    <Switch
                      checked={requestVIP}
                      onCheckedChange={setRequestVIP}
                    />
                  </div>
                  <div className="space-y-2" style={{justifyContent: "space-between", display: "flex"}}>
                    <Label style={{textAlign: "left"}} className="mt-3">Sponsored</Label>
                    <Switch
                      checked={isSponsored}
                      onCheckedChange={setIsSponsored}
                    />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
          <DialogFooter className="mr-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowNewItemDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={saveItem}
              className={cn(
                buttonVariants({ variant }),
                {
                  "cursor-not-allowed opacity-60": isLoading,
                },
              ) + " mb-2"}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (<></>)}
              Continue
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
