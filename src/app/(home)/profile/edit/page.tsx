import _ from "@/@lodash/@lodash";
import FormButton from "@/components/forms/form-button";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { errorHandler } from "@/components/other/error-handler";
import { DashboardHeader } from "@/components/other/header";
import { DashboardShell } from "@/components/other/shell";
import { CustomInput } from "@/components/ui/custom-input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ProfileObject } from "@/config/forms/defaultObjects";
import { ProfileValidation } from "@/config/forms/validation";
import axios from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProfileEditLoading from "./loading";

export default function EditProfilePage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [profile, setProfile] = React.useState(ProfileObject.empty);
  const navigate = useNavigate();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: profile,
    resolver: yupResolver(ProfileValidation.mainSchema),
  });
  const { control, formState, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;

  const edit = () => {
    setIsLoading(true);
    axios.put('/account/my-profile/', getValues())
      .then(function () {
        toast({
          title: "Success",
          description: "Your profile was successfully updated.",
          variant: "success",
        });
        navigate('/profile');
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    axios.get('/account/my-profile')
      .then(function (response) {
        if (response.data != null) {
          setProfile(response.data);
          reset(response.data);
        } else {
          errorHandler(toast, "This profile was not found.");
          navigate('/profile');
        }
      })
      .catch(function (error) {
        errorHandler(toast, error);
        navigate('/profile');
      });
  }, [navigate, reset]);

  return profile.email != '' && profile.userName != '' ? (
    <DashboardLayout>
      <FormProvider {...methods}>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={"Edit " + profile.name + " Profile"} text="Enter profile details"></DashboardHeader>
        </DashboardShell>
        <div className="space-y-4 pb-4 px-2">
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
        </div>
        <FormButton
          label="Save"
          isLoading={isLoading}
          callback={edit}
          isEnabled={!_.isEmpty(dirtyFields) && isValid}
        />
      </FormProvider>
    </DashboardLayout>
  ) : <ProfileEditLoading />
}