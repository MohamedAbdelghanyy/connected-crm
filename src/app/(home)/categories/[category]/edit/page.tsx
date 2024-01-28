import _ from "@/@lodash/@lodash";
import FormButton from "@/components/forms/form-button";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { errorHandler } from "@/components/other/error-handler";
import { DashboardHeader } from "@/components/other/header";
import { DashboardShell } from "@/components/other/shell";
import { CustomInput } from "@/components/ui/custom-input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { CategoryObject } from "@/config/forms/defaultObjects";
import { CategoryValidation } from "@/config/forms/validation";
import axios from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import EditCategoryLoading from "./loading";

export default function EditCategoryPage() {
  const { categoryID } = useParams();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const [category, setCategory] = React.useState(CategoryObject.empty);
  const navigate = useNavigate();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: category,
    resolver: yupResolver(CategoryValidation.mainSchema),
  });
  const { control, formState, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const getCategory = useCallback(() => {
    axios.get('/app/category/' + categoryID)
      .then(function (response) {
        if (response.data.result != null) {
          const tempCategory = response.data.result;
          tempCategory.parentCategoryId = tempCategory.parentCategoryId ?? 0
          setCategory(tempCategory);
          reset(tempCategory);
          console.log(tempCategory);
        } else {
          errorHandler(toast, "This category was not found");
          navigate("/categories");
        }
      })
      .catch(function (error) {
        errorHandler(toast, error);
        navigate("/categories");
      });
  }, [navigate, reset]);

  const edit = () => {
    setIsLoading(true);
    axios.put('/app/category/' + categoryID, getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: getValues().name + " was successfully updated.",
          variant: "success",
        });
        navigate('/categories/' + response.data.result.id);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getCategory();
  }, [getCategory, categoryID]);

  return category && category.id != 0 ? (
    <DashboardLayout>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={"Edit " + category.name + " Category"} text="Enter category details"></DashboardHeader>
        </DashboardShell>
        <div className="space-y-4 pb-4 px-2">
          <div className="space-y-2"></div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
            <div>
              <TabsList className="w-full h-full">
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={6}>
                    <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <TabsTrigger value="media" className="w-full">Media</TabsTrigger>
                  </Grid>
                </Grid>
              </TabsList>
            </div>
            <div className="w-full">
              <TabsContent value="general" forceMount={true} hidden={activeTab !== "general"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="name"
                          id="name"
                          placeholder="Enter Category Name"
                          isError={!!errors.name}
                          errorText={errors?.name?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderNo">Order Number</Label>
                    <Controller
                      name="orderNo"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="orderNo"
                          type="number"
                          id="orderNo"
                          placeholder="Enter Category Order Number"
                          isError={!!errors.orderNo}
                          errorText={errors?.orderNo?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Active</Label>
                    <Controller
                      name="active"
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
              <TabsContent value="media" forceMount={true} hidden={activeTab !== "media"}>
                <div className="space-y-4 py-2 pb-4">
                  {/*<div className="space-y-2">
                    <Label htmlFor="image">Image</Label>
                    <Controller
                      name="image"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          aria-label="image"
                          type="file"
                          id="image"
                          placeholder="Select Category Image"
                          onChange={(ev) => {
                            field.onChange(
                              {
                                imagePath: ev.target.value
                              }
                            )
                          }}
                          isError={!!errors.image}
                          errorText={errors?.image?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>*/}
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
  ) : <EditCategoryLoading />
}