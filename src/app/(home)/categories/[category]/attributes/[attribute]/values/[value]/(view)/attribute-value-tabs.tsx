import FormButton from "@/components/forms/form-button"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { errorHandler } from "@/components/other/error-handler"
import { DashboardHeader } from "@/components/other/header"
import { DashboardShell } from "@/components/other/shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Grid } from "@mui/material"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import AttributeValueLoading from "./loading"

export default function AttributeValueTabs({ attributeValue }: any) {
  const [activeTab, setActiveTab] = React.useState("info");
  const navigate = useNavigate();
  const currentUrl = window.location.href;

  React.useEffect(() => {
    if (!attributeValue) {
      errorHandler(toast, "This value was not found");
      //navigate("/attributes");
    }
  }, [attributeValue])

  return attributeValue ? (
    <DashboardLayout>
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
                  navigate(currentUrl + "/edit");
                }}
                isEnabled={true}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  ) : <AttributeValueLoading />
}