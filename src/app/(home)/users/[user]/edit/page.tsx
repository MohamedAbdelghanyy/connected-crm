'use client'

import _ from "@/@lodash/@lodash";
import FormButton from "@/components/forms/form-button";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomInput } from "@/components/ui/custom-input";
import { errorHandler } from "@/components/ui/custom/error-handler";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { UserObject } from "@/config/forms/defaultObjects";
import { UserValidation } from "@/config/forms/validation";
import axios from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

export default function UserPage({ params }: { params: { user: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const [userID, setUserID] = React.useState("");
  const [user, setUser] = React.useState(UserObject.empty);
  const [allRoles, setAllRoles] = React.useState([]);
  const { push } = useRouter();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: user,
    resolver: yupResolver(UserValidation.mainSchema),
  });
  const { control, formState, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const getUser = useCallback((userID: string) => {
    axios.get('/identity/users/' + userID)
      .then(function (response) {
        if (response.data != null && response.data.name != null) {
          setUser(response.data);
          reset(response.data);
        } else {
          errorHandler(toast, "This user was not found");
          push("/users");
        }
      })
      .catch(function (error) {
        errorHandler(toast, error);
        push("/users");
      });
  }, [push, reset]);

  const edit = () => {
    setIsLoading(true);
    axios.put('/identity/users/' + userID, getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: getValues().name + " was successfully updated.",
          variant: "success",
        });
        push('/users/' + userID);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setUserID(params.user);
    getUser(params.user);
  }, [getUser, params.user]);

  React.useEffect(() => {
    axios.get('/identity/roles')
      .then(function (response) {
        setAllRoles(response.data.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, []);

  const handleRoleChanged = (roleName: string, checked: boolean) => {
    let currentRoles = getValues('roleNames');
    let newRoles = [];
    if (checked) {
      newRoles = [...currentRoles, roleName];
    } else {
      newRoles = currentRoles.filter(role => role != roleName);
    }
    return newRoles;
  }

  return user && user.id != 0 ? (
    <>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={"Edit " + user.name + " User"} text="Enter user details"></DashboardHeader>
        </DashboardShell>
        <div className="space-y-4 pb-4 px-2">
          <div className="space-y-2"></div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
            <div>
              <TabsList className="w-full h-full">
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={12}>
                    <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TabsTrigger value="roles" className="w-full">Roles</TabsTrigger>
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
                  <div className="space-y-2">
                    <Label htmlFor="surname">Surname</Label>
                    <Controller
                      name="surname"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="surname"
                          id="surname"
                          placeholder="Enter Surame"
                          isError={!!errors.surname}
                          errorText={errors?.surname?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userName">User Name</Label>
                    <Controller
                      name="userName"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="userName"
                          id="userName"
                          placeholder="Enter User Name"
                          isError={!!errors.userName}
                          errorText={errors?.userName?.message?.toString()}
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
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="phoneNumber"
                          type="number"
                          id="phoneNumber"
                          placeholder="Enter Phone Number"
                          isError={!!errors.phoneNumber}
                          errorText={errors?.phoneNumber?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="password"
                          type="password"
                          id="password"
                          placeholder="Enter User Password"
                          isError={!!errors.password}
                          errorText={errors?.password?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="isActive" aria-label="isActive" checked={field.value} onCheckedChange={field.onChange} />
                          <label
                            htmlFor="isActive"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Active
                          </label>
                        </div>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Controller
                      name="lockoutEnabled"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="lockoutEnabled" aria-label="lockoutEnabled" checked={field.value} onCheckedChange={field.onChange} />
                          <label
                            htmlFor="lockoutEnabled"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Lockout
                          </label>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="roles" forceMount={true} hidden={activeTab !== "roles"}>
                <div className="space-y-4 py-2 pb-4">
                  <Controller
                    name="roleNames"
                    control={control}
                    render={({ field }) => (
                      <>
                        {allRoles.map((currentRole: { id: string, name: string }) => {
                          return (<div key={currentRole.id} className="flex items-center space-x-2">
                            <Checkbox
                              aria-label={currentRole.name}
                              defaultChecked={getValues('roleNames').includes(currentRole.name)}
                              onCheckedChange={(checked: boolean) => field.onChange(handleRoleChanged(currentRole.name, checked))}
                            />
                            <label
                              htmlFor={currentRole.name}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {currentRole.name}
                            </label>
                          </div>)
                        })}
                      </>
                    )}
                  />
                </div>
              </TabsContent>
              <FormButton
                label="Save"
                isLoading={isLoading}
                callback={edit}
                isEnabled={!_.isEmpty(dirtyFields) && isValid}
              />
            </div>
          </Tabs>
        </div>
      </FormProvider>
    </>
  ) : <></>
}