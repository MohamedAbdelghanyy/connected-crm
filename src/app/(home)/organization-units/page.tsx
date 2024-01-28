import DashboardLayout from "@/components/layouts/dashboard-layout";
import UnitsPageMain from "@/components/organization-units/units-page-main";
import { DashboardHeader } from "@/components/other/header";
import { DashboardShell } from "@/components/other/shell";
import { useEffect, useState } from "react";

export default function UnitsPage() {
  const [units, setUnits] = useState([]);
  const [members, setMembers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setUnits([]);
    setMembers([]);
    setRoles([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading="Organization Units" text="Manage your organization units"></DashboardHeader>
      </DashboardShell>
      <UnitsPageMain units={units} members={members} roles={roles} />
    </DashboardLayout>
  )
}