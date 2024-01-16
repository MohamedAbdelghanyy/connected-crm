"use client"

import _ from "@/@lodash/@lodash"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { CustomInput } from "@/components/ui/custom-input"
import { Input } from "@/components/ui/input"
import InterestsInput from "@/components/ui/interests-input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadObject } from "@/config/forms/defaultObjects"
import { LeadValidation } from "@/config/forms/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function AddLeadPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const { theme } = useTheme();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: LeadObject.empty,
    resolver: yupResolver(LeadValidation.mainSchema),
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
          <DashboardHeader heading="Add Lead" text="Enter lead's details"></DashboardHeader>
        </DashboardShell>
        <div className="space-y-4 pb-4 px-2">
          <div className="space-y-2"></div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
            <div>
              <TabsList className="w-full h-full">
                <Grid container spacing={2}>
                  <Grid item sm={4} xs={6}>
                    <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                  </Grid>
                  <Grid item sm={4} xs={6}>
                    <TabsTrigger value="other" className="w-full">Other</TabsTrigger>
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
                    <Label htmlFor="name">Full Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="name"
                          id="name"
                          placeholder="Enter Lead Full Name"
                          isError={!!errors.name}
                          errorText={errors?.name?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Controller
                      name="mobile"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="mobile"
                          type="number"
                          id="mobile"
                          placeholder="+201XXXXXXXXX"
                          isError={!!errors.mobile}
                          errorText={errors?.mobile?.message?.toString()}
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
                </div>
              </TabsContent>
              <TabsContent value="other" forceMount={true} hidden={activeTab !== "other"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests</Label>
                    <Controller
                      name="interests"
                      control={control}
                      render={({ field }) => (
                        <InterestsInput theme={theme} onChange={field.onChange} />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buy">Buy</Label>
                    <Input type="text" aria-label="buy" id="buy" placeholder="Enter buy" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sell">Sell</Label>
                    <Input type="text" aria-label="sell" id="sell" placeholder="Enter sell" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="settings" forceMount={true} hidden={activeTab !== "settings"}>
                <div className="space-y-4 py-2 pb-4">
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
                            <SelectItem value="active">
                              <span className="font-medium">Active</span>
                            </SelectItem>
                            <SelectItem value="qualified">
                              <span className="font-medium">Qualified</span>
                            </SelectItem>
                            <SelectItem value="unqualified">
                              <span className="font-medium">Unqualified</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <Controller
                      name="rating"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="rating">
                            <SelectValue placeholder="Select Rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">
                              <span className="font-medium">0</span>
                            </SelectItem>
                            <SelectItem value="1">
                              <span className="font-medium">1</span>
                            </SelectItem>
                            <SelectItem value="2">
                              <span className="font-medium">2</span>
                            </SelectItem>
                            <SelectItem value="4">
                              <span className="font-medium">3</span>
                            </SelectItem>
                            <SelectItem value="5">
                              <span className="font-medium">4</span>
                            </SelectItem>
                            <SelectItem value="6">
                              <span className="font-medium">5</span>
                            </SelectItem>
                            <SelectItem value="7">
                              <span className="font-medium">6</span>
                            </SelectItem>
                            <SelectItem value="8">
                              <span className="font-medium">7</span>
                            </SelectItem>
                            <SelectItem value="9">
                              <span className="font-medium">8</span>
                            </SelectItem>
                            <SelectItem value="10">
                              <span className="font-medium">9</span>
                            </SelectItem>
                            <SelectItem value="3">
                              <span className="font-medium">10</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Controller
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="priority">
                            <SelectValue placeholder="Select Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">
                              <span className="font-medium">High</span>
                            </SelectItem>
                            <SelectItem value="medium">
                              <span className="font-medium">Medium</span>
                            </SelectItem>
                            <SelectItem value="low">
                              <span className="font-medium">Low</span>
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
                        <CustomInput
                          {...field}
                          aria-label="notes"
                          id="notes"
                          placeholder="Enter Notes"
                          isError={!!errors.notes}
                          errorText={errors?.notes?.message?.toString()}
                        />
                      )}
                    />
                  </div>
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
                            <SelectItem value="moh">
                              <span className="font-medium">Mohamed Abdelghany</span>
                            </SelectItem>
                            <SelectItem value="khal">
                              <span className="font-medium">Khaled Afify</span>
                            </SelectItem>
                            <SelectItem value="soh">
                              <span className="font-medium">Test Test</span>
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
