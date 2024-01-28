import { errorHandler } from "@/components/other/error-handler";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttributeTabs from "./attribute-tabs";

export default function AttributePage() {
  const { attributeID } = useParams();
  const [attribute, setAttribute] = useState();
  const [attributeValues, setAttributeValues] = useState([]);

  async function getAttribute() {
    return await axios.get('/app/specification/' + attributeID)
      .then(function (response) {
        setAttribute(response.data.result);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }

  async function getAttributeValues() {
    return await axios.get('/app/specification/' + attributeID + '/value')
      .then(function (response) {
        setAttributeValues(response.data.result.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }

  useEffect(() => {
    getAttribute();
    getAttributeValues();
  }, [attributeID]);

  return (
    <AttributeTabs
      attribute={attribute}
      attributeValues={attributeValues} />
  )
}