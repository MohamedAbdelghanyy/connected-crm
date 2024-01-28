import _ from "@/@lodash/@lodash";
import FormButton from "@/components/forms/form-button";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { errorHandler } from "@/components/other/error-handler";
import { DashboardHeader } from "@/components/other/header";
import { DashboardShell } from "@/components/other/shell";
import { CustomInput } from "@/components/ui/custom-input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { AttributeValueObject } from "@/config/forms/defaultObjects";
import { AttributeValueValidation } from "@/config/forms/validation";
import axios from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import EditAttributeValueLoading from "./loading";

export default function EditAttributeValuePage() {
  const { attributeID } = useParams();
  const { valueID } = useParams();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const [attributeValue, setAttributeValue] = React.useState(AttributeValueObject.empty);
  const navigate = useNavigate();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: attributeValue,
    resolver: yupResolver(AttributeValueValidation.mainSchema),
  });
  const { control, formState, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;
  const attributeValueURL = window.location.href.replace('/edit', '');;

  const getAttribute = useCallback(() => {
    axios.get('/app/specification/' + attributeID + '/value/' + valueID)
      .then(function (response) {
        if (response.data.result != null) {
          setAttributeValue(response.data.result);
          reset(response.data.result);
        } else {
          errorHandler(toast, "This value was not found");
          navigate("/categories");
        }
      })
      .catch(function (error) {
        errorHandler(toast, error);
        console.log(error)
        navigate("/categories");
      });
  }, [attributeID, navigate, reset]);

  const edit = () => {
    setIsLoading(true);
    axios.put('/app/specification/' + attributeID + '/value/' + valueID, getValues())
      .then(function () {
        toast({
          title: "Success",
          description: getValues().value + " was successfully updated.",
          variant: "success",
        });
        navigate(attributeValueURL);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAttribute();
  }, [getAttribute, attributeID, valueID]);

  return attributeValue && attributeValue.id != 0 ? (
    <DashboardLayout>
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
    </DashboardLayout>
  ) : <EditAttributeValueLoading />
}