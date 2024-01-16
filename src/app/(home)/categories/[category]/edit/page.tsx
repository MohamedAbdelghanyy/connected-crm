'use client'

import _ from "@/@lodash/@lodash";
import FormButton from "@/components/forms/form-button";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { CustomInput } from "@/components/ui/custom-input";
import { CustomTextarea } from "@/components/ui/custom-textarea";
import { errorHandler } from "@/components/ui/custom/error-handler";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { CategoryObject } from "@/config/forms/defaultObjects";
import { CategoryValidation } from "@/config/forms/validation";
import axios from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const [categoryID, setCategoryID] = React.useState("");
  const [category, setCategory] = React.useState(CategoryObject.empty);
  const { push } = useRouter();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: category,
    resolver: yupResolver(CategoryValidation.mainSchema),
  });
  const { control, formState, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const getCategory = useCallback((categoryID: string) => {
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
          push("/categories");
        }
      })
      .catch(function (error) {
        errorHandler(toast, error);
        push("/categories");
      });
  }, [push, reset]);

  const edit = () => {
    setIsLoading(true);
    axios.put('/app/category/' + categoryID, getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: getValues().name + " was successfully updated.",
          variant: "success",
        });
        push('/categories/' + response.data.result.id);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setCategoryID(params.category);
    getCategory(params.category);
  }, [getCategory, params.category]);

  return category && category.id != 0 ? (
    <>
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
    </>
  ) : <></>
}