'use client'

import { EmptyPlaceholder } from "@/components/empty-placeholder";
import FormButton from "@/components/forms/form-button";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { errorHandler } from "@/components/ui/custom/error-handler";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import { Grid } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandsProps } from "../../(list)/config";
import BrandLoading from "./loading";

export default function BrandPage({ params }: { params: { brand: string } }) {
  let brandID = params.brand;
  const [brand, setBrand] = useState<BrandsProps>();
  const [activeTab, setActiveTab] = useState("info");
  const { push } = useRouter();

  useEffect(() => {
    axios.get('/app/brands/' + brandID)
      .then(function (response) {
        setBrand(response.data.result);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [brandID]);

  return brand ? (
    <>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={brand.name} text={brand.id.toString()}>
          <div style={{ display: 'flex', flexDirection: 'row' }} className="space-x-2">
            <FormButton
              label="Edit"
              isLoading={false}
              callback={() => {
                push("/brands/" + brand.id + "/edit");
              }}
              isEnabled={true}
            />
          </div>
        </DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={1}>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="info" className="w-full">Info</TabsTrigger>
                </Grid>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="media" className="w-full">Media</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="info" forceMount={true} hidden={activeTab !== "info"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Brand Name</Label>
                  <Input
                    aria-label="name"
                    id="name"
                    placeholder="No Brand Name"
                    value={brand.name}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categories">Categories</Label>
                  <div className="space-x-2">
                    {brand.categories.map((category) =>
                      <Badge key={category.id} style={{ cursor: 'pointer' }}>
                        <Link href={'/categories/' + category.id}>{category.name}</Link>
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    aria-label="slug"
                    id="slug"
                    placeholder="No Slug"
                    value={brand.slug}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    aria-label="shortDescription"
                    id="shortDescription"
                    placeholder="No Short Description"
                    value={brand.shortDescription}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    aria-label="description"
                    id="description"
                    placeholder="No Description"
                    value={brand.description}
                    readOnly
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Allowed In Search</Label>
                  <Switch
                    checked={brand.allowedInSearch}
                    disabled={true}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Allowed In Filters</Label>
                  <Switch
                    checked={brand.allowedInFilters}
                    disabled={true}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Show On Home Page</Label>
                  <Switch
                    checked={brand.showOnHomePage}
                    disabled={true}
                  />
                </div>
                <div className="space-y-2" style={{ justifyContent: "space-between", display: "flex" }}>
                  <Label style={{ textAlign: "left" }} className="mt-3">Published</Label>
                  <Switch
                    checked={brand.isPublished}
                    disabled={true}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="products" forceMount={true} hidden={activeTab !== "products"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">

                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  ) : <BrandLoading />
}

function CustomEmptyPlaceHolder({ title, brandName }: any) {
  return (<EmptyPlaceholder>
    <EmptyPlaceholder.Icon name="post" />
    <EmptyPlaceholder.Title>No {title}</EmptyPlaceholder.Title>
    <EmptyPlaceholder.Description>
      {brandName} doesn&apos;t have any {title} yet.
    </EmptyPlaceholder.Description>
  </EmptyPlaceholder>);
}