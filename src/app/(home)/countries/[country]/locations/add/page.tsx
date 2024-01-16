"use client"

import _ from "@/@lodash/@lodash"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { CustomInput } from "@/components/ui/custom-input"
import { errorHandler } from "@/components/ui/custom/error-handler"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { LocationObject } from "@/config/forms/defaultObjects"
import { LocationValidation } from "@/config/forms/validation"
import axios from "@/services/axios"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function AddLocationPage({ params }: { params: { country: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const countryID = parseInt(params.country);
  const [countryName, setCountryName] = React.useState("");
  const methods = useForm({
    mode: 'onChange',
    defaultValues: LocationObject.empty,
    resolver: yupResolver(LocationValidation.mainSchema),
  });
  const { control, formState, setValue, getValues } = methods;
  const { isValid, dirtyFields, errors } = formState;

  React.useEffect(() => {
    if (countryID != null) {
      axios.get('/app/country/' + countryID)
        .then(function (response) {
          setCountryName(response.data.result.name);
          setValue('countryId', countryID);
        })
        .catch(function (error) {
          errorHandler(toast, error);
          router.push("/countries");
        });
    } else {
      errorHandler(toast, "Country was not found.");
      router.push("/countries");
    }
  }, [countryID, router, setValue]);

  const add = () => {
    console.log(getValues())
    setIsLoading(true);
    axios.post('/app/location', getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: getValues().name + " was successfully added.",
          variant: "success",
        });
        router.push('/countries/' + countryID + "/locations/" + response.data.result.id);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  return countryName != "" && (
    <>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={"Add Location To " + countryName} text="Enter location details"></DashboardHeader>
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
                </div>
              </TabsContent>
              <FormButton
                label="Add"
                isLoading={isLoading}
                callback={add}
                isEnabled={!_.isEmpty(dirtyFields) && isValid}
              />
            </div>
          </Tabs>
        </div>
      </FormProvider>
    </>
  )
}
