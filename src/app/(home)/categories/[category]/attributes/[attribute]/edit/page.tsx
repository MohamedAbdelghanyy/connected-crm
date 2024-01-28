import _ from "@/@lodash/@lodash";
import FormButton from "@/components/forms/form-button";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { errorHandler } from "@/components/other/error-handler";
import { DashboardHeader } from "@/components/other/header";
import { DashboardShell } from "@/components/other/shell";
import { CustomInput } from "@/components/ui/custom-input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { AttributeObject } from "@/config/forms/defaultObjects";
import { AttributeValidation } from "@/config/forms/validation";
import axios from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import EditAttributeLoading from "./loading";

export default function EditAttributePage() {
  const { attributeID } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("general");
  const [attribute, setAttribute] = useState(AttributeObject.empty);
  const [attributeURL, setAttributeURL] = useState('');
  const navigate = useNavigate();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: attribute,
    resolver: yupResolver(AttributeValidation.mainSchema),
  });
  const { control, formState, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const getAttribute = useCallback(() => {
    axios.get('/app/specification/' + attributeID)
      .then(function (response) {
        if (response.data.result != null) {
          setAttribute(response.data.result);
          console.log(response.data.result);
          reset(response.data.result);
        } else {
          errorHandler(toast, "This attribute was not found");
          navigate("/categories");
        }
      })
      .catch(function (error) {
        errorHandler(toast, error);
        navigate("/categories");
      });
  }, [setAttribute, reset, navigate]);

  const edit = () => {
    setIsLoading(true);
    axios.put('/app/specification/' + attributeID, getValues())
      .then(function () {
        toast({
          title: "Success",
          description: getValues().name + " was successfully updated.",
          variant: "success",
        });
        navigate(attributeURL);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setAttributeURL(window.location.href);
    getAttribute();
  }, [getAttribute, attributeID]);

  return attribute && attribute.id != 0 ? (
    <DashboardLayout>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={"Edit " + attribute.name + " Attribute"} text="Enter attribute details"></DashboardHeader>
        </DashboardShell>
        <div className="space-y-4 pb-4 px-2">
          <div className="space-y-2"></div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
            <div>
              <TabsList className="w-full h-full">
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={12}>
                    <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TabsTrigger value="settings" className="w-full">Settings</TabsTrigger>
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
                          placeholder="Enter attribute name"
                          isError={!!errors.name}
                          errorText={errors?.name?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger aria-label="type">
                            <SelectValue placeholder="Select attribute type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Dropdown">
                              <span className="font-medium">Dropdown</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="settings" forceMount={true} hidden={activeTab !== "settings"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Required</Label>
                    <Controller
                      name="isRequired"
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
                    <Label style={{ textAlign: "left" }} className="mt-3">Allow Filtering</Label>
                    <Controller
                      name="allowFiltering"
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
                    <Label style={{ textAlign: "left" }} className="mt-3">Show On Product Page</Label>
                    <Controller
                      name="showOnProductPage"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayOrder">Display Order</Label>
                    <Controller
                      name="displayOrder"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="displayOrder"
                          type="number"
                          id="displayOrder"
                          placeholder="Enter display order"
                          isError={!!errors.displayOrder}
                          errorText={errors?.displayOrder?.message?.toString()}
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
  ) : <EditAttributeLoading />
}