"use client"

import _ from "@/@lodash/@lodash"
import { Icons } from "@/components/icons"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { TopicQueryObject } from "@/config/forms/defaultObjects"
import { TopicQueryValidation } from "@/config/forms/validation"
import { cn } from "@/lib/utils"
import axios from "@/services/axios"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { CustomInput } from "../ui/custom-input"
import { errorHandler } from "../ui/custom/error-handler"
import { toast } from "../ui/use-toast"

export default function AddTopicQueryDialog({
  className,
  variant,
  ...props
}: ButtonProps & { topicId: string } & { onSave: Function }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showDialog, setShowDialog] = React.useState(false)
  const methods = useForm({
    mode: 'onChange',
    defaultValues: TopicQueryObject.empty,
    resolver: yupResolver(TopicQueryValidation.mainSchema),
  });
  const { control, formState, getValues, reset } = methods;
  const { isValid, dirtyFields, errors } = formState;

  async function save() {
    console.log(props.topicId);
    setIsLoading(true);
    axios.post(`/app/topic/${props.topicId}/query`, getValues())
      .then(function (response) {
        toast({
          title: "Success",
          description: getValues().keyword + " Query was successfully added to this topic.",
          variant: "success",
        });
        setIsLoading(false);
        setShowDialog(false);
        reset(TopicQueryObject.empty);
        props.onSave();
      })
      .catch(function (error) {
        console.log(error);
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  return (
    <>
      <button
        onClick={() => {
          setShowDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Query
      </button>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Query</DialogTitle>
            <DialogDescription>
              Enter new query details
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...methods}>
            <div style={{ maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px", }}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="keyword">Keyword</Label>
                  <Controller
                    name="keyword"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        aria-label="keyword"
                        id="keyword"
                        placeholder="Enter Query Keyword"
                        isError={!!errors.keyword}
                        errorText={errors?.keyword?.message?.toString()}
                        required
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="count">Enter Query Count</Label>
                  <Controller
                    name="count"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        type="number"
                        aria-label="count"
                        id="count"
                        placeholder="Enter Query Count"
                        isError={!!errors.count}
                        errorText={errors?.count?.message?.toString()}
                        required
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </FormProvider>
          <DialogFooter className="mr-4 ml-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={save}
              className={cn(
                buttonVariants({ variant }),
                {
                  "cursor-not-allowed opacity-60": isLoading,
                },
              ) + " mb-2"}
              disabled={isLoading || _.isEmpty(dirtyFields) || !isValid}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (<></>)}
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
