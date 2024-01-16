"use client"

import _ from "@/@lodash/@lodash"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { CustomTextarea } from "@/components/ui/custom-textarea"
import { DateTimePicker } from "@/components/ui/custom/date-time-picker/date-time-picker"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestObject } from "@/config/forms/defaultObjects"
import { RequestValidation } from "@/config/forms/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function AddRequestPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");

  const methods = useForm({
    mode: 'onChange',
    defaultValues: RequestObject.empty,
    resolver: yupResolver(RequestValidation.mainSchema),
  });
  const { control, formState, watch } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const add = () => {
    console.log("Added");
  }

  return (
    <>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading="Add Request" text="Enter request details"></DashboardHeader>
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
                    <Label htmlFor="requestor">Requestor</Label>
                    <Controller
                      name="requestor"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="requestor">
                            <SelectValue placeholder="Select Requestor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Customer 1">
                              <span className="font-medium">Customer 1</span>
                            </SelectItem>
                            <SelectItem value="Lead 1">
                              <span className="font-medium">Lead 1</span>
                            </SelectItem>
                            <SelectItem value="Customer 3">
                              <span className="font-medium">Customer 3</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product">Product</Label>
                    <Controller
                      name="product"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="product">
                            <SelectValue placeholder="Select Product" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Product 1">
                              <span className="font-medium">Product 1</span>
                            </SelectItem>
                            <SelectItem value="Product 2">
                              <span className="font-medium">Product 2</span>
                            </SelectItem>
                            <SelectItem value="Product 3">
                              <span className="font-medium">Product 3</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="other" forceMount={true} hidden={activeTab !== "other"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignedTo">Assigned To</Label>
                    <Controller
                      name="assignedTo"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="assignedTo">
                            <SelectValue placeholder="Select User" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mohamedAbdelghany">
                              <span className="font-medium">Mohamed Abdelghany</span>
                            </SelectItem>
                            <SelectItem value="khaledAfify">
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
                    <Label htmlFor="appointment">Appointment</Label>
                    <Controller
                      name="appointment"
                      control={control}
                      render={({ field }) => (
                        <DateTimePicker
                          granularity={"minute"}
                          onChange={field.onChange}
                        />
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
                            <SelectItem value="inProcess">
                              <span className="font-medium">In Process</span>
                            </SelectItem>
                            <SelectItem value="scheduled">
                              <span className="font-medium">Scheduled</span>
                            </SelectItem>
                            <SelectItem value="dealClosed">
                              <span className="font-medium">Deal Closed</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Controller
                      name="notes"
                      control={control}
                      render={({ field }) => (
                        <CustomTextarea
                          {...field}
                          aria-label="notes"
                          id="notes"
                          placeholder="Enter Notes"
                          isError={!!errors.notes}
                          errorText={errors?.notes?.message?.toString()}
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
