import { errorHandler } from "@/components/other/error-handler";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttributeValueTabs from "./attribute-value-tabs";

export default function AttributeValuePage() {
  const { attributeID } = useParams();
  const { valueID } = useParams();
  const [attributeValue, setAttributeValue] = useState();

  async function getAttributeValue() {
    await axios.get('/app/specification/' + attributeID + '/value/' + valueID)
      .then(function (response) {
        setAttributeValue(response.data.result);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }

  useEffect(() => {
    getAttributeValue();
  }, [attributeID, valueID]);

  return (
    <AttributeValueTabs
      attributeValue={attributeValue}
    />
  )
}