import _ from "@/@lodash/@lodash";
import FormButton from "@/components/forms/form-button";
import { errorHandler } from "@/components/other/error-handler";
import { DashboardHeader } from "@/components/other/header";
import { DashboardShell } from "@/components/other/shell";
import BrandsCategoriesInput from "@/components/ui/brands-categories-input";
import { CustomInput } from "@/components/ui/custom-input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { BrandObject } from "@/config/forms/defaultObjects";
import { BrandValidation } from "@/config/forms/validation";
import axios from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import EditBrandLoading from "./loading";
import DashboardLayout from "@/components/layouts/dashboard-layout";

export default function EditBrandPage() {
  const { brandID } = useParams();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const [brand, setBrand] = React.useState(BrandObject.empty);
  const navigate = useNavigate();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: brand,
    resolver: yupResolver(BrandValidation.mainSchema),
  });
  const { control, formState, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const getBrand = useCallback(() => {
    axios.get('/app/brands/' + brandID)
      .then(function (response) {
        if (response.data.result != null) {
          setBrand(response.data.result);
          reset(response.data.result);
        } else {
          errorHandler(toast, "This brand was not found");
          navigate("/brands");
        }
      })
      .catch(function (error) {
        errorHandler(toast, error);
        navigate("/brands");
      });
  }, [navigate, reset]);

  const edit = () => {
    setIsLoading(true);
    const brandToUpdate = getValues();
    brandToUpdate.categoryIds = getValues().categoryIds.map((categ) => categ.id);
    axios.put('/app/brands/' + brandID, brandToUpdate)
      .then(function (response) {
        toast({
          title: "Success",
          description: brandToUpdate.name + " was successfully updated.",
          variant: "success",
        });
        navigate('/brands/' + response.data.result.id);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getBrand();
  }, [getBrand, brandID]);

  return brand && brand.id != 0 ? (
    <DashboardLayout>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={"Edit " + brand.name + " Brand"} text="Enter brand details"></DashboardHeader>
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
                          defaultValue={brand.categories}
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
  ) : <EditBrandLoading />
}