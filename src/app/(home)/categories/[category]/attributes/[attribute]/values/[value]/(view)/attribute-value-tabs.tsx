"use client"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { errorHandler } from "@/components/ui/custom/error-handler"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function AttributeValueTabs({ attributeValue }: any) {
  const [activeTab, setActiveTab] = React.useState("info");
  const { push } = useRouter();
  const currentUrl = window.location.href;

  React.useEffect(() => {
    if (!attributeValue) {
      errorHandler(toast, "This value was not found");
      //push("/attributes");
    }
  }, [attributeValue])

  return attributeValue ? (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={attributeValue.value} text={attributeValue.id}></DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={1}>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="info" className="w-full">Info</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="info" forceMount={true} hidden={activeTab !== "info"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input
                    aria-label="value"
                    id="value"
                    placeholder="No Value"
                    value={attributeValue.value}
                    readOnly
                  />
                </div>
              </div>
              <FormButton
                label="Edit"
                isLoading={false}
                callback={() => {
                  push(currentUrl + "/edit");
                }}
                isEnabled={true}
              />
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