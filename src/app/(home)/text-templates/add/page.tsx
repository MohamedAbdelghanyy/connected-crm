"use client"

import _ from "@/@lodash/@lodash"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { CustomInput } from "@/components/ui/custom-input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TextTemplateObject } from "@/config/forms/defaultObjects"
import { TextTemplateValidation } from "@/config/forms/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function AddTextTemplatePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");

  const methods = useForm({
    mode: 'onChange',
    defaultValues: TextTemplateObject.empty,
    resolver: yupResolver(TextTemplateValidation.mainSchema),
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
          <DashboardHeader heading="Add Text Template" text="Enter template details"></DashboardHeader>
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
                    <Label htmlFor="name">Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="name"
                          id="name"
                          placeholder="Enter Name"
                          isError={!!errors.name}
                          errorText={errors?.name?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Inline Localized</Label>
                    <Controller
                      name="isInlineLocalized"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          id="isInlineLocalized"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2 pb-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Is Layout</Label>
                    <Controller
                      name="isLayout"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          id="isLayout"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="layout">Layout</Label>
                    <Controller
                      name="layout"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="layout"
                          id="layout"
                          placeholder="Enter Layout"
                          isError={!!errors.layout}
                          errorText={errors?.layout?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultCultureName">Default Culture Name</Label>
                    <Controller
                      name="defaultCultureName"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="defaultCultureName"
                          id="defaultCultureName"
                          placeholder="Enter Default Culture Name"
                          isError={!!errors.defaultCultureName}
                          errorText={errors?.defaultCultureName?.message?.toString()}
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
