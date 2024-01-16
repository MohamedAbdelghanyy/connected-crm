"use client"

import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { errorHandler } from "@/components/ui/custom/error-handler"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { TagObject } from "@/config/forms/defaultObjects"
import axios from "@/services/axios"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import TagLoading from "./loading"

export default function TagPage({ params }: { params: { tag: string } }) {
  let tagID = params.tag;

  const [activeTab, setActiveTab] = useState("info");
  const [tag, setTag] = useState(TagObject.empty);
  const { push } = useRouter();

  useEffect(() => {
    axios.get('/app/tag/' + tagID)
      .then(function (response) {
        setTag(response.data.result);
      })
      .catch(function (error) {
        errorHandler(toast, "This tag was not found");
        push("/tags");
      });
  }, [tagID, push]);

  return tag && tag.id != 0 ? (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={tag.displayName} text={tag.id.toString()}>
          <div style={{ display: 'flex', flexDirection: 'row' }} className="space-x-2">
            <FormButton
              label="Edit"
              isLoading={false}
              callback={() => {
                push("/tags/" + tag.id + "/edit");
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
                  <Label htmlFor="key">Tag Key</Label>
                  <Input
                    aria-label="key"
                    id="key"
                    placeholder="No Tag Key"
                    value={tag.key}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayName">Tag Display Name</Label>
                  <Input
                    aria-label="displayName"
                    id="displayName"
                    placeholder="No Tag Display Name"
                    value={tag.displayName}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Tag Description</Label>
                  <Textarea
                    aria-label="description"
                    id="description"
                    placeholder="No Tag Description"
                    value={tag.description}
                    readOnly
                  />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  ) : <TagLoading />
}