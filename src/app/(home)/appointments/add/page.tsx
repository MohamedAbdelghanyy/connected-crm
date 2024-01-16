"use client"

import _ from "@/@lodash/@lodash"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
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
import { AppointmentObject } from "@/config/forms/defaultObjects"
import { AppointmentValidation } from "@/config/forms/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function AddAppointmentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")
  const methods = useForm({
    mode: 'onChange',
    defaultValues: AppointmentObject.empty,
    resolver: yupResolver(AppointmentValidation.mainSchema),
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
          <DashboardHeader heading="Add Appointment" text="Enter appointment details"></DashboardHeader>
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
                    <Label htmlFor="customer">Customer</Label>
                    <Controller
                      name="customer"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="customer">
                            <SelectValue placeholder="Select customer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Customer 1">
                              <span className="font-medium">Mohamed Abdelghany</span>
                            </SelectItem>
                            <SelectItem value="Customer 2">
                              <span className="font-medium">Test Test</span>
                            </SelectItem>
                            <SelectItem value="Customer 3">
                              <span className="font-medium">Khaled Afify</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="item">Item</Label>
                    <Controller
                      name="item"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="item">
                            <SelectValue placeholder="Select item" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bmw x7">
                              <span className="font-medium">BMW X7</span>
                            </SelectItem>
                            <SelectItem value="rolex">
                              <span className="font-medium">Rolex</span>
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
                            <SelectValue placeholder="Select user" />
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
                    <Label htmlFor="date">Date</Label>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <DateTimePicker
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slot">Slot</Label>
                    <Controller
                      name="slot"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="slot">
                            <SelectValue placeholder="Select slot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="03:00 PM - 06:00 PM">
                              <span className="font-medium">03:00 PM - 06:00 PM</span>
                            </SelectItem>
                            <SelectItem value="06:00 PM - 09:00 PM">
                              <span className="font-medium">06:00 PM - 09:00 PM</span>
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
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scheduled">
                              <span className="font-medium">Scheduled</span>
                            </SelectItem>
                            <SelectItem value="done">
                              <span className="font-medium">Done</span>
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
    </>
  )
}
