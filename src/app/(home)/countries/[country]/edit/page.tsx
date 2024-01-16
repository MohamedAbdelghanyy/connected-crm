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
import { CountryObject } from "@/config/forms/defaultObjects";
import { CountryValidation } from "@/config/forms/validation";
import axios from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

export default function CountryPage({ params }: { params: { country: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const [countryID, setCountryID] = React.useState("");
  const [country, setCountry] = React.useState(CountryObject.empty);
  const { push } = useRouter();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: country,
    resolver: yupResolver(CountryValidation.mainSchema),
  });
  const { control, formState, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const getCountry = useCallback((countryID: string) => {
    axios.get('/app/country/' + countryID)
      .then(function (response) {
        if (response.data.result != null) {
          setCountry(response.data.result);
          reset(response.data.result);
        } else {
          errorHandler(toast, "This country was not found");
          push("/countries");
        }
      })
      .catch(function (error) {
        errorHandler(toast, error);
        push("/countries");
      });
  }, [push, reset]);

  const edit = () => {
    setIsLoading(true);
    axios.put('/app/country/' + countryID, getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: getValues().name + " was successfully updated.",
          variant: "success",
        });
        push('/countries/' + response.data.result.id);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setCountryID(params.country);
    getCountry(params.country);
  }, [getCountry, params.country]);

  return country && country.id != 0 ? (
    <>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={"Edit " + country.name + " Country"} text="Enter country details"></DashboardHeader>
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
                    <Label htmlFor="name">Country Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="name"
                          id="name"
                          placeholder="Enter Country Name"
                          isError={!!errors.name}
                          errorText={errors?.name?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Code</Label>
                    <Controller
                      name="code"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="code"
                          id="code"
                          placeholder="Enter Country Code"
                          isError={!!errors.code}
                          errorText={errors?.code?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isoCode"> ISO Code</Label>
                    <Controller
                      name="isoCode"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="isoCode"
                          id="isoCode"
                          placeholder="Enter Country ISO Code"
                          isError={!!errors.isoCode}
                          errorText={errors?.isoCode?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Active</Label>
                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Coming Soon</Label>
                    <Controller
                      name="comingSoon"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Maintenance Mode</Label>
                    <Controller
                      name="isInMaintenanceMode"
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
  ) : <></>
}