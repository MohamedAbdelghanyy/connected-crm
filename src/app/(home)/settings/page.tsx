import FormSaveButton from "@/components/forms/form-save-button"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { DashboardHeader } from "@/components/other/header"
import { DashboardShell } from "@/components/other/shell"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid } from "@mui/material"
import * as React from "react"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = React.useState("account")

  const save = () => {
    setIsLoading(true);
    console.log("Save");
    setIsLoading(false);
  }

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Settings" text="Update your prefrences"></DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <div className="space-y-2"></div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={2}>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="account" className="w-full">Account</TabsTrigger>
                </Grid>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="identity" className="w-full">Identity Management</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="account" forceMount={true} hidden={activeTab !== "account"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-4 py-2 pb-4 pt-4">
                  <h1>General</h1>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="selfRegistration" aria-label="selfRegistration" />
                    <label
                      htmlFor="selfRegistration"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enable Self Registration
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="authWithLocalAccount" aria-label="authWithLocalAccount" />
                    <label
                      htmlFor="authWithLocalAccount"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Authenticate With Local Account
                    </label>
                  </div>
                </div>
                <div className="space-y-4 py-2 pb-4 pt-4">
                  <h1>Two Factor Authentication</h1>
                  <div className="space-y-2">
                    <Label htmlFor="twoFactorAuth">Status</Label>
                    <Select>
                      <SelectTrigger aria-label="twoFactorAuth">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="optional">
                          <span className="font-medium">Optional</span>
                        </SelectItem>
                        <SelectItem value="disabled">
                          <span className="font-medium">Disabled</span>
                        </SelectItem>
                        <SelectItem value="forced">
                          <span className="font-medium">Forced</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="allowChange" aria-label="allowChange" />
                    <label
                      htmlFor="allowChange"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow users to change their Two Factor.
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" aria-label="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember this browser.
                    </label>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="identity" forceMount={true} hidden={activeTab !== "identity"}>
              <div className="space-y-4 py-2 pb-4 pt-4">
                <h1>Password Settings</h1>
                <div className="space-y-2">
                  <Label htmlFor="requiredLength">Required length</Label>
                  <Input type="number" aria-label="requiredLength" id="length" placeholder="Enter the required length" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requiredCharacters">Required Unique Characters Number</Label>
                  <Input type="number" aria-label="requiredCharacters" id="requiredCharacters" placeholder="Enter the required unique charecters number" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="nonAlpha" aria-label="nonAlpha" />
                  <label
                    htmlFor="nonAlpha"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Required non-alphanumeric character
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lowerCase" aria-label="lowerCase" />
                  <label
                    htmlFor="lowerCase"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Required lower case character
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="upperCase" aria-label="upperCase" />
                  <label
                    htmlFor="upperCase"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Required upper case character
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="digit" aria-label="digit" />
                  <label
                    htmlFor="upperCase"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Required digit
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" aria-label="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember this browser.
                  </label>
                </div>
              </div>
              <div className="space-y-4 py-2 pb-4 pt-4">
                <h1>Password Renewing Settings</h1>
                <div className="flex items-center space-x-2">
                  <Checkbox id="periodicallyChange" aria-label="periodicallyChange" />
                  <label
                    htmlFor="periodicallyChange"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Force users to periodically change password
                  </label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">Password change period(days)</Label>
                  <Input type="number" aria-label="period" id="period" placeholder="Enter the period" />
                </div>
              </div>
              <div className="space-y-4 py-2 pb-4 pt-4">
                <h1>Lockout Settings</h1>
                <div className="flex items-center space-x-2">
                  <Checkbox id="enableLockout" aria-label="enableLockout" />
                  <label
                    htmlFor="enableLockout"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Enabled for new users
                  </label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Lockout Duration</Label>
                  <Input type="number" aria-label="duration" id="duration" placeholder="Enter the duration" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAttempts">Max Failed Access Attempts</Label>
                  <Input type="number" aria-label="maxAttempts" id="maxAttempts" placeholder="Enter the max attempts" />
                </div>
              </div>
              <div className="space-y-4 py-2 pb-4 pt-4">
                <h1>SignIn Settings</h1>
                <div className="flex items-center space-x-2">
                  <Checkbox id="requireConfirmedEmail" aria-label="requireConfirmedEmail" />
                  <label
                    htmlFor="requireConfirmedEmail"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Require confirmed email
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="allowPhoneConfirm" aria-label="allowPhoneConfirm" />
                  <label
                    htmlFor="allowPhoneConfirm"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow users to confirm their phone number
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="requireConfirmedPhone" aria-label="requireConfirmedPhone" />
                  <label
                    htmlFor="requireConfirmedPhone"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Require confirmed phone number
                  </label>
                </div>
              </div>
              <div className="space-y-4 py-2 pb-4 pt-4">
                <h1>User Settings</h1>
                <div className="flex items-center space-x-2">
                  <Checkbox id="allowChangeEmail" aria-label="allowChangeEmail" />
                  <label
                    htmlFor="allowChangeEmail"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow users to change their email addresses
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="allowChangeUsername" aria-label="allowChangeUsername" />
                  <label
                    htmlFor="allowChangeUsername"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow users to change their usernames
                  </label>
                </div>
              </div>
            </TabsContent>
            <FormSaveButton isLoading={isLoading} callback={save} />
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
