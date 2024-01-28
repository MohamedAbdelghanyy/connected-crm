import FormButton from "@/components/forms/form-button";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { errorHandler } from "@/components/other/error-handler";
import { DashboardHeader } from "@/components/other/header";
import { DashboardShell } from "@/components/other/shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocationsProps } from "../../(list)/config";
import LocationLoading from "./loading";

export default function LocationPage() {
  const { locationID } = useParams();
  const [location, setLocation] = useState<LocationsProps>();
  const [locationURL, setLocationURL] = useState('');
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  const getLocationData = useCallback(() => {
    axios.get('/app/location/' + locationID)
      .then(function (response) {
        setLocation(response.data.result);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [locationID, setLocation]);

  useEffect(() => {
    setLocationURL(window.location.href);
    getLocationData();
  }, [getLocationData]);

  return location ? (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={location.name} text={location.id.toString()}>
          <div style={{ display: 'flex', flexDirection: 'row' }} className="space-x-2">
            <FormButton
              label="Edit"
              isLoading={false}
              callback={() => {
                navigate(locationURL + '/edit');
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
                <Grid item sm={12} xs={6}>
                  <TabsTrigger value="info" className="w-full">Info</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="info" forceMount={true} hidden={activeTab !== "info"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Location Name</Label>
                  <Input
                    aria-label="name"
                    id="name"
                    placeholder="No Location Name"
                    value={location.name}
                    readOnly
                  />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  ) : <LocationLoading />
}