"use client"

import _ from "@/@lodash/@lodash"
import { Icons } from "@/components/icons"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ChangePasswordObject } from "@/config/forms/defaultObjects"
import { ChangePasswordValidation } from "@/config/forms/validation"
import { cn } from "@/lib/utils"
import axios from "@/services/axios"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { CustomInput } from "../ui/custom-input"
import { toast } from "../ui/use-toast"

export default function ChangePasswordDialog({
  className,
  variant,
  ...props
}: ButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showDialog, setShowDialog] = React.useState(false)
  const methods = useForm({
    mode: 'onChange',
    defaultValues: ChangePasswordObject.empty,
    resolver: yupResolver(ChangePasswordValidation.mainSchema),
  });
  const { control, formState, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;

  async function savePassword() {
    setIsLoading(true);
    axios.post('/account/my-profile/change-password', getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: "Your password was successfully updated.",
          variant: "success",
        });
        setIsLoading(false);
        setShowDialog(false);
        reset(ChangePasswordObject.empty);
      })
      .catch(function (error) {
        console.log(error)
        toast({
          title: "Error",
          description: String(error.response.data.error.message),
          variant: "destructive",
        });
        setIsLoading(false);
      });

  }

  return (
    <>
      <button
        onClick={() => {
          setShowDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.edit className="mr-2 h-4 w-4" />
        Change Password
      </button>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and new password
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...methods}>
            <div style={{ maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px", }}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Controller
                    name="currentPassword"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        type="password"
                        aria-label="currentPassword"
                        id="currentPassword"
                        placeholder="Enter Your Current Password"
                        isError={!!errors.currentPassword}
                        errorText={errors?.currentPassword?.message?.toString()}
                        required
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        type="password"
                        aria-label="newPassword"
                        id="newPassword"
                        placeholder="Enter Your New Password"
                        isError={!!errors.newPassword}
                        errorText={errors?.newPassword?.message?.toString()}
                        required
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmNewPassword">Current Password</Label>
                  <Controller
                    name="confirmNewPassword"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        type="password"
                        aria-label="confirmNewPassword"
                        id="confirmNewPassword"
                        placeholder="Re-Enter Your New Password"
                        isError={!!errors.confirmNewPassword}
                        errorText={errors?.confirmNewPassword?.message?.toString()}
                        required
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </FormProvider>
          <DialogFooter className="mr-4 ml-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={savePassword}
              className={cn(
                buttonVariants({ variant }),
                {
                  "cursor-not-allowed opacity-60": isLoading,
                },
              ) + " mb-2"}
              disabled={isLoading || _.isEmpty(dirtyFields) || !isValid}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (<></>)}
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
