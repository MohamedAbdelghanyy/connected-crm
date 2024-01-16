import { errorHandler } from "@/components/ui/custom/error-handler";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import CategoryTabs from "./category-tabs";

export const metadata = {
  title: "Category",
}

async function getCategory(categoryID: string) {
  return await axios.get('/app/category/' + categoryID)
    .then(function (response) {
      return response.data.result;
    })
    .catch(function (error) {
      errorHandler(toast, error);
      return null;
    });
}

async function getAttributes(categoryID: string) {
  return await axios.get('/app/specification/', { params: { CategoryID: categoryID } })
    .then(function (response) {
      return response.data.result.items;
    })
    .catch(function (error) {
      errorHandler(toast, error);
      return null;
    });
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  let categoryID = params.category;
  const category = await getCategory(categoryID);
  const attributes = await getAttributes(categoryID);

  return (
    <CategoryTabs
      category={category}
      attributes={attributes} />
  )
}