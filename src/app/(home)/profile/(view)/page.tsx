'use client'

import ChangePasswordDialog from "@/components/forms/change-password-dialog"
import FormButton from "@/components/forms/form-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { errorHandler } from "@/components/ui/custom/error-handler"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { UserObject } from "@/config/forms/defaultObjects"
import axios from "@/services/axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProfileLoading from "./loading"

export default function ProfilePage() {
  const [user, setUser] = useState(UserObject.empty);
  const { push } = useRouter();

  useEffect(() => {
    axios.get('/account/my-profile')
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, []);

  return (
    (user.userName != '' || user.email != '') ?
      <>
        <DashboardShell className="mb-1">
          <DashboardHeader heading={user.name} text={user.email}>
            <div style={{ display: 'flex', flexDirection: 'row' }} className="space-x-2">
              <FormButton
                label="Edit"
                isLoading={false}
                callback={() => {
                  push("/profile/edit");
                }}
                isEnabled={true}
              />
            </div>
          </DashboardHeader>
        </DashboardShell>
        <div className="space-y-4 pb-4 px-2">
          <div className="space-y-2">
            <center>
              <Avatar className="mt-2" style={{ width: "200px", height: "200px" }}>
                <AvatarImage src={""/*user.avatar*/} alt="avatar" style={{ objectFit: "cover" }} />
                <AvatarFallback>{String(user.name).charAt(0)}</AvatarFallback>
              </Avatar>
            </center>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" aria-label="name" placeholder="No Name" value={user.name} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="surname">Surname</Label>
            <Input id="surname" aria-label="surname" placeholder="No Surname" value={user.surname} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userName">User Name</Label>
            <Input id="userName" aria-label="userName" placeholder="No User Name" value={user.userName} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" aria-label="email" id="email" placeholder="No Email" value={user.email} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input type="text" aria-label="phoneNumber" id="phoneNumber" placeholder="No Phone Number" value={user.phoneNumber} readOnly />
          </div>
          <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
            <Label style={{ textAlign: "left" }} className="mt-3">Password</Label>
            <ChangePasswordDialog />
          </div>
        </div>
      </>
      : <ProfileLoading />
  );
}