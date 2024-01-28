import { errorHandler } from "@/components/other/error-handler";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryTabs from "./category-tabs";

export default function CategoryPage() {
  const { categoryID } = useParams();
  const [category, setCategory] = useState();
  const [attributes, setAttributes] = useState([]);

  async function getCategory() {
    await axios.get('/app/category/' + categoryID)
      .then(function (response) {
        setCategory(response.data.result);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }

  async function getAttributes() {
    await axios.get('/app/specification/', { params: { CategoryID: categoryID } })
      .then(function (response) {
        setAttributes(response.data.result.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }

  useEffect(() => {
    getCategory();
    getAttributes();
  }, [categoryID]);

  return (
    <CategoryTabs
      category={category}
      attributes={attributes} />
  )
}