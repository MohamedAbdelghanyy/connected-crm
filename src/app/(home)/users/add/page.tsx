
import AddUserTabs from "@/app/(home)/users/add/add-user-tabs";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { DashboardHeader } from "@/components/other/header";
import { DashboardShell } from "@/components/other/shell";
import { useEffect, useState } from "react";

export default function AddUserPage() {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    setUnits([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Add User" text="Enter user details"></DashboardHeader>
      </DashboardShell>
      <AddUserTabs units={units} />
    </DashboardLayout>
  )
}
