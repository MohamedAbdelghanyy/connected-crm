import { errorHandler } from "@/components/ui/custom/error-handler";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import RoleTabs from "./role-tabs";

export const metadata = {
  title: "Role",
}

async function getRole(roleID: string) {
  return await axios.get('/identity/roles/' + roleID)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      errorHandler(toast, error);
      return null;
    });
}

async function getAttributes(roleID: string) {
  return [];
}

export default async function RolePage({ params }: { params: { role: string } }) {
  let roleID = params.role
  const role = await getRole(roleID);
  const attributes = await getAttributes(roleID);

  return (
    <RoleTabs
      role={role}
      attributes={attributes} />
  )
}