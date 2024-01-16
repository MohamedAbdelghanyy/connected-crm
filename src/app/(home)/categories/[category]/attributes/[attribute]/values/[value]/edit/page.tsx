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
import { AttributeValueObject } from "@/config/forms/defaultObjects";
import { AttributeValueValidation } from "@/config/forms/validation";
import axios from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

export default function AttributePage({ params }: { params: { attribute: string, value: string } }) {
  const attributeID = params.attribute;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const [attributeValueID, setAttributeValueID] = React.useState("");
  const [attributeValue, setAttributeValue] = React.useState(AttributeValueObject.empty);
  const { push } = useRouter();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: attributeValue,
    resolver: yupResolver(AttributeValueValidation.mainSchema),
  });
  const { control, formState, setValue, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;
  const attributeValueURL = window.location.href.replace('/edit', '');;

  const getAttribute = useCallback((attributeValueID: string) => {
    axios.get('/app/specification/' + attributeID + '/value/' + attributeValueID)
      .then(function (response) {
        if (response.data.result != null) {
          setAttributeValue(response.data.result);
          reset(response.data.result);
        } else {
          errorHandler(toast, "This value was not found");
          push("/categories");
        }
      })
      .catch(function (error) {
        errorHandler(toast, error);
        console.log(error)
        push("/categories");
      });
  }, [attributeID, push, reset]);

  const edit = () => {
    setIsLoading(true);
    axios.put('/app/specification/' + attributeID + '/value/' + attributeValueID, getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: getValues().value + " was successfully updated.",
          variant: "success",
        });
        push(attributeValueURL);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setAttributeValueID(params.value);
    getAttribute(params.value);
  }, [getAttribute, params.value]);

  return attributeValue && attributeValue.id != 0 ? (
    <>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={"Edit " + attributeValue.value + " Value"} text="Enter value details"></DashboardHeader>
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
                    <Label htmlFor="value">Value</Label>
                    <Controller
                      name="value"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="value"
                          id="value"
                          placeholder="Enter Value"
                          isError={!!errors.value}
                          errorText={errors?.value?.message?.toString()}
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
  ) : <></>
}