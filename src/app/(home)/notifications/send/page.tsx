import _ from "@/@lodash/@lodash"
import FormButton from "@/components/forms/form-button"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { DashboardHeader } from "@/components/other/header"
import { DashboardShell } from "@/components/other/shell"
import { CustomInput } from "@/components/ui/custom-input"
import { CustomTextarea } from "@/components/ui/custom-textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationObject } from "@/config/forms/defaultObjects"
import { NotificationValidation } from "@/config/forms/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function SendNotificationPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");

  const methods = useForm({
    mode: 'onChange',
    defaultValues: NotificationObject.empty,
    resolver: yupResolver(NotificationValidation.mainSchema),
  });
  const { control, formState } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const add = () => {
    setIsLoading(true);
    console.log("Added");
    setIsLoading(false);
  }

  return (
    <DashboardLayout>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Send Notification" text="Enter notification details"></DashboardHeader>
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
                    <Label htmlFor="title">Title</Label>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="title"
                          id="title"
                          placeholder="Enter Notification Title"
                          isError={!!errors.title}
                          errorText={errors?.title?.message?.toString()}
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
                          placeholder="Enter Notification Description"
                          isError={!!errors.description}
                          errorText={errors?.description?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="navigateTo">Navigate To</Label>
                    <Controller
                      name="navigateTo"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="navigateTo">
                            <SelectValue placeholder="Select navigate to" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">
                              <span className="font-medium">None</span>
                            </SelectItem>
                            <SelectItem value="notificationCenter">
                              <span className="font-medium">Notification Center</span>
                            </SelectItem>
                            <SelectItem value="item">
                              <span className="font-medium">Item</span>
                            </SelectItem>
                            <SelectItem value="category">
                              <span className="font-medium">Category</span>
                            </SelectItem>
                            <SelectItem value="home">
                              <span className="font-medium">Home</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiver">Receiver</Label>
                    <Controller
                      name="receiver"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="receiver">
                            <SelectValue placeholder="Select receiver" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              <span className="font-medium">All</span>
                            </SelectItem>
                            <SelectItem value="Mohamed Abdelghany">
                              <span className="font-medium">Mohamed Abdelghany</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
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
    </DashboardLayout>
  )
}
