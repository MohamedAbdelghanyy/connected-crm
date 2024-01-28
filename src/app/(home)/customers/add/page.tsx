import _ from "@/@lodash/@lodash"
import FormButton from "@/components/forms/form-button"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { DashboardHeader } from "@/components/other/header"
import { DashboardShell } from "@/components/other/shell"
import { CustomInput } from "@/components/ui/custom-input"
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
import { CustomerObject } from "@/config/forms/defaultObjects"
import { CustomerValidation } from "@/config/forms/validation"
import { useTheme } from "@/lib/theme-provider"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"

export default function AddCustomerPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("general")
  const { theme } = useTheme();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: CustomerObject.empty,
    resolver: yupResolver(CustomerValidation.mainSchema),
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
          <DashboardHeader heading="Add Customer" text="Enter customer details"></DashboardHeader>
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
                    <TabsTrigger value="location" className="w-full">Location</TabsTrigger>
                  </Grid>
                  <Grid item sm={4} xs={6}>
                    <TabsTrigger value="other" className="w-full">Other</TabsTrigger>
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
                          placeholder="Enter customer name"
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
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Controller
                      name="birthdate"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="birthdate"
                          type="date"
                          id="birthdate"
                          placeholder="Select customer birthdate"
                          isError={!!errors.birthdate}
                          errorText={errors?.birthdate?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="gender">
                            <SelectValue placeholder="Select customer's gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">
                              <span className="font-medium">Male</span>
                            </SelectItem>
                            <SelectItem value="female">
                              <span className="font-medium">Female</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="location" forceMount={true} hidden={activeTab !== "location"}>
                <div className="space-y-4 py-2 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="country">
                            <SelectValue placeholder="Select customer's country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="egypt">
                              <span className="font-medium">Egypt</span>
                            </SelectItem>
                            <SelectItem value="uae">
                              <span className="font-medium">UAE</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="address"
                          id="address"
                          placeholder="Enter customer address"
                          isError={!!errors.address}
                          errorText={errors?.address?.message?.toString()}
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
                    <Label htmlFor="customerType">Customer Type</Label>
                    <Controller
                      name="customerType"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger aria-label="customerType">
                            <SelectValue placeholder="Select customer type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vip">
                              <span className="font-medium">VIP</span>
                            </SelectItem>
                            <SelectItem value="topvip">
                              <span className="font-medium">Top VIP</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Controller
                      name="occupation"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="occupation"
                          id="occupation"
                          placeholder="Enter customer occupation"
                          isError={!!errors.occupation}
                          errorText={errors?.occupation?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Controller
                      name="company"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="company"
                          id="company"
                          placeholder="Enter customer company"
                          isError={!!errors.company}
                          errorText={errors?.company?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
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
