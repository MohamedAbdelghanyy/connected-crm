import FormButton from "@/components/forms/form-button"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { errorHandler } from "@/components/other/error-handler"
import { DashboardHeader } from "@/components/other/header"
import { Icons } from "@/components/other/icons"
import { DashboardShell } from "@/components/other/shell"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Grid } from "@mui/material"
import { Image } from "@radix-ui/react-avatar"
import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { attributesTableColumns, attributesTableToolbar, attributesTableToolbarSearchList } from "../attributes/(list)/config"

export default function CategoryTabs({ category, attributes }: any) {
  const [activeTab, setActiveTab] = React.useState("info");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!category) {
      errorHandler(toast, "This category was not found");
      navigate("/categories");
    }
  }, [category, navigate])

  return category ? (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={category.name} text={category.id}>
          <div style={{ display: 'flex', flexDirection: 'row' }} className="space-x-2">
            <FormButton
              label="Edit"
              isLoading={false}
              callback={() => {
                navigate("/categories/" + category.id + "/edit");
              }}
              isEnabled={true}
            />
          </div>
        </DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={1}>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="info" className="w-full">Info</TabsTrigger>
                </Grid>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="attributes" className="w-full">Attributes</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="info" forceMount={true} hidden={activeTab !== "info"}>
              <div className="space-y-4 py-2 pb-4">
                {category.image &&
                  <div className="space-y-2">
                    <Label htmlFor="image">Image</Label>
                    <Image
                      aria-label="image"
                      src={category.image}
                      alt={category.name}
                      width={300}
                      style={{ borderRadius: '5px' }}
                    />
                  </div>}
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    aria-label="name"
                    id="name"
                    placeholder="No Category Name"
                    value={category.name}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderNo">Order Number</Label>
                  <Input
                    aria-label="orderNo"
                    id="orderNo"
                    placeholder="No Order Number"
                    value={category.orderNo}
                    readOnly
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Active</Label>
                  <Switch
                    checked={category.active}
                    disabled={true}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="attributes" forceMount={true} hidden={activeTab !== "attributes"}>
              <div className="space-y-4 py-2 pb-4">
                <DashboardShell className="mb-1">
                  <DashboardHeader heading="" text="Manage category attributes">
                    <Link to={`/categories/${category.id}/attributes/add`} className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Attribute</Link>
                  </DashboardHeader>
                </DashboardShell>
                <div className="m-2">
                  {attributes.length > 0 ? (
                    <DataTable data={attributes} columns={attributesTableColumns} toolbar={attributesTableToolbar} toolbarSearchList={attributesTableToolbarSearchList} />
                  ) : (<EmptyPlaceholder>
                    <EmptyPlaceholder.Icon name="post" />
                    <EmptyPlaceholder.Title>No Attributes</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                      You don&apos;t have any attributes yet.
                    </EmptyPlaceholder.Description>
                    <Link to="/attributes/add" className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Attribute</Link>
                  </EmptyPlaceholder>)}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  ) : <></>
}