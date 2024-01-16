import { errorHandler } from "@/components/ui/custom/error-handler";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import AttributeTabs from "./attribute-tabs";

export const metadata = {
  title: "Attribute",
}

async function getAttribute(attributeID: string) {
  return await axios.get('/app/specification/' + attributeID)
    .then(function (response) {
      return response.data.result;
    })
    .catch(function (error) {
      errorHandler(toast, error);
      return null;
    });
}

async function getAttributeValues(attributeID: string) {
  return await axios.get('/app/specification/' + attributeID + '/value')
    .then(function (response) {
      return response.data.result.items;
    })
    .catch(function (error) {
      errorHandler(toast, error);
      return null;
    });
}

export default async function AttributePage({ params }: { params: { attribute: string } }) {
  let attributeID = params.attribute;
  const attribute = await getAttribute(attributeID);
  const attributeValues = await getAttributeValues(attributeID);

  return (
    <AttributeTabs
      attribute={attribute}
      attributeValues={attributeValues} />
  )
}