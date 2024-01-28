import { TagsProps } from "@/app/(home)/tags/(list)/config"
import { Icons } from "@/components/other/icons"
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
import { cn } from "@/lib/utils"
import axios from "@/services/axios"
import { useEffect, useState } from "react"
import { errorHandler } from "../other/error-handler"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Skeleton } from "../ui/skeleton"
import { toast } from "../ui/use-toast"

export default function AddTopicTagDialog({
  className,
  variant,
  ...props
}: ButtonProps & { topicId: string } & { onSave: Function }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTagID, setSelectedTagID] = useState(0);
  const [allTags, setAllTags] = useState<TagsProps[]>([]);

  async function loadAllTags() {
    axios.get('/app/tag')
      .then(function (response) {
        setAllTags(response.data.result.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }

  async function save() {
    console.log(props.topicId);
    setIsLoading(true);
    axios.post(`/app/topic/${props.topicId}/tag`, { tagId: selectedTagID })
      .then(function () {
        toast({
          title: "Success",
          description: "Tag was successfully added to this topic.",
          variant: "success",
        });
        setIsLoading(false);
        setShowDialog(false);
        setSelectedTagID(0);
        props.onSave();
      })
      .catch(function (error) {
        console.log(error);
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (showDialog) {
      loadAllTags();
    } else {
      setIsLoading(false);
      setSelectedTagID(0);
    }
  }, [showDialog]);

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
        Add Tag
      </button>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Tag</DialogTitle>
            <DialogDescription>
              Enter new tag details
            </DialogDescription>
          </DialogHeader>
          <div style={{ maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px", }}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="tag">Select Tag</Label>
                {allTags && allTags.length != 0 ?
                  <Select onValueChange={(value) => {
                    setSelectedTagID(parseInt(value));
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder='Select a tag to add' />
                    </SelectTrigger>
                    <SelectContent>
                      {allTags.map((tag) => (<SelectItem key={tag.id} value={tag.id}>{tag.displayName}</SelectItem>))}
                    </SelectContent>
                  </Select> :
                  <Skeleton className="h-10" />}
              </div>
            </div>
          </div>
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
              disabled={isLoading || selectedTagID == 0}
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
