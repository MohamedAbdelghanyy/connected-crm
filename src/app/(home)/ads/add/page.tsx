"use client"

import _ from '@/@lodash'
import FormButton from '@/components/forms/form-button'
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { CustomInput } from "@/components/ui/custom-input"
import { CustomTextarea } from '@/components/ui/custom-textarea'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdObject } from "@/config/forms/defaultObjects"
import { AdValidation } from "@/config/forms/validation"
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function AddAdPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const methods = useForm({
    mode: 'onChange',
    defaultValues: AdObject.empty,
    resolver: yupResolver(AdValidation.mainSchema),
  });
  const { control, formState } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const add = () => {
    console.log("Added");
  }

  return (
    <>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Add Ad." text="Enter ad's details"></DashboardHeader>
        </DashboardShell>
        <div className="space-y-4 pb-4 px-2">
          <div className="space-y-2"></div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
            <div>
              <TabsList className="w-full h-full">
                <Grid container spacing={2}>
                  <Grid item sm={4} xs={12}>
                    <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                  </Grid>
                  <Grid item sm={4} xs={6}>
                    <TabsTrigger value="media" className="w-full">Media</TabsTrigger>
                  </Grid>
                  <Grid item sm={4} xs={6}>
                    <TabsTrigger value="settings" className="w-full">Settings</TabsTrigger>
                  </Grid>
                </Grid>
              </TabsList>
            </div>
            <div className="w-full">
              <TabsContent value="general" forceMount={true} hidden={activeTab !== "general"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="advertiser">Advertiser</Label>
                    <Controller
                      name="advertiser"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label='advertiser'>
                            <SelectValue placeholder="Select advertiser" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Advertiser 1">
                              <span className="font-medium">Advertiser 1</span>
                            </SelectItem>
                            <SelectItem value="Advertiser 2">
                              <span className="font-medium">Advertiser 2</span>
                            </SelectItem>
                            <SelectItem value="Advertiser 3">
                              <span className="font-medium">Advertiser 3</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Ad Title</Label>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label='title'
                          id="title"
                          placeholder="Ad Title"
                          isError={!!errors.title}
                          errorText={errors?.title?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Ad Description</Label>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <CustomTextarea
                          {...field}
                          aria-label='description'
                          id="description"
                          placeholder="Enter Ad. description"
                          isError={!!errors.description}
                          errorText={errors?.description?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link">Link</Label>
                    <Controller
                      name="link"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label='link'
                          id="link"
                          placeholder="Link"
                          isError={!!errors.link}
                          errorText={errors?.link?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkTitle">Link Title</Label>
                    <Controller
                      name="linkTitle"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label='linkTitle'
                          id="linkTitle"
                          placeholder="Ad Link Title"
                          isError={!!errors.linkTitle}
                          errorText={errors?.linkTitle?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="media" forceMount={true} hidden={activeTab !== "media"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="adImage">Ad. Image</Label>
                    <Controller
                      name="adImage"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          aria-label='adImage'
                          type="file"
                          id="adImage"
                          placeholder="Select Ad Image"
                          onChange={(ev) => {
                            field.onChange(
                              {
                                imagePath: ev.target.value
                              }
                            )
                          }}
                          isError={!!errors.adImage}
                          errorText={errors?.adImage?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="settings" forceMount={true} hidden={activeTab !== "settings"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Visible</Label>
                    <Controller
                      name="isVisible"
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
                    <Label style={{ textAlign: "left" }} className="mt-3">Exclusive</Label>
                    <Controller
                      name="isExclusive"
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
                    <Label htmlFor="slug">Slug</Label>
                    <Controller
                      name="slug"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label='slug'
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