'use client'

import _ from "@/@lodash/@lodash";
import FormButton from "@/components/forms/form-button";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { CustomInput } from "@/components/ui/custom-input";
import { errorHandler } from "@/components/ui/custom/error-handler";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { TagObject } from "@/config/forms/defaultObjects";
import { TagValidation } from "@/config/forms/validation";
import axios from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import EditTagsLoading from "./loading";

export default function TagPage({ params }: { params: { tag: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const [tagID, setTagID] = React.useState("");
  const [tag, setTag] = React.useState(TagObject.empty);
  const { push } = useRouter();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: tag,
    resolver: yupResolver(TagValidation.mainSchema),
  });
  const { control, formState, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const getTag = useCallback((tagID: string) => {
    axios.get('/app/tag/' + tagID)
      .then(function (response) {
        if (response.data.result != null) {
          setTag(response.data.result);
          reset(response.data.result);
        } else {
          errorHandler(toast, "This tag was not found");
          push("/tags");
        }
      })
      .catch(function (error) {
        errorHandler(toast, error);
        push("/tags");
      });
  }, [push, reset]);

  const edit = () => {
    setIsLoading(true);
    axios.put('/app/tag/' + tagID, getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: getValues().displayName + " was successfully updated.",
          variant: "success",
        });
        push('/tags/' + response.data.result.id);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setTagID(params.tag);
    getTag(params.tag);
  }, [getTag, params.tag]);

  return tag && tag.id != 0 ? (
    <>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={"Edit " + tag.displayName + " Tag"} text="Enter tag details"></DashboardHeader>
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
                    <Label htmlFor="key">Tag Key</Label>
                    <Controller
                      name="key"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="key"
                          id="key"
                          placeholder="Enter Tag Key"
                          isError={!!errors.key}
                          errorText={errors?.key?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Tag Display Name</Label>
                    <Controller
                      name="displayName"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="displayName"
                          id="displayName"
                          placeholder="Enter Tag Display Name"
                          isError={!!errors.displayName}
                          errorText={errors?.displayName?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Tag Description</Label>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="description"
                          id="description"
                          placeholder="Enter Tag Description"
                          isError={!!errors.description}
                          errorText={errors?.description?.message?.toString()}
                          required
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
  ) : <EditTagsLoading />
}