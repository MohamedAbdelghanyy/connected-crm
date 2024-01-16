import { errorHandler } from "@/components/ui/custom/error-handler";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import AttributeValueTabs from "./attribute-value-tabs";

export const metadata = {
  title: "Attribute Value",
}

async function getAttributeValue(attributeID: string, attributeValueID: string) {
  return await axios.get('/app/specification/' + attributeID + '/value/' + attributeValueID)
    .then(function (response) {
      return response.data.result;
    })
    .catch(function (error) {
      errorHandler(toast, error);
      return null;
    });
}

export default async function AttributeValuePage({ params }: { params: { attribute: string, value: string } }) {
  const attributeID = params.attribute;
  const attributeValueID = params.value;
  const attributeValue = await getAttributeValue(attributeID, attributeValueID);

  return (
    <AttributeValueTabs
      attributeValue={attributeValue}
    />
  )
}