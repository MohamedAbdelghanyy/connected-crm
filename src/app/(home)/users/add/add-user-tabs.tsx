import _ from "@/@lodash/@lodash"
import OrganizationTreeSelect from "@/app/(home)/users/add/organization-tree-select"
import FormButton from "@/components/forms/form-button"
import { errorHandler } from "@/components/other/error-handler"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { UserObject } from "@/config/forms/defaultObjects"
import { UserValidation } from "@/config/forms/validation"
import axios from "@/services/axios"
import { yupResolver } from "@hookform/resolvers/yup"
import { Grid } from "@mui/material"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { CustomInput } from "../../../../components/ui/custom-input"

export default function AddUserTabs({ units }: any) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState("general");
  const [allRoles, setAllRoles] = React.useState([]);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: UserObject.empty,
    resolver: yupResolver(UserValidation.mainSchema),
  });
  const { control, formState, getValues } = methods;
  const { isValid, dirtyFields, errors } = formState;

  React.useEffect(() => {
    axios.get('/identity/roles')
      .then(function (response) {
        setAllRoles(response.data.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, []);

  const add = () => {
    setIsLoading(true);
    axios.post('/identity/users', getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: getValues().name + " was successfully added.",
          variant: "success",
        });
        navigate('/users/' + response.data.id);
      })
      .catch(function (error) {
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

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

  return (
    <FormProvider {...methods}>
      <div className="space-y-4 pb-4 px-2">
        <div className="space-y-2"></div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={2}>
                <Grid item sm={4} xs={6}>
                  <TabsTrigger value="general" className="w-full">General</TabsTrigger>
                </Grid>
                <Grid item sm={4} xs={3}>
                  <TabsTrigger value="roles" className="w-full">Roles</TabsTrigger>
                </Grid>
                <Grid item sm={4} xs={3}>
                  <TabsTrigger value="units" className="w-full">Units</TabsTrigger>
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
                        <Checkbox id="isActive" aria-label="isActive" onCheckedChange={field.onChange} />
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
                        <Checkbox id="lockoutEnabled" aria-label="lockoutEnabled" onCheckedChange={field.onChange} />
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
                          <Checkbox id={currentRole.name} aria-label={currentRole.name} onCheckedChange={(checked: boolean) => field.onChange(handleRoleChanged(currentRole.name, checked))} />
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
            <TabsContent value="units" forceMount={true} hidden={activeTab !== "units"}>
              {/* Needs Validation After Integration */}
              <div className="space-y-4 py-2 pb-4">
                <OrganizationTreeSelect units={units} updateSelection={() => { }} />
              </div>
            </TabsContent>
            <FormButton label="Add" isLoading={isLoading} callback={add} isEnabled={!_.isEmpty(dirtyFields) && isValid} />
          </div>
        </Tabs>
      </div>
    </FormProvider>
  )
}