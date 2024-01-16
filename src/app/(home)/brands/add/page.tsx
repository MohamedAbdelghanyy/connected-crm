"use client"

import _ from "@/@lodash/@lodash"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import BrandsCategoriesInput from "@/components/ui/brands-categories-input"
import { CustomInput } from "@/components/ui/custom-input"
import { errorHandler } from "@/components/ui/custom/error-handler"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { BrandObject } from "@/config/forms/defaultObjects"
import { BrandValidation } from "@/config/forms/validation"
import axios from "@/services/axios"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function AddBrandPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("general");
  const methods = useForm({
    mode: 'onChange',
    defaultValues: BrandObject.empty,
    resolver: yupResolver(BrandValidation.mainSchema),
  });
  const { control, formState, getValues, watch } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const add = () => {
    setIsLoading(true);
    const brandToAdd = getValues();
    brandToAdd.categoryIds = getValues().categoryIds.map((categ) => categ.id);
    axios.post('/app/brands', brandToAdd)
      .then(function (response) {
        toast({
          title: "Success",
          description: brandToAdd.name + " was successfully added.",
          variant: "success",
        });
        router.push('/brands/' + response.data.result.id);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  return (
    <>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Add Brand" text="Enter brand details"></DashboardHeader>
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
                    <Label htmlFor="name">Brand Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="name"
                          id="name"
                          placeholder="Enter Brand Name"
                          isError={!!errors.name}
                          errorText={errors?.name?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoryIds">Categories</Label>
                    <Controller
                      name="categoryIds"
                      control={control}
                      render={({ field }) => (
                        <BrandsCategoriesInput
                          defaultValue={[]}
                          onChange={(data: any) => {
                            field.onChange(data);
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Controller
                      name="shortDescription"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="shortDescription"
                          id="shortDescription"
                          placeholder="Enter Short Description"
                          isError={!!errors.shortDescription}
                          errorText={errors?.shortDescription?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="description"
                          id="description"
                          placeholder="Enter Description"
                          isError={!!errors.description}
                          errorText={errors?.description?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Controller
                      name="slug"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="slug"
                          id="slug"
                          placeholder="Enter Slug"
                          isError={!!errors.slug}
                          errorText={errors?.slug?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Allowed In Search</Label>
                    <Controller
                      name="allowedInSearch"
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
                    <Label style={{ textAlign: "left" }} className="mt-3">Allowed In Filters</Label>
                    <Controller
                      name="allowedInFilters"
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
                    <Label style={{ textAlign: "left" }} className="mt-3">Show On Home Page</Label>
                    <Controller
                      name="showOnHomePage"
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
                    <Label style={{ textAlign: "left" }} className="mt-3">Published</Label>
                    <Controller
                      name="isPublished"
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
                {/*<div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo</Label>
                    <Controller
                      name="logo"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          type="file"
                          aria-label="logo"
                          id="logo"
                          placeholder="Select Brand Logo"
                          onChange={(ev) => {
                            field.onChange(
                              {
                                imagePath: ev.target.value
                              }
                            )
                          }}
                          isError={!!errors.logo}
                          errorText={errors?.logo?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                </div>*/}
              </TabsContent>
              <FormButton label="Add" isLoading={isLoading} callback={add} isEnabled={!_.isEmpty(dirtyFields) && isValid} />
            </div>
          </Tabs>
        </div>
      </FormProvider>
    </>
  )
}
