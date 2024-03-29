import FormButton from "@/components/forms/form-button";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import DynamicFlag from "@/components/other/dynamic-flag";
import { EmptyPlaceholder } from "@/components/other/empty-placeholder";
import { errorHandler } from "@/components/other/error-handler";
import { DashboardHeader } from "@/components/other/header";
import { Icons } from "@/components/other/icons";
import { DashboardShell } from "@/components/other/shell";
import { DataTable } from "@/components/table/data-table";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "@/services/axios";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CountriesProps } from "../../(list)/config";
import { LocationsProps, locationsTableColumns, locationsTableToolbar, locationsTableToolbarSearchList } from "../locations/(list)/config";
import CountryLoading from "./loading";

export default function CountryPage() {
  const { countryID } = useParams();
  const [country, setCountry] = useState<CountriesProps>();
  const [locations, setLocations] = useState<LocationsProps[]>([]);
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/app/country/' + countryID)
      .then(function (response) {
        setCountry(response.data.result);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [countryID]);

  useEffect(() => {
    if (country && country.id) {
      axios.get('/app/location', { params: { countryID } })
        .then(function (response) {
          setLocations(response.data.result.items);
        })
        .catch(function (error) {
          errorHandler(toast, error);
        });
    }
  }, [country, countryID]);

  return country ? (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={country.name} text={country.id}>
          <div style={{ display: 'flex', flexDirection: 'row' }} className="space-x-2">
            <FormButton
              label="Edit"
              isLoading={false}
              callback={() => {
                navigate("/countries/" + country.id + "/edit");
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
                <Grid item sm={6} xs={12}>
                  <TabsTrigger value="info" className="w-full">Info</TabsTrigger>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TabsTrigger value="locations" className="w-full">Locations</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="info" forceMount={true} hidden={activeTab !== "info"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="flag">Flag</Label>
                  <DynamicFlag isoCode={country.isoCode} width={120} style={{ borderRadius: '15px' }} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Country Name</Label>
                  <Input
                    aria-label="name"
                    id="name"
                    placeholder="No Country Name"
                    value={country.name}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Code</Label>
                  <Input
                    aria-label="code"
                    id="code"
                    placeholder="No Country Code"
                    value={country.code}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isoCode">ISO Code</Label>
                  <Input
                    aria-label="isoCode"
                    id="isoCode"
                    placeholder="No Country ISO Code"
                    value={country.isoCode}
                    readOnly
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Active</Label>
                  <Switch
                    checked={country.isActive}
                    disabled={true}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Coming Soon</Label>
                  <Switch
                    checked={country.comingSoon}
                    disabled={true}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Maintenance Mode</Label>
                  <Switch
                    checked={country.isInMaintenanceMode}
                    disabled={true}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="locations" forceMount={true} hidden={activeTab !== "locations"}>
              <div className="space-y-4 py-2 pb-4">
                <DashboardShell className="mb-1">
                  <DashboardHeader heading="" text="Manage country locations">
                    <Link to={`/countries/${country.id}/locations/add`} className={cn(buttonVariants({}))}><Icons.add className="mr-2 h-4 w-4" />Add Location</Link>
                  </DashboardHeader>
                </DashboardShell>
                <div className="m-2">
                  {locations.length > 0 ? (
                    <DataTable data={locations} columns={locationsTableColumns} toolbar={locationsTableToolbar} toolbarSearchList={locationsTableToolbarSearchList} />
                  ) : (<EmptyPlaceholder>
                    <EmptyPlaceholder.Icon name="post" />
                    <EmptyPlaceholder.Title>No Locations</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                      You don&apos;t have any locations yet.
                    </EmptyPlaceholder.Description>
                    <Link to={`/countries/${country.id}/locations/add`} className={cn(buttonVariants({ variant: "outline" }))}><Icons.add className="mr-2 h-4 w-4" />Add Locations</Link>
                  </EmptyPlaceholder>)}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  )
    : <CountryLoading />
}