import { errorHandler } from "@/components/other/error-handler";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoleTabs from "./role-tabs";

export default function RolePage() {
  const { roleID } = useParams();
  const [role, setRole] = useState();
  const [attributes, setAttributes] = useState([]);

  async function getRole() {
    await axios.get('/identity/roles/' + roleID)
      .then(function (response) {
        setRole(response.data);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }

  async function getAttributes() {
    setAttributes([]);
  }

  useEffect(() => {
    getRole();
    getAttributes();
  }, [roleID]);

  return (
    <RoleTabs
      role={role}
      attributes={attributes} />
  )
}