import FormButton from "@/components/forms/form-button"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { errorHandler } from "@/components/other/error-handler"
import { DashboardHeader } from "@/components/other/header"
import { DashboardShell } from "@/components/other/shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Grid } from "@mui/material"
import { Image } from "@radix-ui/react-avatar"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import { deleteRole } from "../../(list)/config"
import RolesLoading from "../../(list)/loading"

export default function RoleTabs({ role }: any) {
  const [activeTab, setActiveTab] = React.useState("info");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!role) {
      errorHandler(toast, "This role was not found");
      navigate("/roles");
    }
  }, [role, navigate]);

  return role ? (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={role.name} text={role.id}>
          <div style={{ display: 'flex', flexDirection: 'row' }} className="space-x-2">
            <FormButton
              label="Edit"
              isLoading={false}
              callback={() => {
                navigate("/roles/" + role.id + "/edit");
              }}
              isEnabled={true}
            />
            <FormButton
              label="Delete"
              isLoading={false}
              callback={() => {
                deleteRole(role.id);
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
                {role.image &&
                  <div className="space-y-2">
                    <Label htmlFor="image">Image</Label>
                    <Image
                      aria-label="image"
                      src={role.image}
                      alt={role.name}
                      width={300}
                      style={{ borderRadius: '5px' }}
                    />
                  </div>}
                <div className="space-y-2">
                  <Label htmlFor="name">Role Name</Label>
                  <Input
                    aria-label="name"
                    id="name"
                    placeholder="No Role Name"
                    value={role.name}
                    readOnly
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Default</Label>
                  <Switch
                    checked={role.isDefault}
                    disabled={true}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Public</Label>
                  <Switch
                    checked={role.isPublic}
                    disabled={true}
                  />
                </div>
              </div>
            </TabsContent >
          </div >
        </Tabs >
      </div >
    </DashboardLayout>
  ) : <RolesLoading />
}