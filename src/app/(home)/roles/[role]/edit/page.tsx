'use client'

import _ from "@/@lodash/@lodash";
import FormButton from "@/components/forms/form-button";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { CustomInput } from "@/components/ui/custom-input";
import { errorHandler } from "@/components/ui/custom/error-handler";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { RoleObject } from "@/config/forms/defaultObjects";
import { RoleValidation } from "@/config/forms/validation";
import axios from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

export default function RolePage({ params }: { params: { role: string } }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const [roleID, setRoleID] = React.useState("");
  const [role, setRole] = React.useState(RoleObject.empty);
  const { push } = useRouter();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: role,
    resolver: yupResolver(RoleValidation.mainSchema),
  });
  const { control, formState, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const getRole = useCallback((roleID: string) => {
    axios.get('/identity/roles/' + roleID)
      .then(function (response) {
        if (response.data != null && response.data.name != null) {
          setRole(response.data);
          reset(response.data);
        } else {
          errorHandler(toast, "This role was not found");
          push("/roles");
        }
      })
      .catch(function (error) {
        errorHandler(toast, error);
        push("/roles");
      });
  }, [push, reset]);

  const edit = () => {
    setIsLoading(true);
    axios.put('/identity/roles/' + roleID, getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: getValues().name + " was successfully updated.",
          variant: "success",
        });
        push('/roles/' + roleID);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setRoleID(params.role);
    getRole(params.role);
  }, [getRole, params.role]);

  return role && role.id != 0 ? (
    <>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={"Edit " + role.name + " Role"} text="Enter role details"></DashboardHeader>
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
                    <Label htmlFor="name">Role Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          aria-label="name"
                          id="name"
                          placeholder="Enter Role Name"
                          isError={!!errors.name}
                          errorText={errors?.name?.message?.toString()}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Default</Label>
                    <Controller
                      name="isDefault"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                    <Label style={{ textAlign: "left" }} className="mt-3">Public</Label>
                    <Controller
                      name="isPublic"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
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