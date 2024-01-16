"use client"

import _ from "@/@lodash/@lodash"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { CustomInput } from "@/components/ui/custom-input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageTextObject } from "@/config/forms/defaultObjects"
import { LanguageTextValidation } from "@/config/forms/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function AddLanguageTextPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const [enabled, setEnabled] = React.useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: LanguageTextObject.empty,
    resolver: yupResolver(LanguageTextValidation.mainSchema),
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
          <DashboardHeader heading="Add Language Text" text="Enter language text details"></DashboardHeader>
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
                    <Label htmlFor="key">Key</Label>
                    <Controller
                      name="key"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="key"
                          id="key"
                          placeholder="Enter Key"
                          isError={!!errors.key}
                          errorText={errors?.key?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="baseValue">Base Value</Label>
                    <Controller
                      name="baseValue"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="baseValue"
                          id="baseValue"
                          placeholder="Enter Base Value"
                          isError={!!errors.baseValue}
                          errorText={errors?.baseValue?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
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
                  <div className="space-y-2">
                    <Label htmlFor="resourceName">Resource Name</Label>
                    <Controller
                      name="resourceName"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="resourceName"
                          id="resourceName"
                          placeholder="Enter Resource Name"
                          isError={!!errors.resourceName}
                          errorText={errors?.resourceName?.message?.toString()}
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
