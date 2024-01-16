"use client"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { errorHandler } from "@/components/ui/custom/error-handler"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Grid } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { attributeValuesTableColumns, attributeValuesTableToolbar, attributeValuesTableToolbarSearchList } from "../values/(list)/config"

export default function AttributeTabs({ attribute, attributeValues }: any) {
  const [activeTab, setActiveTab] = useState("info");
  const [attributeURL, setAttributeURL] = useState('');
  const { push } = useRouter();

  useEffect(() => {
    setAttributeURL(window.location.href);
    if (!attribute) {
      errorHandler(toast, "This attribute was not found");
      //push("/attributes");
    }
  }, [attribute])

  return attribute ? (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={attribute.name} text={attribute.id}>
          <div style={{ display: 'flex', flexDirection: 'row' }} className="space-x-2">
            <FormButton
              label="Edit"
              isLoading={false}
              callback={() => {
                push(attributeURL + '/edit');
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
                  <TabsTrigger value="attributeValues" className="w-full">Values</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="info" forceMount={true} hidden={activeTab !== "info"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Attribute Name</Label>
                  <Input
                    aria-label="name"
                    id="name"
                    placeholder="No Attribute Name"
                    value={attribute.name}
                    readOnly
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Required</Label>
                  <Switch
                    checked={attribute.isRequired}
                    disabled={true}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Allow Filtering</Label>
                  <Switch
                    checked={attribute.allowFiltering}
                    disabled={true}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Show On Product Page</Label>
                  <Switch
                    checked={attribute.showOnProductPage}
                    disabled={true}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    aria-label="displayOrder"
                    id="displayOrder"
                    placeholder="No Display Order"
                    value={attribute.displayOrder}
                    readOnly
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="attributeValues" forceMount={true} hidden={activeTab !== "attributeValues"}>
              <div className="space-y-4 py-2 pb-4">
                <DashboardShell className="mb-1">
                  <DashboardHeader heading="" text="Manage attribute values">
                    <Link href={`${attributeURL}/values/add`} className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Value</Link>
                  </DashboardHeader>
                </DashboardShell>
                <div className="m-2">
                  {attributeValues && attributeValues.length > 0 ? (
                    <DataTable data={attributeValues} columns={attributeValuesTableColumns} toolbar={attributeValuesTableToolbar} toolbarSearchList={attributeValuesTableToolbarSearchList} />
                  ) : (<EmptyPlaceholder>
                    <EmptyPlaceholder.Icon name="post" />
                    <EmptyPlaceholder.Title>No Values</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                      This attribute doesn&apos;t have any values yet.
                    </EmptyPlaceholder.Description>
                    <Link href={`${attributeURL}/values/add`} className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Value</Link>
                  </EmptyPlaceholder>)}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  ) : <></>
}

function CustomEmptyPlaceHolder({ title, attributeName }: any) {
  return (<EmptyPlaceholder>
    <EmptyPlaceholder.Icon name="post" />
    <EmptyPlaceholder.Title>No {title}</EmptyPlaceholder.Title>
    <EmptyPlaceholder.Description>
      {attributeName} doesn&apos;t have any {title} yet.
    </EmptyPlaceholder.Description>
  </EmptyPlaceholder>);
}