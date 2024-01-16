"use client"

import _ from "@/@lodash/@lodash"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import ImagesTable from "@/components/images-table/images-table"
import { DashboardShell } from "@/components/shell"
import { CustomInput } from "@/components/ui/custom-input"
import { CustomTextarea } from "@/components/ui/custom-textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductObject } from "@/config/forms/defaultObjects"
import { ProductValidation } from "@/config/forms/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function AddItemPage() {

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");

  const methods = useForm({
    mode: 'onChange',
    defaultValues: ProductObject.empty,
    resolver: yupResolver(ProductValidation.mainSchema),
  });
  const { control, formState, watch } = methods;
  const { isValid, dirtyFields, errors } = formState;
  const enableShowPrice = watch('enableShowPrice');

  const add = () => {
    console.log("Added");
  }

  return (
    <>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Add Item" text="Enter item's details"></DashboardHeader>
        </DashboardShell>
        <div className="space-y-4 pb-4 px-2">
          <div className="space-y-2"></div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
            <div>
              <TabsList className="w-full h-full">
                <Grid container spacing={2}>
                  <Grid item sm={2} xs={6}>
                    <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                  </Grid>
                  <Grid item sm={2} xs={6}>
                    <TabsTrigger value="media" className="w-full">Media</TabsTrigger>
                  </Grid>
                  <Grid item sm={2} xs={6}>
                    <TabsTrigger value="price" className="w-full">Price</TabsTrigger>
                  </Grid>
                  <Grid item sm={2} xs={6}>
                    <TabsTrigger value="location" className="w-full">Location</TabsTrigger>
                  </Grid>
                  <Grid item sm={2} xs={6}>
                    <TabsTrigger value="attributes" className="w-full">Attributes</TabsTrigger>
                  </Grid>
                  <Grid item sm={2} xs={6}>
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
                          placeholder="Enter Product Name"
                          isError={!!errors.name}
                          errorText={errors?.name?.message?.toString()}
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
                        <CustomTextarea
                          {...field}
                          aria-label="description"
                          id="description"
                          placeholder="Enter Product Description"
                          isError={!!errors.description}
                          errorText={errors?.description?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Controller
                      name="brand"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="brand">
                            <SelectValue placeholder="Select Brand" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rolex">
                              <span className="font-medium">Rolex</span>
                            </SelectItem>
                            <SelectItem value="bmw">
                              <span className="font-medium">BMW</span>
                            </SelectItem>
                            <SelectItem value="Emaar">
                              <span className="font-medium">Emaar</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="category">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="automotive">
                              <span className="font-medium">Automotive</span>
                            </SelectItem>
                            <SelectItem value="lifestyle">
                              <span className="font-medium">Lifestyle</span>
                            </SelectItem>
                            <SelectItem value="realestate">
                              <span className="font-medium">Realestate</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner">Owner</Label>
                    <Controller
                      name="owner"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="owner">
                            <SelectValue placeholder="Select Owner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mohamedabdelghany">
                              <span className="font-medium">Mohamed Abdelghany</span>
                            </SelectItem>
                            <SelectItem value="khaledafify">
                              <span className="font-medium">Khaled Afify</span>
                            </SelectItem>
                            <SelectItem value="test">
                              <span className="font-medium">Test Test</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="status">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approved">
                              <span className="font-medium">Approved</span>
                            </SelectItem>
                            <SelectItem value="pending">
                              <span className="font-medium">Pending</span>
                            </SelectItem>
                            <SelectItem value="rejected">
                              <span className="font-medium">Rejected</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="media" forceMount={true} hidden={activeTab !== "media"}>
                <ImagesTable showAddButton={true} />
              </TabsContent>
              <TabsContent value="price" forceMount={true} hidden={activeTab !== "price"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Enable Show Price</Label>
                    <Controller
                      name="enableShowPrice"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          id="enableShowPrice"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  {enableShowPrice && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Controller
                          name="price"
                          control={control}
                          render={({ field }) => (
                            <CustomInput
                              {...field}
                              aria-label="price"
                              type="number"
                              id="price"
                              placeholder="Enter Product Price"
                              isError={!!errors.price}
                              errorText={errors?.price?.message?.toString()}
                              required
                            />
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Controller
                          name="currency"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger aria-label="currency">
                                <SelectValue placeholder="Select Currency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="egp">
                                  <span className="font-medium">EGP</span>
                                </SelectItem>
                                <SelectItem value="usd">
                                  <span className="font-medium">USD</span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </>
                  )}
                  {!enableShowPrice && (
                    <div className="space-y-2">
                      <Label htmlFor="showPriceLabel">Show Price Label</Label>
                      <Controller
                        name="showPriceLabel"
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            {...field}
                            aria-label="showPriceLabel"
                            id="showPriceLabel"
                            placeholder="Enter Show Price Label"
                            isError={!!errors.showPriceLabel}
                            errorText={errors?.showPriceLabel?.message?.toString()}
                            required
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="location" forceMount={true} hidden={activeTab !== "location"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="location">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="location1">
                              <span className="font-medium">Fifth Settlement</span>
                            </SelectItem>
                            <SelectItem value="location2">
                              <span className="font-medium">Maadi</span>
                            </SelectItem>
                            <SelectItem value="location3">
                              <span className="font-medium">New Capital</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Controller
                      name="latitude"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="latitude"
                          id="latitude"
                          placeholder="Enter Latitude"
                          isError={!!errors.latitude}
                          errorText={errors?.latitude?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Controller
                      name="longitude"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="longitude"
                          id="longitude"
                          placeholder="Enter Longitude"
                          isError={!!errors.longitude}
                          errorText={errors?.longitude?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="attributes" forceMount={true} hidden={activeTab !== "attributes"}></TabsContent>
              <TabsContent value="settings" forceMount={true} hidden={activeTab !== "settings"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="country">
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="country1">
                              <span className="font-medium">Egypt</span>
                            </SelectItem>
                            <SelectItem value="country2">
                              <span className="font-medium">UAE</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="tags">
                            <SelectValue placeholder="Select tags" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tag1">
                              <span className="font-medium">#tag</span>
                            </SelectItem>
                            <SelectItem value="tag2">
                              <span className="font-medium">#tag-2</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pinnedIndex">Pinned Index</Label>
                    <Controller
                      name="pinnedIndex"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="pinnedIndex"
                          type="number"
                          id="pinnedIndex"
                          placeholder="Enter Pinned Index"
                          isError={!!errors.pinnedIndex}
                          errorText={errors?.pinnedIndex?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoryIndex">Category Index</Label>
                    <Controller
                      name="categoryIndex"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="categoryIndex"
                          type="number"
                          id="categoryIndex"
                          placeholder="Enter Category Index"
                          isError={!!errors.categoryIndex}
                          errorText={errors?.categoryIndex?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Summer Product</Label>
                    <Controller
                      name="isSummerProduct"
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
                    <Label style={{ textAlign: "left" }} className="mt-3">Request Camera Professional</Label>
                    <Controller
                      name="isRequestCamera"
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
                    <Label style={{ textAlign: "left" }} className="mt-3">Request Pricing Consultancy</Label>
                    <Controller
                      name="isRequestPricing"
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
                    <Label style={{ textAlign: "left" }} className="mt-3">VIP Services</Label>
                    <Controller
                      name="isRequestVIP"
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
                    <Label style={{ textAlign: "left" }} className="mt-3">Sponsored</Label>
                    <Controller
                      name="isSponsored"
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
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Controller
                      name="metaTitle"
                      control={control}
                      render={({ field }) => (
                        <CustomTextarea
                          {...field}
                          aria-label="metaTitle"
                          id="metaTitle"
                          placeholder="Enter meta title..."
                          isError={!!errors.metaTitle}
                          errorText={errors?.metaTitle?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Controller
                      name="metaDescription"
                      control={control}
                      render={({ field }) => (
                        <CustomTextarea
                          {...field}
                          aria-label="metaDescription"
                          id="metaDescription"
                          placeholder="Enter meta description..."
                          isError={!!errors.metaDescription}
                          errorText={errors?.metaDescription?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metaKeywords">Meta Keywords</Label>
                    <Controller
                      name="metaKeywords"
                      control={control}
                      render={({ field }) => (
                        <CustomTextarea
                          {...field}
                          aria-label="metaKeywords"
                          id="metaKeywords"
                          placeholder="Enter meta keywords..."
                          isError={!!errors.metaKeywords}
                          errorText={errors?.metaKeywords?.message?.toString()}
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
                </div>
              </TabsContent>
              <FormButton label="Add" isLoading={isLoading} callback={add} isEnabled={!_.isEmpty(dirtyFields) && isValid} />
            </div>
          </Tabs>
        </div>
      </FormProvider>
    </>
  )
}