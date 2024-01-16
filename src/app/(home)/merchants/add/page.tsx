"use client"

import _ from "@/@lodash/@lodash"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { CustomInput } from "@/components/ui/custom-input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MerchantObject } from "@/config/forms/defaultObjects"
import { MerchantValidation } from "@/config/forms/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function AddMerchantPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");

  const methods = useForm({
    mode: 'onChange',
    defaultValues: MerchantObject.empty,
    resolver: yupResolver(MerchantValidation.mainSchema),
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
          <DashboardHeader heading="Add Merchant" text="Enter merchant details"></DashboardHeader>
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
                    <TabsTrigger value="other" className="w-full">Other</TabsTrigger>
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
                          placeholder="Enter Merchant Name"
                          isError={!!errors.name}
                          errorText={errors?.name?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="email"
                          type="email"
                          id="email"
                          placeholder="example@example.com"
                          isError={!!errors.email}
                          errorText={errors?.email?.message?.toString()}
                          required
                        />
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
                            <SelectValue placeholder="Select Merchant Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="category1">
                              <span className="font-medium">Category 1</span>
                            </SelectItem>
                            <SelectItem value="category2">
                              <span className="font-medium">Category 2</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Person Of Contact Name</Label>
                    <Controller
                      name="contactName"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="contactName"
                          id="contactName"
                          placeholder="Enter person of contact name"
                          isError={!!errors.contactName}
                          errorText={errors?.contactName?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Person Of Contact Number</Label>
                    <Controller
                      name="contactNumber"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="contactNumber"
                          type="number"
                          id="contactNumber"
                          placeholder="Enter person of contact number"
                          isError={!!errors.contactNumber}
                          errorText={errors?.contactNumber?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="other" forceMount={true} hidden={activeTab !== "other"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="location"
                          id="location"
                          placeholder="Enter merchant location"
                          isError={!!errors.location}
                          errorText={errors?.location?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Controller
                      name="website"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="website"
                          id="website"
                          placeholder="Enter merchant website"
                          isError={!!errors.website}
                          errorText={errors?.website?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agreement">Signed Agreement</Label>
                    <Controller
                      name="agreement"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          aria-label="agreement"
                          type="file"
                          id="agreement"
                          placeholder="Upload Agreement File"
                          onChange={(ev) => {
                            field.onChange(
                              {
                                imagePath: ev.target.value
                              }
                            )
                          }}
                          isError={!!errors.agreement}
                          errorText={errors?.agreement?.message?.toString()}
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
