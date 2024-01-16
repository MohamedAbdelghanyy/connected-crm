"use client"

import _ from "@/@lodash/@lodash"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { CustomInput } from "@/components/ui/custom-input"
import { errorHandler } from "@/components/ui/custom/error-handler"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { CategoryObject } from "@/config/forms/defaultObjects"
import { CategoryValidation } from "@/config/forms/validation"
import axios from "@/services/axios"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function AddCategoryPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("general");
  const methods = useForm({
    mode: 'onChange',
    defaultValues: CategoryObject.empty,
    resolver: yupResolver(CategoryValidation.mainSchema),
  });
  const { control, formState, getValues } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const add = () => {
    setIsLoading(true);
    axios.post('/app/category', getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: getValues().name + " was successfully added.",
          variant: "success",
        });
        router.push('/categories/' + response.data.result.id);
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
          <DashboardHeader heading="Add Category" text="Enter category's details"></DashboardHeader>
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
                          placeholder="Enter category name"
                          isError={!!errors.name}
                          errorText={errors?.name?.message?.toString()}
                          required
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
                label="Add"
                isLoading={isLoading}
                callback={add}
                isEnabled={!_.isEmpty(dirtyFields) && isValid}
              />
            </div>
          </Tabs>
        </div>
      </FormProvider>
    </>
  )
}
