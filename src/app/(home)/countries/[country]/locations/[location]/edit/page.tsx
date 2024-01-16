'use client'

import _ from "@/@lodash/@lodash";
import FormButton from "@/components/forms/form-button";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { CustomInput } from "@/components/ui/custom-input";
import { errorHandler } from "@/components/ui/custom/error-handler";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { LocationObject } from "@/config/forms/defaultObjects";
import { LocationValidation } from "@/config/forms/validation";
import axios from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import EditLocationLoading from "./loading";

export default function EditLocationPage({ params }: { params: { location: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const [locationID, setLocationID] = React.useState("");
  const [location, setLocation] = React.useState(LocationObject.empty);
  const [locationURL, setLocationURL] = React.useState('');
  const { push } = useRouter();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: location,
    resolver: yupResolver(LocationValidation.mainSchema),
  });
  const { control, formState, setValue, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const getLocation = useCallback((locationID: string) => {
    axios.get('/app/location/' + locationID)
      .then(function (response) {
        if (response.data.result != null) {
          setLocation(response.data.result);
          console.log(response.data.result);
          reset(response.data.result);
        } else {
          errorHandler(toast, "This location was not found");
          push("/countries");
        }
      })
      .catch(function (error) {
        errorHandler(toast, error);
        push("/countries");
      });
  }, [setLocation, reset, push]);

  const edit = () => {
    setIsLoading(true);
    axios.put('/app/location/' + locationID, getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: getValues().name + " was successfully updated.",
          variant: "success",
        });
        push(locationURL);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setLocationURL(window.location.href.replace('/edit', ''));
    setLocationID(params.location);
    getLocation(params.location);
  }, [getLocation, params.location]);

  return location && location.id != 0 ? (
    <>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={"Edit " + location.name + " Location"} text="Enter location details"></DashboardHeader>
        </DashboardShell>
        <div className="space-y-4 pb-4 px-2">
          <div className="space-y-2"></div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
            <div>
              <TabsList className="w-full h-full">
                <Grid container spacing={2}>
                  <Grid item sm={12} xs={12}>
                    <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                  </Grid>
                </Grid>
              </TabsList>
            </div>
            <div className="w-full">
              <TabsContent value="general" forceMount={true} hidden={activeTab !== "general"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="name"
                          id="name"
                          placeholder="Enter location name"
                          isError={!!errors.name}
                          errorText={errors?.name?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Included In App</Label>
                    <Controller
                      name="isIncludedInApp"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <FormButton
                label="Save"
                isLoading={isLoading}
                callback={edit}
                isEnabled={!_.isEmpty(dirtyFields) && isValid}
              />
            </div>
          </Tabs>
        </div>
      </FormProvider>
    </>
  ) : <EditLocationLoading />
}