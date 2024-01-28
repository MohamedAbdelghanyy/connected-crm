import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid } from "@mui/material";
import * as React from 'react';
import MembersPage from "../members/members";
import RolesPage from "../roles/roles";

export default function OrganizationData({ selectedUnit, members, roles }: any) {
  const [activeTab, setActiveTab] = React.useState("members")

  return (
    <div style={{ backgroundColor: "#1c1c1c", padding: "30px", borderRadius: "10px" }}>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
        <div>
          <TabsList className="w-full h-full">
            <Grid container spacing={2}>
              <Grid item sm={6} xs={6}>
                <TabsTrigger value="members" className="w-full">Members</TabsTrigger>
              </Grid>
              <Grid item sm={6} xs={6}>
                <TabsTrigger value="roles" className="w-full">Roles</TabsTrigger>
              </Grid>
            </Grid>
          </TabsList>
        </div>
        <div className="w-full">
          <TabsContent value="members" forceMount={true} hidden={activeTab !== "members"}>
            <div className="space-y-4 py-2 pb-4">
              <MembersPage selectedUnit={selectedUnit} members={members} />
            </div>
          </TabsContent>
          <TabsContent value="roles" forceMount={true} hidden={activeTab !== "roles"}>
            <div className="space-y-4 py-2 pb-4">
              <RolesPage selectedUnit={selectedUnit} roles={roles} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}